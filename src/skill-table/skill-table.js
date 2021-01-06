import React, { Component } from 'react'
import { useTable, useFilters } from 'react-table'
import BTable from 'react-bootstrap/Table';
import './skill-table.css'

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
        <BTable striped bordered hover size="sm" {...getTableProps()}>
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
        </BTable>
    )
}

const columns = [
    {
        Header: 'Area',
        accessor: 'area',
        Filter: SelectColumnFilter
    },
    {
        Header: 'Level',
        accessor: 'level',
        Filter: SelectColumnFilter
    },
    {
        Header: 'Title',
        accessor: 'title',
        Filter: TextSearchColumnFilter
    },
    {
        Header: 'Accomplished?',
        accessor: d => capitalize((d.accomplished ?? "not evaluated").toString()),
        Filter: SelectColumnFilter
    },
]

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortData(data) {
    return data.sort((a, b) => (a.area > b.area) ? 1 : (a.area === b.area) ? ((a.level > b.level) ? 1 : -1) : -1)
}

export default class SkillTable extends Component {
    render() {
        return (
            <div className="skillTable" >
                <Table columns={columns} data={this.props.data} />
                {this.props.data.length === 0 && <p>Loading ...</p>}
            </div>
        );
    }
}