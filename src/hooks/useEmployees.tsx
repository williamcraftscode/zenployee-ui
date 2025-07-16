import { useQuery, useMutation, useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { api } from "../services/api";
import type { CreateEmployeeDto, UpdateEmployeeDto } from "../types/types";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: api.getEmployees,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => api.getEmployee(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDto) => api.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      notifications.show({
        title: "Success!",
        message: "Employee created successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create employee",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDto }) => api.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee"] });
      notifications.show({
        title: "Success!",
        message: "Employee updated successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to update employee",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      notifications.show({
        title: "Success!",
        message: "Employee deleted successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete employee",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });
};
