import { Request, Response } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";

describe("Employee Controller", () => {
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    res = { status: statusMock } as Partial<Response>;
  });

  it("createEmployee should return 201 and employee object", () => {
    const req = { body: { name: "Alice", position: "Staff" } } as Request;
    employeeController.createEmployee(req, res as Response);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ name: "Alice" }));
  });

  it("getAllEmployees should return 200 and array of employees", () => {
    const req = {} as Request;
    employeeController.getAllEmployees(req, res as Response);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.any(Array));
  });

  it("getEmployeeById should return 404 if employee not found", () => {
    const req = { params: { id: "invalid" } } as unknown as Request;
    employeeController.getEmployeeById(req, res as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Employee not found" });
  });
});
