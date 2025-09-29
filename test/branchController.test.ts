import { Request, Response } from "express";
import { createBranch, getAllBranches } from "../src/api/v1/controllers/branchController";

describe("Branch Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new branch", () => {
    req.body = { name: "Toronto Branch", address: "440 Queen St W, Toronto, ON, M5V 2A8" };
    createBranch(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Main Branch" })
    );
  });

  it("should return all branches", () => {
    getAllBranches(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
