import { Request, Response } from "express";
import { createBranch, getAllBranches } from "../src/api/v1/controllers/branchController";
import { branchService } from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (branchService.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Main Branch",
      address: "123 St",
      phone: "1234567890",
    });

    (branchService.getAll as jest.Mock).mockResolvedValue([
      {
        id: "1",
        name: "Main Branch",
        address: "123 St",
        phone: "1234567890",
      },
    ]);
  });

  it("should create a new branch", async () => {
    req.body = { name: "Main Branch", address: "Toronto", phone: "123-456-7890" };
    await createBranch(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({ name: "Main Branch" }),
    });
  });

  it("should return all branches", async () => {
    await getAllBranches(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Array),
    });
  });
});
