import React, { Component } from 'react'
import './app.css'
import Api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'
import WelcomeMessage from '../welcome-message/welcome-message'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
      <Container className="app">
        <Row>
          <Col><WelcomeMessage/></Col>
        </Row>
        <Row>
          <Col><SkillTable data={this.state.data} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App
