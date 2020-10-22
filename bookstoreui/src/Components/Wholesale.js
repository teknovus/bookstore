import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table, Form } from 'semantic-ui-react';

const attributes = ['ISBN', 'Publisher', 'UnitPrice', 'UnitsPurchased', 'TotalPrice','OrderID','OrderDate'];
const pk = 'OrderID';

export default class Wholesale extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitInsert = this.handleSubmitInsert.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleSubmitUpdate= this.handleSubmitUpdate.bind(this);
        this.state = {
            table: [],
            ISBN: '',
            Publisher: '',
            UnitPrice: '',
            UnitsPurchased: '',
            TotalPrice: '',
            OrderID: '',
            OrderDate: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    componentDidMount() {
        let self = this;
        fetch('/bookstore/Wholesale', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({table: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    handleSubmitInsert = async e => {
        e.preventDefault();
        var data = {
            ISBN: this.state.ISBN,
            Publisher: this.state.Publisher,
            UnitPrice: this.state.UnitPrice,
            UnitsPurchased: this.state.UnitsPurchased,
            TotalPrice: this.state.TotalPrice,
            OrderID: this.state.OrderID,
            OrderDate: this.state.OrderDate
        }
        console.log(data);
     
        fetch('/bookstore/Wholesale/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(function(response) { 
          if (response.status >= 400) {
            alert("Error!");
            throw new Error("Bad response from server");
          }
          //return response if correct
          return response.json();
      }).then(function(data) {
          console.log(data);   
          if(data.affectedRows === 1){
            alert("Inserted successfully into the table");
          }
      }).catch(function(err) {
          console.log(err)
      });
        //const body = await response.text();
        //this.setState({ responseToPost: body });
      };
    
      handleSubmitDelete = async e => {
        var data = {
          pk: this.state.OrderID
        }
        fetch("/bookstore/Wholesale/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              alert("Error!");
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data){
              alert("Deleted successfully");
            }
        }).catch(function(err) {
            console.log(err)
        });
      }
    
      handleSubmitUpdate = async e => {
        var data = {
            pk: this.state.OrderID,
            ISBN: this.state.ISBN,
            Publisher: this.state.Publisher,
            UnitPrice: this.state.UnitPrice,
            UnitsPurchased: this.state.UnitsPurchased,
            TotalPrice: this.state.TotalPrice,
            OrderDate: this.state.OrderDate
        }
        fetch("/bookstore/Wholesale/update", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              alert("Error!");
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data){
              alert("Updated successfully");
            }
        }).catch(function(err) {
            console.log(err)
        });
      }

    buttonCarousel = () => {
        return <Button.Group className="centered">
          <Button color="green" onClick={this.handleSubmitInsert}>Insert</Button>
          <Button color="blue" onClick={this.handleSubmitUpdate}>Update</Button>
          <Button color="red" onClick={this.handleSubmitDelete}>Delete</Button>
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
                <Table.Row key={table.OrderID}>
                    <Table.Cell>{table.ISBN} </Table.Cell>
                    <Table.Cell>{table.Publisher} </Table.Cell>
                    <Table.Cell>{table.UnitPrice} </Table.Cell>
                    <Table.Cell>{table.UnitsPurchased}</Table.Cell>
                    <Table.Cell>{table.TotalPrice}</Table.Cell>
                    <Table.Cell>{table.OrderID}</Table.Cell>
                    <Table.Cell>{table.OrderDate}</Table.Cell>
                </Table.Row>
            )
    }

    render() {
        return (
        <div>
            <Header as='h2'>
                    Specify the primary key "{pk}" for Update/Delete
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