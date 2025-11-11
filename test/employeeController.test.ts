import { Request, Response } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";

// ✅ Mock the service layer so it doesn't hit Firestore
jest.mock("../src/api/v1/services/employeeService", () => ({
  addEmployee: jest.fn(),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
}));

import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../src/api/v1/services/employeeService";


jest.mock("../src/api/v1/models/responseModel", () => ({
  successResponse: (data: any, message: string) => ({ status: "success", message, data }),
  errorResponse: (message: string) => ({ status: "error", error: message }),
}));

describe("Employee Controller", () => {
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    res = { status: statusMock } as Partial<Response>;

    jest.clearAllMocks();
  });

  it("createEmployee should return 201 and success response", async () => {
    (addEmployee as jest.Mock).mockResolvedValue({ name: "Alice", position: "Staff" });
    const req = { body: { name: "Alice", position: "Staff", branchId: "1", department: "HR", email: "a@a.com" } } as Request;

    await employeeController.createEmployee(req, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        data: expect.objectContaining({ name: "Alice" }),
      })
    );
  });

  it("getAllEmployees should return 200 with array of employees", async () => {
    (getAllEmployees as jest.Mock).mockResolvedValue([{ name: "Alice" }]);
    const req = {} as Request;

    await employeeController.getAllEmployees(req, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        data: expect.any(Array),
      })
    );
  });

  it("getEmployeeById should return 404 when not found", async () => {
    (getEmployeeById as jest.Mock).mockResolvedValue(null);
    const req = { params: { id: "invalid" } } as unknown as Request;

    await employeeController.getEmployeeById(req, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        error: "Employee not found",
      })
    );
  });

  it("updateEmployee should return 200 when updated", async () => {
    (updateEmployee as jest.Mock).mockResolvedValue({ name: "Bob", position: "Manager" });
    const req = { params: { id: "1" }, body: { position: "Manager" } } as unknown as Request;

    await employeeController.updateEmployee(req, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        data: expect.objectContaining({ name: "Bob" }),
      })
    );
  });

  it("deleteEmployee should return 200 when deleted", async () => {
    (deleteEmployee as jest.Mock).mockResolvedValue(true);
    const req = { params: { id: "1" } } as unknown as Request;

    await employeeController.deleteEmployee(req, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Employee deleted successfully",
      })
    );
  });
});
