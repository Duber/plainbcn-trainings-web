import { Component } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './freetrack-table.css'

function ScheduledColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="true">Future</option>
            <option value="">All</option>
        </select>
    )
}

function ScheduledColumnFilterFn(rows, id, filterValue) {
    let today = new Date()
    switch (filterValue) {
        case "true":
            return rows.filter((row) => (row.values[id] === null) || Date.parse(row.values[id]) >= today)
        default:
            return rows
    }
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
        Filter: ScheduledColumnFilter,
        filter: ScheduledColumnFilterFn,
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
    return data.sort((a, b) => {
        if (a.scheduled == null && b.scheduled == null) {
            return b.likes - a.likes
        }
        if (a.scheduled == null) return 1
        if (b.scheduled == null) return -1
        return Date.parse(a.scheduled) - Date.parse(b.scheduled)
    })
}

const initialState = { filters: [{ id: 'scheduled', value: 'true' }] }

export default class FreeTrackTable extends Component {
    render() {
        return (
            <div className="freeTrackTable" >
                <Table columns={columns} data={sortData(this.props.data)} initialState={initialState} />
                {this.props.data.length === 0 && <p>Loading ...</p>}
            </div>
        );
    }
}