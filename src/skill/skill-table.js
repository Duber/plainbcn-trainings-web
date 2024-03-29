import { useMemo } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table'
import { Link } from 'react-router-dom'
import { skillQualifications } from './skill-qualifications'
import './skill-table.css'

export default function SkillTable(props) {
    const { data } = props

    const initialState = {
        filters: [{ id: 'published', value: 'Published' }],
        hiddenColumns: ['id', 'scope']
    }

    function QualifiedFilterFn(rows, id, value){
        return rows.filter(r => r.values[id] === value)
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
            width: "55vmax",
            Cell: RenderTitle
        },
        {
            id: 'published',
            Header: 'Status',
            accessor: d => publishedMapper(d),
            Filter: SelectColumnFilter,
            width: "5vmax"
        },
        {
            Header: 'Qualified?',
            accessor: d => qualifiedMapper(d),
            Filter: SelectColumnFilter,
            width: "10vmax",
            filter: QualifiedFilterFn
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
            <Table columns={columns} data={data} initialState={initialState} defaultFiltered={[
                {
                    id: 'lastName',
                    value: 'Published'
                }
            ]} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    )
}

function qualifiedMapper(d) {
    return d.qualification === skillQualifications.QUALIFIED ? "Yes"
        : d.qualification === skillQualifications.NOT_QUALIFIED ? "No"
            : d.qualification === skillQualifications.NOT_INTERESTED ? "Not interested"
                : "Not evaluated"
}

function publishedMapper(d) {
    return d.published ? "Published" : "Draft"
}

function RenderTitle({ row, value }) {
    return (
        <Link to={`/skill/${row.values.id}`}>{value}</Link>
    )
}