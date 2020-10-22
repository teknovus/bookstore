import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table } from 'semantic-ui-react';

const attributes = ['ISBN', 'Title', 'NumInStock', 'PrintType', 'Language','Price'];
//const pk = 'ISBN';

export default class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/bookstore/Stock', {
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
                <Table.Row key={table.Title}>
                    <Table.Cell>{table.Title} </Table.Cell>
                    <Table.Cell>{table.NumInStock} </Table.Cell>
                    <Table.Cell>{table.PrintType} </Table.Cell>
                    <Table.Cell>{table.Language}</Table.Cell>
                    <Table.Cell>{table.Price}</Table.Cell>
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