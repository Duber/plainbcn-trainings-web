import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../api/api'
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

    useEffect(() => {
        async function getData() {
            const data = await new Api().getSkills()
            if (id) {
                const [row] = data.filter(d => d.id === id)
                if (row) {
                    setData(row)
                }
            }
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
        return new Api().evaluateSkill(data.id, true)
    }

    const onClickNotQualified = async () => {
        setData(prev => {
            return {
                ...data,
                accomplished: false
            }
        })
        return new Api().evaluateSkill(data.id, false)
    }

    const onClickNotEvaluated = async () => {
        setData(prev => {
            return {
                ...data,
                accomplished: null
            }
        })
        return new Api().evaluateSkill(data.id, null)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                    <Link to={`/skill`}>
                        <button className="btn btn-block btn-outline-secondary">Back</button>
                    </Link>
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
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.notEvaluated}`} onClick={onClickNotEvaluated}>Not Evaluated</button>
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.yes}`} onClick={onClickQualified}>Yes</button>
                        <button type="button" className={`btn btn-sm shadow-none ${qualifiedBtnStyle.no}`} onClick={onClickNotQualified}>No</button>
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