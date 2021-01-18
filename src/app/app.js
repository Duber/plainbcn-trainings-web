import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import FreeTrackTable from '../freetrack-table/freetrack-table'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from '../navbar/navbar'
import NotFound from '../not-found/not-found'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <SkillTable />
        </Route>
        <Route path="/freetrack">
          <Navbar />
          <FreeTrackTable />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}