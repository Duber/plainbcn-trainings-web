import $ from 'jquery'
import { useState, useMemo, useEffect, Fragment } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './skill-page.css'
import Api from '../api/api'
import SkillModal from './skill-modal'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function SkillPage() {
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])
    const [modalData, setModalData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams()
    const modalId = "skill-modal"

    useEffect(() => {
        async function getData() {
            setData(await new Api().getSkills())
        }
        getData()
    }, [])

    useEffect(() => {
        if (id) {
            const [row] = data.filter(d => d.id === id)
            if (row){
                setModalData(row)
                setShowModal(true)
            }
        }
    }, [data, id])

    useEffect(() => {
        if (showModal) {
            $(`#${modalId}`).modal('show')
        }
    }, [showModal, modalId])

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
        <Fragment>
            <SkillModal id={modalId} data={modalData} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="skillTable" >
                            <Table columns={columns} data={sortedData} initialState={initialState} setModalData={setModalData} modalId={modalId} />
                            {data.length === 0 && <p>Loading ...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortData(data) {
    return data.sort((a, b) => (a.area > b.area) ? 1 : (a.area === b.area) ? ((a.level > b.level) ? 1 : -1) : -1)
}

function RenderTitle({ modalId, row, value, setModalData }) {
    const onclick = () => {
        setModalData(row.values)
        $(`#${modalId}`).modal('show')
    }
    return (
        <Link to={`/skill/${row.values.id}`} onClick={onclick}>{value}</Link>
    )
}