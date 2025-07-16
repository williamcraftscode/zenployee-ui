import { Flex, Loader } from "@mantine/core";

export const LoadingSpinner = () => (
  <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
    <Loader size="lg" variant="dots" />
  </Flex>
);
