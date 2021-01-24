import $ from 'jquery'
import { useMemo, useEffect } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import { Link } from 'react-router-dom'
import Api from '../api/api'

const unlikedCellStyleClasses = 'fas fa-heart'
const likedCellStyleClasses = 'far fa-heart'
const unlikeColStyleClasses = 'freetrack-likecol freetrack-likecol__notliked'
const likeColStyleClasses = 'freetrack-likecol freetrack-likecol__liked'
const maxLikes = 3

export default function FreeTrackTable(props) {
    const { data, setData, modalId, setModalData, showModal } = props

    useEffect(() => {
        if (showModal) {
            $(`#${modalId}`).modal('show')
        }
    }, [showModal, modalId])

    const initialState = {
        filters: [{ id: 'scheduled', value: 'true' }],
        hiddenColumns: ['liked', 'id', 'owner', 'notes']
    }

    const currentLikes = useMemo(() => {
        const today = new Date()
        return data.filter(d => d.scheduled === null || Date.parse(d.scheduled) >= today).reduce((numLikes, d) => numLikes + (d.liked ? 1 : 0), 0)
    }, [data])

    const columns = useMemo(() => [
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
    ], [])

    return (
        <div className="freetrack-table" >
            <Table columns={columns} data={data} initialState={initialState} setData={setData} modalId={modalId} setModalData={setModalData} currentLikes={currentLikes} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    )
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
    const row = data[rowIndex]
    row.liked = !row.liked
    row.likes = row.liked ? row.likes + 1 : row.likes - 1

    setData(old => old.map((r, index) => {
        if (index === rowIndex) {
            return row
        }
        return r
    }))
    row.liked ? await new Api().likeFreeTrack(row.id) : await new Api().unlikeFreeTrack(row.id)
}

function RenderTitle({ modalId, row, value, setModalData }) {
    const onclick = () => {
        setModalData(row.values)
        $(`#${modalId}`).modal('show')
    }
    return (
        <Link to={`/freetrack/${row.values.id}`} onClick={onclick}>{value}</Link>
    )
}