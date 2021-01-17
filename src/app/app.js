import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import FreeTrackTable from '../freetrack-table/freetrack-table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from '../navbar/navbar'
import NotFound from '../not-found/not-found'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Container fluid>
            <Row>
              <Col>
                <SkillTable />
              </Col>
            </Row>
          </Container>
        </Route>
        <Route path="/freetrack">
          <Navbar />
          <Container fluid>
            <Row>
              <Col>
                <FreeTrackTable />
              </Col>
            </Row>
          </Container>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}