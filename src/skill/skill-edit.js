import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { api } from '../api/api'
import { skillService } from './skill-service'
import './skill-edit.css'

export default function SkillEdit() {
    const qualifiedBtnOn = "btn-primary"
    const qualifiedBtnOff = "btn-light"
    const [data, setData] = useState({})
    const [qualifiedBtnStyle, setQualifiedBtnStyle] = useState({
        notEvaluated: qualifiedBtnOff,
        yes: qualifiedBtnOff,
        no: qualifiedBtnOff
    })
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        async function getData() {
            if (!id) return
            setData(await skillService.getSkill(id))
        }
        getData()
    }, [id])

    useEffect(() => {
        if (typeof data.accomplished === 'undefined') return
        const q = {
            notEvaluated: data.accomplished === null ? qualifiedBtnOn : qualifiedBtnOff,
            yes: data.accomplished ? qualifiedBtnOn : qualifiedBtnOff,
            no: data.accomplished !== null && !data.accomplished ? qualifiedBtnOn : qualifiedBtnOff
        }
        setQualifiedBtnStyle(q)
    }, [data])

    const onClickQualified = async () => {
        setData(prev => {
            return {
                ...data,
                accomplished: true
            }
        })
        const user = await api.getUser()
        user.skills.fit = user.skills.fit.filter(s => s !== data.id)
        user.skills.unfit = user.skills.unfit.filter(s => s !== data.id)
        user.skills.fit.push(data.id)
        await api.saveUser(user)
    }

    const onClickNotQualified = async () => {
        setData(prev => {
            return {
                ...data,
                accomplished: false
            }
        })
        const user = await api.getUser()
        user.skills.fit = user.skills.fit.filter(s => s !== data.id)
        user.skills.unfit = user.skills.unfit.filter(s => s !== data.id)
        user.skills.unfit.push(data.id)
        await api.saveUser(user)
    }

    const onClickNotEvaluated = async () => {
        setData(prev => {
            return {
                ...data,
                accomplished: null
            }
        })
        const user = await api.getUser()
        user.skills.fit = user.skills.fit.filter(s => s !== data.id)
        user.skills.unfit = user.skills.unfit.filter(s => s !== data.id)
        await api.saveUser(user)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                    <button type="button" className="btn btn-block btn-outline-secondary" onClick={() => history.push("/skill")}>Back</button>
                </div>
            </div>
            <div className="row">
                <div className="col-1 offset-md-1">
                    Title
                </div>
                <div className="col">
                    {data.title}
                </div>
            </div>
            <div className="row">
                <div className="col-1 offset-md-1">
                    Area
                </div>
                <div className="col">
                    {data.area}
                </div>
            </div>
            <div className="row">
                <div className="col-1 offset-md-1">
                    Level
                </div>
                <div className="col">
                    {data.level}
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-1 offset-md-1">
                    Qualified
                </div>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Qualified?">
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.notEvaluated}`} onClick={onClickNotEvaluated} disabled={!data.published}>Not Evaluated</button>
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.yes}`} onClick={onClickQualified} disabled={!data.published}>Yes</button>
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.no}`} onClick={onClickNotQualified} disabled={!data.published}>No</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-1 offset-md-1">
                    Scope
                </div>
                <div className="col">
                    <span id="scope">
                        {data.scope}
                    </span>
                </div>
            </div>
        </div>
    )
}