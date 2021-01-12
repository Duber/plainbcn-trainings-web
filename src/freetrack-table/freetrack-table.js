import { useState, useMemo, useEffect } from 'react'
import { Table, SelectColumnFilter, TextSearchColumnFilter } from '../table/table';
import './freetrack-table.css'
import Api from '../api/api'

const unlikedCellStyleClasses = 'fas fa-heart';
const likedCellStyleClasses = 'far fa-heart';
const unlikeColStyleClasses = 'freetrack-likecol freetrack-likecol__notliked';
const likeColStyleClasses = 'freetrack-likecol freetrack-likecol__liked';

function FreeTrackTable(props) {
    const initialState = {
        filters: [{ id: 'scheduled', value: 'true' }],
        hiddenColumns: ['liked', 'id']
    }
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])

    useEffect(() => {
        async function getData(){
            setData(await new Api().getFreeTrack())
        }
        getData()
    }, [])

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

    function renderLikes({ row, value }) {
        let cellStyle = row.values.liked ? likeColStyleClasses : unlikeColStyleClasses
        let iconStyle = row.values.liked ? unlikedCellStyleClasses : likedCellStyleClasses
        return (
            <button className={cellStyle} data-id={row.values.id} onClick={toggleLike}><i className={iconStyle} /> {value}</button>
        )
    }

    async function toggleLike(e) {
        const id = e.currentTarget.dataset.id
        const className = e.currentTarget.className
        const isLike = className.includes(unlikeColStyleClasses)
        const numLikes = parseInt(e.currentTarget.innerText)
        const innerHTML = e.currentTarget.innerHTML

        e.currentTarget.className = isLike ? className.replace(unlikeColStyleClasses, likeColStyleClasses) : className.replace(likeColStyleClasses, unlikeColStyleClasses)
        e.currentTarget.innerHTML = isLike ? innerHTML.replace(likedCellStyleClasses, unlikedCellStyleClasses) : innerHTML.replace(unlikedCellStyleClasses, likedCellStyleClasses)
        e.currentTarget.lastChild.data = isLike ? ` ${numLikes + 1}` : ` ${numLikes - 1}`

        isLike ? await new Api().likeFreeTrack(id) : await new Api().unlikeFreeTrack(id)
    }

    const columns = [
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
            Cell: renderLikes
        },
        {
            id: 'liked',
            accessor: 'liked'
        },
        {
            id: 'id',
            accessor: 'id'
        }
    ]

    return (
        <div className="freetrack-table" >
            <Table columns={columns} data={sortedData} initialState={initialState} />
            {data.length === 0 && <p>Loading ...</p>}
        </div>
    );
}

export default FreeTrackTable