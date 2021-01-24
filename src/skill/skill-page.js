import { useState, useMemo, useEffect, Fragment } from 'react'
import './skill-page.css'
import Api from '../api/api'
import SkillTable from './skill-table'
import SkillModal from './skill-modal'
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

    return (
        <Fragment>
            <SkillModal id={modalId} data={modalData} showModal={showModal} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <SkillTable data={sortedData} modalId={modalId} setModalData={setModalData} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function sortData(data) {
    return data.sort((a, b) => (a.area > b.area) ? 1 : (a.area === b.area) ? ((a.level > b.level) ? 1 : -1) : -1)
}
