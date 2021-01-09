import { Component } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './freetrack-table.css'

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
                <Table columns={columns} data={sortData(this.props.data)} />
                {this.props.data.length === 0 && <p>Loading ...</p>}
            </div>
        );
    }
}