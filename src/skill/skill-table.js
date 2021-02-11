import { useMemo } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import { Link } from 'react-router-dom'
import './skill-table.css'

export default function SkillTable(props) {
    const { data } = props

    const initialState = {
        hiddenColumns: ['id', 'scope']
    }

    const columns = useMemo(() => [
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
            width: "60vmax",
            Cell: RenderTitle
        },
        {
            Header: 'Qualified?',
            accessor: d => qualifiedMapper(d),
            Filter: SelectColumnFilter,
            width: "10vmax"
        },
        {
            id: 'id',
            accessor: 'id'
        },
        {
            id: 'scope',
            accessor: 'scope'
        }
    ], [])

    return (
        <div className="skillTable" >
            <Table columns={columns} data={data} initialState={initialState} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    )

    function qualifiedMapper(d) {
        if (d.accomplished === null) return "Not evaluated"
        return d.accomplished ? "Yes" : "No"
    }
}

function RenderTitle({ row, value }) {
    return (
        <Link to={`/skill/${row.values.id}`}>{value}</Link>
    )
}