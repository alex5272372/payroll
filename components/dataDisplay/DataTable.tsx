'use client'
import { TableData, TableDataColumn, TableDataRow } from '@/types'

const DataTable = ({
  tableData,
  selectedRows = new Set<string>(),
  onSelectionChange,
}: {
  tableData: TableData
  selectedRows?: Set<string>
  onSelectionChange?: (selected: Set<string>) => void
}) => {

  const handleRowSelect = (row: TableDataRow) => {
    if (!onSelectionChange) return
    const key = row.cells[0]
    const next = new Set(selectedRows)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    onSelectionChange(next)
  }

  return <table className="m-2">
    <thead><tr>
      {tableData.columns.map((column: TableDataColumn, idx: number) =>
        <th key={idx} className="px-2 border" style={{ width: column.width }}>
          {column.header}
        </th>
      )}
    </tr></thead>

    <tbody>
      {tableData.rows.map((row: TableDataRow, rowIdx: number) =>
        <tr
          key={rowIdx}
          onClick={() => handleRowSelect(row)}
          className={selectedRows.has(row.cells[0]) ? 'bg-blue-400' : ''}
        >
          {row.cells.map((cell: string, cellIdx: number) =>
            <td key={cellIdx} className="px-2 border">
              {cell}
            </td>
          )}
        </tr>
      )}
    </tbody>
  </table>
}

export default DataTable
