import React, { Component } from 'react';
import '../App.css';
import { Header } from 'semantic-ui-react';

const mysql = require('mysql');

export default class Home extends Component{
    render(){
        return(
            <div>
                <Header as='h1'>
                    My Name Jeff
                </Header>
                <div>
                    BRUH MOMENT
                </div>
            </div>
        );
    }
}