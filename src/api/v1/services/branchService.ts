import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface CreateBranchInput {
  name: string;
  address: string;
  phone: string;
}

export interface UpdateBranchInput {
  name?: string;
  address?: string;
  phone?: string;
}

const collectionName = "branches";

export const branchService = {
  async create(data: CreateBranchInput): Promise<Branch> {
    const id = await createDocument(collectionName, data);
    return { id, ...data };
  },

  async getAll(): Promise<Branch[]> {
    const snapshot = await getDocuments(collectionName);
    return snapshot.docs
      .map((doc: any) => {
        const data = doc.data();
        if (!data) return null;
        return { id: doc.id, ...(data as Omit<Branch, "id">) };
      })
      .filter(Boolean) as Branch[];
  },

  async getById(id: string): Promise<Branch | null> {
    const doc = await getDocumentById(collectionName, id);
    if (!doc) return null;

    const data = doc.data();
    if (!data) return null;

    return { id: doc.id, ...(data as Omit<Branch, "id">) };
  },

  async update(id: string, data: UpdateBranchInput): Promise<Branch | null> {
    const doc = await getDocumentById(collectionName, id);
    if (!doc) return null;

    await updateDocument(collectionName, id, data);

    const updatedDoc = await getDocumentById(collectionName, id);
    if (!updatedDoc) return null;

    const updatedData = updatedDoc.data();
    if (!updatedData) return null;

    return { id: updatedDoc.id, ...(updatedData as Omit<Branch, "id">) };
  },

  async delete(id: string): Promise<boolean> {
    const doc = await getDocumentById(collectionName, id);
    if (!doc) return false;

    await deleteDocument(collectionName, id);
    return true;
  },
};
