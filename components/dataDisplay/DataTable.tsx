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
    const next = new Set(selectedRows)
    if (next.has(row.id)) next.delete(row.id)
    else next.add(row.id)
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
      {tableData.rows.map((row: TableDataRow, rowIdx: number) => {
        const isSelected = selectedRows.has(row.id)
        const className = isSelected ? 'bg-blue-400' : ''
        const cells = row.cells.map((cell: string, cellIdx: number) =>
          <td key={cellIdx} className="px-2 border">{cell}</td>
        )
        return <tr key={rowIdx} className={className} onClick={() => handleRowSelect(row)}>
          {cells}
        </tr>
      })}
    </tbody>
  </table>
}

export default DataTable
