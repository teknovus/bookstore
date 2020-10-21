import React, { Component } from 'react';
import '../App.css';
import { Header, Table } from 'semantic-ui-react';

export default class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Stock: []
        }
    }

    componentDidMount() {
        fetch('/bookstore/Stock', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            this.setState({Stock: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    render() {
        return (
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>NumInStock</th>
                            <th>PrintType</th>
                            <th>Language</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.Stock.map(Stock =>
                        <tr key={Stock.ISBN}>
                        <td>{Stock.Title} </td>
                        <td>{Stock.NumInStock}</td>
                        <td>{Stock.PrintType}</td>
                        <td>{Stock.Price}</td>
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