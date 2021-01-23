import { useState, useMemo, useEffect } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './skill-page.css'
import Api from '../api/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        <Container fluid>
            <Row>
                <Col>
                    <div className="skillTable" >
                        <Table columns={columns} data={sortedData} />
                        {data.length === 0 && <p>Loading ...</p>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}