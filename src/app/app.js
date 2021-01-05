import React, { Component } from 'react'
import './app.css'
import Api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillTable from '../skill-table/skill-table'

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
      <div className="app" >
        <SkillTable data={this.state.data} />
      </div>
    );
  }
}

export default App
