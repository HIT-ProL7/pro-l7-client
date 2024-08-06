export function formatDate(stringDate) {
  const date = new Date(stringDate);

  const localHours = date.getHours();
  const localMinutes = date.getMinutes();

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const result = `${localHours}:${localMinutes} - ${day}/${month}/${year}`;

  return result;
}
