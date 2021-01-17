import { useState, useMemo, useEffect } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './freetrack-table.css'
import Api from '../api/api'

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
    let today = new Date()
    switch (filterValue) {
        case "true":
            return rows.filter((row) => (row.values[id] === null) || Date.parse(row.values[id]) >= today)
        default:
            return rows
    }
}

function RenderLikes({ row, value, data, setData, currentLikes }) {
    let cellStyle = row.values.liked ? likeColStyleClasses : unlikeColStyleClasses
    let iconStyle = row.values.liked ? unlikedCellStyleClasses : likedCellStyleClasses
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

export default function FreeTrackTable() {
    const initialState = {
        filters: [{ id: 'scheduled', value: 'true' }],
        hiddenColumns: ['liked', 'id']
    }
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])
    const currentLikes = useMemo(() => {
        const today = new Date()
        return data.filter(d => d.scheduled === null || Date.parse(d.scheduled) >= today).reduce((numLikes, d) => numLikes + (d.liked ? 1 : 0), 0)
    }, [data])

    useEffect(() => {
        async function getData() {
            setData(await new Api().getFreeTrack())
        }
        getData()
    }, [])


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
        }
    ], [])

    return (
        <div className="freetrack-table" >
            <Table columns={columns} data={sortedData} initialState={initialState} setData={setData} currentLikes={currentLikes} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    );
}