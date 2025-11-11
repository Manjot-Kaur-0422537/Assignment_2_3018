import { db } from "../../../../config/firebaseconfig";

export interface Employee {
  id?: string;
  name: string;
  position: string;
  branchId: number;
  department: string;
  email: string;
}


export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await db.collection("employees").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Employee));
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await db.collection("employees").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Employee;
};


export const addEmployee = async (data: Omit<Employee, "id">): Promise<Employee> => {
  const docRef = await db.collection("employees").add(data);
  return { id: docRef.id, ...data };
};


export const updateEmployee = async (id: string, data: Partial<Omit<Employee, "id">>): Promise<Employee | null> => {
  const docRef = db.collection("employees").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(data);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Employee;
};


export const deleteEmployee = async (id: string): Promise<boolean> => {
  const docRef = db.collection("employees").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
};
