export const getMonthYearDate = (dateString: string): string => {
  const date = new Date(dateString);

  const month = date.getMonth();
  const year = date.getFullYear();

  return `${month}/${year}`;
};
