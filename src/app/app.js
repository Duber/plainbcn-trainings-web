import React, { Component } from 'react'
import './app.css'
import Api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import FreeTrackTable from '../freetrack-table/freetrack-table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from '../navbar/navbar'
import NotFound from '../not-found/not-found'

class App extends Component {
  constructor() {
    super();
    this.state = { skills: [], freetrack: [] };
  }

  async componentDidMount() {
    const api = new Api()
    let skills = api.getSkills()
    let freetrack = api.getFreeTrack()
    this.setState({ skills: await skills })
    this.setState({ freetrack: await freetrack })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Container fluid>
              <Row>
                <Col>
                  <SkillTable data={this.state.skills} />
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
}

export default App
