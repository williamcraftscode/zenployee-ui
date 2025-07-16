import { Alert } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export const ErrorMessage = ({ message }: { message: string }) => (
  <Alert color="red" title="Error" icon={<IconX size={16} />}>
    {message}
  </Alert>
);
