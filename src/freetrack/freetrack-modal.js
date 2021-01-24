import $ from 'jquery'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export default function FreeTrackModal(props) {
    const { id, data, show, setShow } = props
    const history = useHistory()

    useEffect(() => {
        $(`#${id}`).on('hidden.bs.modal', function (event) {
            setShow(false)
            history.push('/freetrack')
        })
    }, [id, history, setShow])

    useEffect(() => {
        if (show) {
            $(`#${id}`).modal('show')
        }
    }, [show, id])

    return (
        <div className="modal" tabIndex="-1" id={id}>
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
                                <div className="col-auto">{data.title}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Area:</div>
                                <div className="col-auto">{data.area}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Level:</div>
                                <div className="col-auto">{data.level}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Owner:</div>
                                <div className="col-auto">{data.owner}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Notes:</div>
                                <div className="col">{data.notes}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}