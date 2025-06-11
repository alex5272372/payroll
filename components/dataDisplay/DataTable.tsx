import { TableData, TableDataColumn } from '@/types'

const DataTable = ({ data } : { data: TableData }) => {
  return <table className="m-2">
    <thead><tr>
      {data.columns.map((column: TableDataColumn, idx: number) =>
        <th key={idx} className="px-2 border" style={{ width: column.width }}>
          {column.header}
        </th>
      )}
    </tr></thead>

    <tbody>
      {data.rows.map((row: string[], rowIdx: number) => <tr key={rowIdx}>
        {row.map((cell: string, cellIdx: number) =>
          <td key={cellIdx} className="px-2 border">
            {cell}
          </td>
        )}
      </tr>)}
    </tbody>
  </table>
}

export default DataTable
