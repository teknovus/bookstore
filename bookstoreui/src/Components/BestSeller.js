import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Table, Form} from 'semantic-ui-react';

const attributes = ['Title', 'Author', 'Sales'];

export default class BestSeller extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            StartDate: '',
            EndDate: '',
            Top: '',
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
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            Top: this.state.Top
        }

        fetch('/bookstore/BestSeller/submit', {
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
            self.setState({table: data});//{table: data});
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
                <Table.Row>
                    <Table.Cell>{table.Title} </Table.Cell>
                    <Table.Cell>{table.Author} </Table.Cell>
                    <Table.Cell>{table.Language}</Table.Cell>
                </Table.Row>
            )
    }

    render() {
        <div>
            <Form>
                <Form.Group widths="equal" className="margin-bottom">
                    <Form.Input label="StartDate" name="StartDate" placeholder="Start Date:YYYYMMDD" onChange={this.handleChange} value={this.state.StartDate} />
                    <Form.Input label="EndDate" name="EndDate" placeholder="End Date:YYYYMMDD" onChange={this.handleChange} value={this.state.EndDate}/>
                    <Form.Input label="Top" name="Top" placeholder="End Date:YYYYMMDD" onChange={this.handleChange} value={this.state.Top}/>
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
    }

}
