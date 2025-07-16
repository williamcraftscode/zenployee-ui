import type { Employee, CreateEmployeeDto, UpdateEmployeeDto, ApiResult } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5131/api";

async function handleResponse<T>(response: Response): Promise<ApiResult<T>> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Error: ${response.status}`);
  }

  return data;
}

export const api = {
  async getEmployees(): Promise<ApiResult<Employee[]>> {
    const response = await fetch(`${API_BASE_URL}/person`);
    return handleResponse(response);
  },

  async getEmployee(id: string): Promise<ApiResult<Employee>> {
    const response = await fetch(`${API_BASE_URL}/person/${id}`);
    return handleResponse(response);
  },

  async createEmployee(data: CreateEmployeeDto): Promise<ApiResult<Employee>> {
    const response = await fetch(`${API_BASE_URL}/person`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateEmployee(id: string, data: UpdateEmployeeDto): Promise<ApiResult<Employee>> {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async deleteEmployee(id: string): Promise<ApiResult<void>> {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
