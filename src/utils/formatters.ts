import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";
  const date = dayjs(dateString);
  return date.isValid() ? date.format("MMM D, YYYY") : "Unknown";
};

export const formatDateLong = (dateString: string) => {
  if (!dateString) return "Unknown";
  const date = dayjs(dateString);
  return date.isValid() ? date.format("MMMM D, YYYY") : "Unknown";
};
