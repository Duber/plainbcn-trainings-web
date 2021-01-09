import React, { Component } from 'react'
import { useTable, useFilters } from 'react-table'
import BTable from 'react-bootstrap/Table';
import './freetrack-table.css'

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
            options.add(`${row.values[id]}`)
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
    data = sortData(data)

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
        <BTable responsive striped bordered hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th style={{ width: column.width }} {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th style={{ width: column.width }} {...column.getHeaderProps()}>
                                {column.canFilter ? column.render('Filter') : null}
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
        </BTable>
    )
}

const columns = [
    {
        Header: 'Type',
        accessor: 'type',
        Filter: SelectColumnFilter,
        width: "10vmax"
    },
    {
        Header: 'Area',
        accessor: 'area',
        Filter: SelectColumnFilter,
        width: "10vmax"
    },
    {
        Header: 'Level',
        accessor: 'level',
        Filter: SelectColumnFilter,
        width: "10vmax"
    },
    {
        Header: 'Title',
        accessor: 'title',
        Filter: TextSearchColumnFilter,
        width: "40vmax"
    },
    {
        Header: 'Scheduled',
        accessor: 'scheduled',
        disableFilters: true,
        width: "10vmax"
    },
    {
        Header: 'Likes',
        accessor: 'likes',
        disableFilters: true,
        width: "5vmax"
    }
]

function sortData(data) {
    return data.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
}

export default class FreeTrackTable extends Component {
    render() {
        return (
            <div className="freeTrackTable" >
                <Table columns={columns} data={this.props.data} />
                {this.props.data.length === 0 && <p>Loading ...</p>}
            </div>
        );
    }
}