import { useState, useMemo, useEffect, useCallback } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './freetrack-page.css'
import Api from '../api/api'
import { Fragment } from 'react';
import FreeTrackNew from './freetrack-new'
import $ from 'jquery'
import { useParams, useHistory, Link } from 'react-router-dom'

const unlikedCellStyleClasses = 'fas fa-heart'
const likedCellStyleClasses = 'far fa-heart'
const unlikeColStyleClasses = 'freetrack-likecol freetrack-likecol__notliked'
const likeColStyleClasses = 'freetrack-likecol freetrack-likecol__liked'
const maxLikes = 3

function sortData(data) {
    return data.sort((a, b) => {
        if (a.scheduled == null && b.scheduled == null) {
            return b.likes - a.likes
        }
        if (a.scheduled == null) return 1
        if (b.scheduled == null) return -1
        return Date.parse(a.scheduled) - Date.parse(b.scheduled)
    })
}


function ScheduledColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="true">Future</option>
            <option value="">All</option>
        </select>
    )
}

function ScheduledColumnFilterFn(rows, id, filterValue) {
    const today = new Date()
    switch (filterValue) {
        case "true":
            return rows.filter((row) => (row.values[id] === null) || Date.parse(row.values[id]) >= today)
        default:
            return rows
    }
}

function RenderLikes({ row, value, data, setData, currentLikes }) {
    const cellStyle = row.values.liked ? likeColStyleClasses : unlikeColStyleClasses
    const iconStyle = row.values.liked ? unlikedCellStyleClasses : likedCellStyleClasses
    const onclick = async () => {
        await toggleLike(row.index, data, setData)
    }
    const disabled = row.values.liked ? false : (currentLikes >= maxLikes)
    return (
        <button className={cellStyle} onClick={onclick} disabled={disabled}><i className={iconStyle} /> {value}</button>
    )
}

async function toggleLike(rowIndex, data, setData) {
    setData(old => old.map((row, index) => {
        if (index === rowIndex) {
            row.liked = !row.liked
            row.likes = row.liked ? row.likes + 1 : row.likes - 1
        }
        return row
    }))
    const rowData = data[rowIndex]
    rowData.liked ? await new Api().likeFreeTrack(rowData.id) : await new Api().unlikeFreeTrack(rowData.id)
}

export default function FreeTrackPage() {
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState({})
    const { id } = useParams()
    const history = useHistory()

    const initialState = {
        filters: [{ id: 'scheduled', value: 'true' }],
        hiddenColumns: ['liked', 'id', 'owner', 'notes']
    }

    const sortedData = useMemo(() => sortData(data), [data])

    const currentLikes = useMemo(() => {
        const today = new Date()
        return data.filter(d => d.scheduled === null || Date.parse(d.scheduled) >= today).reduce((numLikes, d) => numLikes + (d.liked ? 1 : 0), 0)
    }, [data])

    const showModal = useCallback((row) => {
        setModalData(row)
        $('#freetrack-modal').modal('show')
    }, [])

    useEffect(() => {
        async function getData() {
            const newData = await new Api().getFreeTrack()
            setData(newData)
            if (id) {
                const [row] = newData.filter(d => d.id === id)
                showModal(row)
            }
        }
        getData()
    }, [])

    const RenderTitle = useCallback(({ row, value }) => {
        const onclick = () => {
            showModal(row.values)
        }

        return (
            <Link to={`/freetrack/${row.values.id}`} onClick={onclick}>{value}</Link>
        )
    }, [showModal])

    const columns = useMemo(() =>
        [
            {
                Header: 'Type',
                accessor: 'type',
                Filter: SelectColumnFilter,
                width: '10vmax'
            },
            {
                Header: 'Area',
                accessor: 'area',
                Filter: SelectColumnFilter,
                width: '10vmax'
            },
            {
                Header: 'Level',
                accessor: 'level',
                Filter: SelectColumnFilter,
                width: '10vmax'
            },
            {
                Header: 'Title',
                accessor: 'title',
                Filter: TextSearchColumnFilter,
                Cell: RenderTitle,
                width: '40vmax'
            },
            {
                Header: 'Scheduled',
                accessor: 'scheduled',
                Filter: ScheduledColumnFilter,
                filter: ScheduledColumnFilterFn,
                width: '10vmax'
            },
            {
                Header: 'Likes',
                accessor: 'likes',
                disableFilters: true,
                width: '1vmax',
                Cell: RenderLikes
            },
            {
                id: 'liked',
                accessor: 'liked'
            },
            {
                id: 'id',
                accessor: 'id'
            },
            {
                id: 'owner',
                accessor: 'owner'
            },
            {
                id: 'notes',
                accessor: 'notes'
            }
        ], [RenderTitle])

    function onCloseModal() {
        history.push('/freetrack')
    }

    return (
        <Fragment>
            <div className="modal" tabIndex="-1" id="freetrack-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Free Track {modalData.type}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <FreeTrackNew />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="freetrack-table" >
                            <Table columns={columns} data={sortedData} initialState={initialState} setData={setData} currentLikes={currentLikes} />
                            {data.length === 0 && <p>Loading ...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}