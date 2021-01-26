import $ from 'jquery'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './freetrack-modal.css'

export default function FreeTrackModal(props) {
    const { data} = props
    const history = useHistory()
    const { id } = useParams()
    const [modalData, setModalData] = useState({})
    const modalId = "freetrack-modal"

    useEffect(() => {
        $(`#${modalId}`).on('hidden.bs.modal', function (event) {
            history.push('/freetrack')
        })
    }, [modalId, history])

    useEffect(() => {
        if (id) {
            const [row] = data.filter(d => d.id === id)
            if (row) {
                setModalData(row)
            }
        }
        $(`#${modalId}`).modal(typeof id !== 'undefined' ? 'show' : 'hide')
    }, [data, id, modalId])

    return (
        <div className="modal" tabIndex="-1" id={modalId} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Free Track {data.type}</h4>
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
                                <div className="col-2">Owner:</div>
                                <div className="col-auto">{modalData.owner}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Notes:</div>
                                <div className="col">{modalData.notes}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}