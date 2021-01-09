import React, { Component, Fragment } from 'react'
import './app.css'
import Api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from '../navbar/navbar'

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const api = new Api()
    let data = await api.getAll()
    this.setState({ data: data })
  }

  render() {
    return (
      <Fragment>
        <Navbar/>
        <Container fluid>
          <Row>
            <Col><SkillTable data={this.state.data} /></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App
