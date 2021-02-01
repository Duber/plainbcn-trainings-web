import './freetrack-new.css'
import FreeTrackConfig from '../config/freetrack-config'

export default function FreeTrackNew() {
    return (
        <a role="button" className="btn btn-outline-secondary freetrack-new" href={FreeTrackConfig.REACT_APP_FREETRACK_FORM} target="_blank" rel="noreferrer">New proposal</a>
    )
}