import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table, Form } from 'semantic-ui-react';
//import Table from './Table.js';

const attributes = ['Title', 'Author', 'Genres', 'PublicationDate'];

const pk = 'Title';

export default class Catalog extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitInsert = this.handleSubmitInsert.bind(this);
    this.state = {
      table: [],
      Title: '',
      Author: '',
      Genres: '',
      PublicationDate: ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
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
  handleSubmitInsert = async e => {
    e.preventDefault();
    var data = {
      Title: this.state.Title,
      Author: this.state.Author,
      Genres: this.state.Genres,
      PublicationDate: this.state.PublicationDate
    }
    console.log(data);
 
    fetch('/bookstore/Catalog/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(function(response) { //response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      //return response if correct
      return response.json();
  }).then(function(data) {
      console.log(data);   
      if(data === "success"){
        alert("IT WORKED RING DING DING");
        //this.setState({msg: "added new item to catalog"});  
      }
  }).catch(function(err) {
      console.log(err)
  });
    //const body = await response.text();
    //this.setState({ responseToPost: body });
  };

  buttonCarousel = () => {
    return <Button.Group className="centered">
      <Button color="green" onClick={this.handleSubmitInsert}>Insert</Button>
      <Button color="blue">Update</Button>
      <Button color="red">Delete</Button>
    </Button.Group>
  }

  SQLForm= () => (
    <Form>
      <Form.Group widths="equal">
        {attributes.map(attributes => 
            <Form.Input fluid key={attributes} label={attributes} name={attributes} placeholder={attributes} value={this.state.attributes} onChange={this.handleChange}/>
        )} 
      </Form.Group>
    </Form>
  )

  displayHeaders = () => {
      return <Table.Row>
            {attributes.map(attributes => 
                <Table.HeaderCell key={attributes}>{ attributes }</Table.HeaderCell>)
                }
            </Table.Row>
  }

  displayValues = () => {
      return this.state.table.map(table =>
        <Table.Row key={table.Title}>
          <Table.Cell>{table.Title} </Table.Cell>
          <Table.Cell>{table.Author} </Table.Cell>
          <Table.Cell>{table.Genres} </Table.Cell>
          <Table.Cell>{table.PublicationDate}</Table.Cell>
        </Table.Row>
      )
  }

  render() {
    return (
      <div>
        <Header as='h1'>
          Use buttons below to make changes to the table
        </Header>
        {this.buttonCarousel()}
        <div className="paddingtop">
          {this.SQLForm()}
        </div>
        {this.state.table
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

