import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table } from 'semantic-ui-react';

const attributes = ['CustomerID', 'Name', 'IsMember', 'Credit'];
//const pk = 'CustomerID';

export default class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: [],
            post: '',
            esponseToPost: ''
        }
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ table: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        let self = this;
        fetch('/bookstore/Customers', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ table: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

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
                <Table.Row key={table.CustomerID}>
                    <Table.Cell>{table.CustomerID} </Table.Cell>
                    <Table.Cell>{table.Name} </Table.Cell>
                    <Table.Cell>{table.IsMember}</Table.Cell>
                    <Table.Cell>{table.Credit}</Table.Cell>
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