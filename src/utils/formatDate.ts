export const formatDate = (date: Date | null): string => {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day =
      String(date.getDate()).length > 1
        ? String(date.getDate())
        : "0" + date.getDate();

    return `${year}-${month}-${day}`;
  }

  return "";
};
