import React from 'react'
import { useTable } from 'react-table'
import './App.css';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'area',
        accessor: 'area',
      },
      {
        Header: 'level',
        accessor: 'level',
      },
      {
        Header: 'title',
        accessor: 'title',
      },
      {
        Header: 'accomplished',
        accessor: 'accomplished',
      },
    ],
    []
  )

  const data = React.useMemo(() => [
    {
      area: 'backend',
      level: 'basic',
      title: 'backend 101',
      accomplished: 'true'
    },
    {
      area: 'frontend',
      level: 'basic',
      title: 'frontend 101',
      accomplished: 'false'
    }
  ], [])

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
