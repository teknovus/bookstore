import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table } from 'semantic-ui-react';

const attributes = ['CustomerID', 'OrderNumber', 'ISBN', 'OrderDate', 'Price','Status'];
//const pk = 'OrderNumber';

export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/bookstore/Orders', {
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

    buttonCarousel = () => {
        return <Button.Group className="centered">
          <Button color="green">Insert</Button>
          <Button color="blue">Update</Button>
          <Button color="red">Delete</Button>
        </Button.Group>
    }

    displayHeaders = () => {
            return <Table.Row>
            {attributes.map(attributes => 
                <Table.HeaderCell key={attributes}>{ attributes }</Table.HeaderCell>)
                }
            </Table.Row>
    }

    displayValues = () => {
            return this.state.table.map(table =>
                <Table.Row key={table.OrderNumber}>
                    <Table.Cell>{table.CustomerID} </Table.Cell>
                    <Table.Cell>{table.OrderNumber} </Table.Cell>
                    <Table.Cell>{table.ISBN} </Table.Cell>
                    <Table.Cell>{table.OrderDate}</Table.Cell>
                    <Table.Cell>{table.Price}</Table.Cell>
                    <Table.Cell>{table.Status}</Table.Cell>
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