import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "../App.css";

export default class Navbar extends Component{
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

    return (
      <Menu size = 'massive'>
        <Menu.Item
          as = { Link }
          to = '/'
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as = { Link }
          to = '/Catalog'
          name='Catalog'
          active={activeItem === 'Catalog'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as = { Link }
          to = '/Customers'
          name='Customers'
          active={activeItem === 'Customers'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as = { Link }
          to = '/Orders'
          name='Orders'
          active={activeItem === 'Orders'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as = { Link }
          to = '/Stock'
          name='Stock'
          active={activeItem === 'Stock'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as = { Link }
          to = '/Wholesale'
          name='Wholesale'
          active={activeItem === 'Wholesale'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}