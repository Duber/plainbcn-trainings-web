import './freetrack-new.css'
import FreeTrackConfig from '../config/freetrack-config'

export default function FreeTrackNew() {
    return (
        <a role="button" className="btn btn-outline-secondary freetrack-new" href={FreeTrackConfig.FREETRACK_FORM} target="_blank" rel="noreferrer">New proposal</a>
    )
}