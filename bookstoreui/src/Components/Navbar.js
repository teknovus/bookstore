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
      </Menu>
    )
  }
}