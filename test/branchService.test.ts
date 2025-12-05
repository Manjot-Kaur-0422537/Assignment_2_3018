import { branchService } from "../src/api/v1/services/branchService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("branchService", () => {
  const mockBranch = { id: "1", name: "Main", address: "123 St", phone: "1234567890" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a branch", async () => {
    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue("1");
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
      id: "1",
      data: () => mockBranch,
    });

    const result = await branchService.create(mockBranch);
    expect(result).toEqual(mockBranch);
  });

  it("should get all branches", async () => {
    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
      docs: [{ id: "1", data: () => mockBranch }],
    });

    const result = await branchService.getAll();
    expect(result).toEqual([mockBranch]);
  });

  it("should get a branch by id", async () => {
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
      id: "1",
      data: () => mockBranch,
    });

    const result = await branchService.getById("1");
    expect(result).toEqual(mockBranch);
  });

  it("should update a branch", async () => {
    (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
      id: "1",
      data: () => ({ ...mockBranch, name: "Updated" }),
    });

    const result = await branchService.update("1", { name: "Updated" });
    expect(result).toEqual({ ...mockBranch, name: "Updated" });
  });

  it("should delete a branch", async () => {
    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    const result = await branchService.delete("1");

    expect(result).toEqual(true);
  });
});
