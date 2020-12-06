import React, { Component } from 'react';
import '../App.css';
import { Button, Header, Form} from 'semantic-ui-react';

export default class Profit extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            StartDate: '',
            EndDate: '',
            profit: ''
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
            EndDate: this.state.EndDate
        }

        fetch('/bookstore/Profit/submit', {
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
            //JSONObject json = (JSONObject) JSONSerializer.toJSON(data);  
            self.setState({profit: data[0][0]["@profits"]});//{table: data});
        }).catch(err => {
            console.log('caught it!', err);
        })
    };
    
    render () {
        return(
            <div>
                <Form>
                    <Form.Group widths="equal" className="margin-bottom">
                        <Form.Input label="StartDate" name="StartDate" placeholder="Start Date:YYYYMMDD" onChange={this.handleChange} value={this.state.StartDate} />
                        <Form.Input label="EndDate" name="EndDate" placeholder="End Date:YYYYMMDD" onChange={this.handleChange} value={this.state.EndDate}/>
                    </Form.Group>
                </Form>
                <Button color="green" onClick={this.handleSubmit}>Submit to Execute Report</Button>
                {this.state.profit !==0? (<Header as='h3'> Profit: {String(this.state.profit)}</Header>):(<Header as='h3'>Profit: Report Not Generated</Header>)}
            </div>
        );
    }
}