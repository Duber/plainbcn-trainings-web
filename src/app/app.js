import React, { Component, Fragment } from 'react'
import './app.css'
import Api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import FreeTrackTable from '../freetrack-table/freetrack-table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from '../navbar/navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Fragment>
        <Router>
          <Navbar />
          <Container fluid>
            <Row>
              <Col>
                <Switch>
                  <Route exact path="/">
                    <SkillTable data={this.state.skills} />
                  </Route>
                  <Route path="/freetrack">
                    <FreeTrackTable data={this.state.freetrack} />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </Fragment>
    );
  }
}

export default App
