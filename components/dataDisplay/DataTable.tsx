'use client'
import { Dispatch, SetStateAction } from 'react'
import { TableData, TableDataColumn, TableDataRow } from '@/types'

const DataTable = ({
  tableData,
  setTableData
} : {
  tableData: TableData
  setTableData: Dispatch<SetStateAction<TableData>>
}) => {

  const handleRowSelect = (rowIdx: number) => {
    setTableData((prev: TableData) => ({
      ...prev,
      rows: prev.rows.map((row: TableDataRow, idx: number) =>
        idx === rowIdx ? { ...row, selected: !row.selected } : { ...row, selected: false }
      )
    }))
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
          onClick={() => handleRowSelect(rowIdx)}
          className={row.selected ? 'bg-blue-400' : ''}
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
