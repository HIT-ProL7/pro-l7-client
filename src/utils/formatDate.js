export function formatDate(stringDate) {
  const date = new Date(stringDate);

  const localHours = date.getHours().toString().padStart(2, '0');
  const localMinutes = date.getMinutes().toString().padStart(2, '0');

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  const result = `${localHours}:${localMinutes} - ${day}/${month}/${year}`;

  return result;
}
