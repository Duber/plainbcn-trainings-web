import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SkillPage from '../skill/skill-page'
import FreeTrackPage from '../freetrack/freetrack-page'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from '../navbar/navbar'
import NotFound from '../not-found/not-found'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/skill"/>
        </Route>
        <Route path="/skill/:id?">
          <Navbar />
          <SkillPage />
        </Route>
        <Route path="/freetrack/:id?">
          <Navbar />
          <FreeTrackPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}