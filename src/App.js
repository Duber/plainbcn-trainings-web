import React from 'react'
import { useTable, useFilters } from 'react-table'
import './App.css';

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// Define a default UI for filtering
function TextSearchColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

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
  },
    useFilters
  )

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
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
        Filter: SelectColumnFilter
      },
      {
        Header: 'level',
        accessor: 'level',
        Filter: SelectColumnFilter
      },
      {
        Header: 'title',
        accessor: 'title',
        Filter: TextSearchColumnFilter
      },
      {
        Header: 'accomplished',
        accessor: 'accomplished',
        Filter: SelectColumnFilter
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
