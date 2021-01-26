import { useState, useMemo, useEffect, Fragment } from 'react'
import './freetrack-page.css'
import Api from '../api/api'
import FreeTrackNew from './freetrack-new'
import FreeTrackModal from './freetrack-modal'
import FreeTrackTable from './freetrack-table'

export default function FreeTrackPage() {
    const [data, setData] = useState([])
    const sortedData = useMemo(() => sortData(data), [data])

    useEffect(() => {
        async function getData() {
            const newData = await new Api().getFreeTrack()
            setData(newData)
        }
        getData()
    }, [])

    return (
        <Fragment>
            <FreeTrackModal data={data} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <FreeTrackNew />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FreeTrackTable data={sortedData} setData={setData} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

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

