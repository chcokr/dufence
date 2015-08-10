export function formatDate(dateInstance) {
  if (!dateInstance) {
    return null;
  }

  const year = dateInstance.getYear() + 1900;
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();

  return `${month}/${date}/${year}`;
}
