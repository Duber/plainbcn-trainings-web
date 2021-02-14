import { useState, useMemo, useEffect, Fragment } from 'react'
import './skill-page.css'
import SkillTable from './skill-table'
import SkillModal from './skill-modal'
import { skillService } from './skill-service'

export default function SkillPage() {
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])

    useEffect(() => {
        async function getData() {
            setData(await skillService.getSkills())
        }
        getData()
    }, [])

    return (
        <Fragment>
            <SkillModal data={data} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <SkillTable data={sortedData} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function sortData(data) {
    return data.sort((a, b) => (a.area > b.area) ? 1 : (a.area === b.area) ? ((a.level > b.level) ? 1 : -1) : -1)
}
