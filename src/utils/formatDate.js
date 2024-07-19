export function formatDate(stringDate) {
  const date = stringDate.split('T')[0];
  const dateParts = date.split('-');
  const dateReverse = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} `;

  return dateReverse;
}
