import $ from 'jquery'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './skill-modal.css'
import SkillConfig from '../config/skill-config'

export default function SkillModal(props) {
    const { data } = props
    const history = useHistory()
    const { id } = useParams()
    const [modalData, setModalData] = useState({})
    const modalId = "skill-modal"

    useEffect(() => {
        $(`#${modalId}`).on('hidden.bs.modal', function (event) {
            history.push('/skill')
        })
    }, [modalId, history])

    useEffect(() => {
        if (SkillConfig.FLAGS_SELFEVALUATION) return
        if (id) {
            const [row] = data.filter(d => d.id === id)
            if (row) {
                setModalData(row)
            }
        }
        $(`#${modalId}`).modal(typeof id !== 'undefined' ? 'show' : 'hide')
    }, [data, id])

    return (
        <div className="modal" tabIndex="-1" id={modalId} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Skill</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-2">Title:</div>
                                <div className="col-auto">{modalData.title}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Area:</div>
                                <div className="col-auto">{modalData.area}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Level:</div>
                                <div className="col-auto">{modalData.level}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Scope:</div>
                                <div className="col">{modalData.scope}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}