import { Component } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './skill-table.css'

const columns = [
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
        width: "60vmax"
    },
    {
        Header: 'Qualified?',
        accessor: d => capitalize((d.accomplished ?? "not evaluated").toString()),
        Filter: SelectColumnFilter,
        width: "10vmax"
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
                <Table columns={columns} data={sortData(this.props.data)} />
                {this.props.data.length === 0 && <p>Loading ...</p>}
            </div>
        );
    }
}