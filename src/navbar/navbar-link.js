import { Link, useRouteMatch } from 'react-router-dom'

export default function NavbarLink({ label, to, exact }) {
    let match = useRouteMatch({
        path: to,
        exact: exact
    });

    return (
        <li className={`nav-item ${match ? 'active' : ''}`}><Link className="nav-link" to={to}>{label}</Link></li>
    )
}