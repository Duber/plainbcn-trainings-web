import './freetrack-new.css'

export default function FreeTrackNew() {
    return (
        <a role="button" className="btn btn-outline-secondary freetrack-new" href={process.env.REACT_APP_FREETRACK_FORM} target="_blank" rel="noreferrer">New proposal</a>
    )
}