import React, { Component } from 'react';
import '../App.css';
import { Header } from 'semantic-ui-react';

export default class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Customers: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/bookstore/Customers', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({Customers: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    render() {
        return (
            <div className="container center"> 
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>isMember</th>
                                <th>Credit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.Customers.map(Customers =>
                            <tr key={Customers.CustomerID}>
                            <td>{Customers.Name} </td>
                            <td>{Customers.IsMember}</td>
                            <td>{Customers.Credit}</td>
                            <td><a>Edit</a>|<a>Delete</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            );
    }
}