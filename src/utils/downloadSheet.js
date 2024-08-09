import { read, utils, writeFileXLSX } from 'xlsx';

export function downloadSheet(objectRef, sheetHeader, sheetName) {
  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(objectRef);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, sheetName);

  /* fix headers */
  utils.sheet_add_aoa(worksheet, [sheetHeader], {
    origin: 'A1'
  });

  /* calculate column width */
  const header = Object.keys(objectRef[0]);
  var wscols = [];
  for (var i = 0; i < header.length; i++) {
    // columns length added
    wscols.push({ wch: 20 });
  }
  worksheet['!cols'] = wscols;

  writeFileXLSX(workbook, `${sheetName}.xlsx`, { compression: true });
}
