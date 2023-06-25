import { IColumn } from "../data/modify-data";

export function changeColumn(
  modifies: IColumn[],
  columns: IColumn[]
): IColumn[] {
  console.log(modifies, columns, "INTER STATE");
  const modifyIds = modifies.map(({ id }) => id);
  const updColumns = columns.map((col) => {
    if (modifyIds.includes(col.id)) {
      const modify = modifies.find((modify) => modify.id === col.id);
      if (modify) {
        return modify;
      }
      return col;
    }
    return col;
  });
  console.log(updColumns, "INTER STATE RES");
  return updColumns;
}
