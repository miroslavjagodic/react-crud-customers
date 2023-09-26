export const formatToDate = (inputDate: string) => {
  if (inputDate && inputDate.length < 10) {
    return inputDate;
  }
  const date = new Date(inputDate);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
