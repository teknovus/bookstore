import React, { Component } from 'react';
import '../App.css';
import { Header } from 'semantic-ui-react';

export default class Home extends Component{
    render(){
        return(
            <div>
                <Header as='h1'>
                    Welcome to our Bookstore Project for CS348
                </Header>
                <div>
                    Developed by Owen Shen, Connor Crowe, Joshua Hu
                </div>
            </div>
        );
    }
}