import { db } from "../../../config/firebaseConfig";


interface FieldValuePair {
  fieldName: string;
  fieldValue: unknown;
}

/**
 * Runs a Firestore transaction safely.
 * @param operations The async operations to perform in the transaction.
 * @returns The result of the transaction.
 */
export const runTransaction = async <T>(
  operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
  try {
    return await db.runTransaction(operations);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Transaction failed: ${message}`);
  }
};

/**
 * Creates a new document in a collection.
 * @param collectionName The Firestore collection name.
 * @param data The data to create.
 * @param id Optional custom document ID.
 * @returns The new document ID.
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    const collectionRef = db.collection(collectionName);
    const docRef = id ? collectionRef.doc(id) : collectionRef.doc();
    await docRef.set(data);
    return docRef.id;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create document: ${message}`);
  }
};

/**
 * Retrieves all documents from a Firestore collection.
 * @param collectionName The collection name.
 * @returns A QuerySnapshot with all documents.
 */
export const getDocuments = async (
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
  try {
    return await db.collection(collectionName).get();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch documents: ${message}`);
  }
};

/**
 * Retrieves a document by ID.
 * @param collectionName The Firestore collection name.
 * @param id The document ID.
 * @returns The document snapshot or null if not found.
 */
export const getDocumentById = async (
  collectionName: string,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    return doc.exists ? doc : null;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch document: ${message}`);
  }
};

/**
 * Updates a document by ID.
 * @param collectionName The collection name.
 * @param id The document ID.
 * @param data The updated data.
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update document: ${message}`);
  }
};

/**
 * Deletes a document by ID.
 * @param collectionName The collection name.
 * @param id The document ID.
 * @param transaction Optional Firestore transaction.
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    if (transaction) transaction.delete(docRef);
    else await docRef.delete();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete document: ${message}`);
  }
};

/**
 * Deletes documents from a collection matching given field values.
 * @param collectionName The collection name.
 * @param fieldValuePairs Array of field-value pairs to filter by.
 * @param transaction Optional transaction to run inside.
 */
export const deleteDocumentsByFieldValues = async (
  collectionName: string,
  fieldValuePairs: FieldValuePair[],
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection(collectionName);

    fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
      query = query.where(fieldName, "==", fieldValue);
    });

    const snapshot = transaction ? await transaction.get(query) : await query.get();

    if (transaction) {
      snapshot.docs.forEach((doc) => transaction.delete(doc.ref));
    } else {
      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete documents: ${message}`);
  }
};
