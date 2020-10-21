import React, { Component } from 'react';
import '../App.css';
import { Header, Table } from 'semantic-ui-react';
//import Table from './Table.js';

export default class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table: [],
      post: '',
      responseToPost: ''
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ table: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/bookstore/Catalog');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //Template for INSERT and other operations
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  displayHeaders = () => {
    {
      return <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Author</Table.HeaderCell>
        <Table.HeaderCell>Genres</Table.HeaderCell>
        <Table.HeaderCell>PublicationDate</Table.HeaderCell>
      </Table.Row>
    }
  }

  displayValues = () => {
    {
      return this.state.table.map(table =>
        <Table.Row key={table.Title}>
          <Table.Cell>{table.Author} </Table.Cell>
          <Table.Cell>{table.Genres} </Table.Cell>
          <Table.Cell>{table.PublicationDate}</Table.Cell>
        </Table.Row>
      )
    }
  }

  render() {
    return (
      <div>
        <Header as='h1'>
          HOLD UP RING DING DING DING DING DING DING DING
        </Header>
        {this.state.response
          ? (<Table celled>
            <Table.Header>
              {this.displayHeaders()}
            </Table.Header>

            <Table.Body>
              {this.displayValues()}
            </Table.Body>
          </Table>)
          : (<Header as='h3'> LOADING... </Header>)
        }
      </div>
    );
  }
}

