import { useState, useMemo, useEffect } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './skill-page.css'
import Api from '../api/api'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortData(data) {
    return data.sort((a, b) => (a.area > b.area) ? 1 : (a.area === b.area) ? ((a.level > b.level) ? 1 : -1) : -1)
}

export default function SkillPage() {
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])

    useEffect(() => {
        async function getData() {
            setData(await new Api().getSkills())
        }
        getData()
    }, [])

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
            width: "60vmax"
        },
        {
            Header: 'Qualified?',
            accessor: d => capitalize((d.accomplished ?? "not evaluated").toString()),
            Filter: SelectColumnFilter,
            width: "10vmax"
        },
    ], [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="skillTable" >
                        <Table columns={columns} data={sortedData} />
                        {data.length === 0 && <p>Loading ...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}