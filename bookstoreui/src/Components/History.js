import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table, Form } from 'semantic-ui-react';

const attributes = ['OrderNumber', 'ISBN', 'OrderDate', 'Price', 'Status'];

export default class History extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            customerID: '',
            table: []
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    handleSubmit = async e => {
        e.preventDefault();
        let self = this;
        var data = {
            customerID: this.state.customerID
        }

        fetch('/bookstore/History/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            //Get three objects...  
            self.setState({table: data[0]});//{table: data});
        }).catch(err => {
            console.log('caught it!', err);
        })
    };

    displayHeaders = () => {
        return <Table.Row>
        {attributes.map(attributes => 
            <Table.HeaderCell key={attributes}>{ attributes }</Table.HeaderCell>)
            }
        </Table.Row>    
    }

    displayValues = () => {
            return this.state.table.map(table =>
                <Table.Row key={table.OrderNumber+table.ISBN}>
                    <Table.Cell>{table.OrderNumber} </Table.Cell>
                    <Table.Cell>{table.ISBN} </Table.Cell>
                    <Table.Cell>{table.OrderDate}</Table.Cell>
                    <Table.Cell>{table.Price}</Table.Cell>
                    <Table.Cell>{table.Status}</Table.Cell>
                </Table.Row>
            )
    }

    render() {
        return(
            <div>
                <Form>
                    <Form.Group widths="equal" className="margin-bottom">
                        <Form.Input label="CustomerID" name="customerID" placeholder="CustomerID: XXXXXXXXX" onChange={this.handleChange} value={this.state.customerID}/>
                    </Form.Group>
                </Form>
                <Button color="green" onClick={this.handleSubmit}>Submit to Execute Report</Button>
            
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
