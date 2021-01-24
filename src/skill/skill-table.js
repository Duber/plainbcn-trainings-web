import { useMemo } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import { Link } from 'react-router-dom'
import './skill-table.css'

export default function SkillTable(props) {
    const { data, onclick } = props

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
            accessor: d => capitalize((d.accomplished ?? "not evaluated").toString()),
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
            <Table columns={columns} data={data} initialState={initialState} onclick={onclick} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    )
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function RenderTitle({ row, value, onclick }) {
    const click = () => {
        onclick(row.values)
    }

    return (
        <Link to={`/skill/${row.values.id}`} onClick={click}>{value}</Link>
    )
}