export function formatDate(dateInstance) {
  if (!dateInstance) {
    return null;
  }

  const year = dateInstance.getYear() + 1900;
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();

  return `${month}/${date}/${year}`;
}

export function removeBackslashesFromStringDate(date) {
  const dateRegexpMatch = date.match(/(\d+)\/(\d+)\/(\d+)/);
  const month = dateRegexpMatch[1];
  const day = dateRegexpMatch[2];
  const year = dateRegexpMatch[3];

  return (month.length < 2 ? ('0' + month) : month) +
    (day.length < 2 ? ('0' + day) : day) +
    year;
}
