import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
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
        <Dropdown item text='Reports'>
          <Dropdown.Menu>
            <Dropdown.Item
            as = { Link }
            to = '/Profit'
            name='Profit'
            active={activeItem === 'Profit'}
            onClick={this.handleItemClick}>Profits</Dropdown.Item>
            <Dropdown.Item
              as = { Link }
              to = '/BestSeller'
              name='Bestseller'
              active={activeItem === 'Bestseller'}
              onClick={this.handleItemClick}>Bestseller</Dropdown.Item>
          <Dropdown.Item
              as = { Link }
              to = '/Purchasable'
              name='Purchasable'
              active={activeItem === 'Purchasable'}
              onClick={this.handleItemClick}>Purchasable</Dropdown.Item>
            <Dropdown.Item
              as = { Link }
              to = '/History'
              name='History'
              active={activeItem === 'History'}
              onClick={this.handleItemClick}>History</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
  }
}