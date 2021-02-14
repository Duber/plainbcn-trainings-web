import { useState, useMemo, useEffect, Fragment } from 'react'
import './skill-page.css'
import { api } from '../api/api'
import SkillTable from './skill-table'
import SkillModal from './skill-modal'

export default function SkillPage() {
    const [data, setData] = useState([]);
    const sortedData = useMemo(() => sortData(data), [data])

    useEffect(() => {
        async function getData() {
            let skills = await api.getSkills()
            const user = await api.getUser()
            skills = skills.map(s => {
                return {
                    ...s,
                    accomplished: user.skills.fit.includes(s.id) ? true : user.skills.unfit.includes(s.id) ? false : null
                }
            })
            setData(skills)
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
