import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table } from 'semantic-ui-react';

export default class Wholesale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: []
        }
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

    buttonCarousel = () => {
        return <Button.Group className="centered">
          <Button color="green">Insert</Button>
          <Button color="blue">Update</Button>
          <Button color="red">Delete</Button>
        </Button.Group>
    }

    displayHeaders = () => {
        {
            return <Table.Row>
                <Table.HeaderCell>OrderID</Table.HeaderCell>
                <Table.HeaderCell>ISBN</Table.HeaderCell>
                <Table.HeaderCell>Publisher</Table.HeaderCell>
                <Table.HeaderCell>UnitPrice</Table.HeaderCell>
                <Table.HeaderCell>UnitsPurchased</Table.HeaderCell>
                <Table.HeaderCell>TotalPrice</Table.HeaderCell>
                <Table.HeaderCell>OrderID</Table.HeaderCell>
                <Table.HeaderCell>OrderDate</Table.HeaderCell>
            </Table.Row>
        }
    }

    displayValues = () => {
        {
            return this.state.table.map(table =>
                <Table.Row key={table.OrderID}>
                    <Table.Cell>{table.OrderID} </Table.Cell>
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