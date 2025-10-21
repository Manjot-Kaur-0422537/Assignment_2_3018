import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
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
  async create(data: CreateBranchInput) {
    try {
      return await createDocument(collectionName, data);
    } catch (error) {
      console.error("Error creating branch:", error);
      throw new Error("Failed to create branch");
    }
  },

  async getAll() {
    try {
      return await getDocuments(collectionName);
    } catch (error) {
      console.error("Error fetching branches:", error);
      throw new Error("Failed to fetch branches");
    }
  },

  async getById(id: string) {
    try {
      const branch = await getDocumentById(collectionName, id);
      if (!branch) throw new Error("Branch not found");
      return branch;
    } catch (error) {
      console.error("Error fetching branch by ID:", error);
      throw new Error("Failed to fetch branch");
    }
  },

  async update(id: string, data: UpdateBranchInput) {
    try {
      return await updateDocument(collectionName, id, data);
    } catch (error) {
      console.error("Error updating branch:", error);
      throw new Error("Failed to update branch");
    }
  },

  async delete(id: string) {
    try {
      await deleteDocument(collectionName, id);
      return { message: "Branch deleted successfully" };
    } catch (error) {
      console.error("Error deleting branch:", error);
      throw new Error("Failed to delete branch");
    }
  },
};
