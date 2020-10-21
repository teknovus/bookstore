import React, { Component } from 'react';
import '../App.css';
import { Header, Table } from 'semantic-ui-react';
//import Table from './Table.js';

export default class Catalog extends Component{
   
  state = {
    response: [],
    post: '',
    responseToPost: '',
  };
      
      componentDidMount() {
        this.callApi()
          //.then(res => this.setState({ response: res }))
          .catch(err => console.log(err));
      }
      
      callApi = async () => {
        const response = await fetch('/bookstore/Catalog');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ response: body })
        //console.log(this.state.response);
        return body;
      };
      
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

    render(){
        return(
            <div>
                <Header as='h1'>
                  HOLD UP RING DING DING DING DING DING DING DING
                </Header>
                {this.state.response
                  ? (<Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Header</Table.HeaderCell>
                          
                        </Table.Row>
                      </Table.Header>
    
                      <Table.Body>
                        <Table.Row>
                          {this.state.response.map(response =>
                              <Table.row key={response.TItle}>
                                  <Table.Cell>{response.Author} </Table.Cell>
                                  <Table.Cell>{response.Genres}</Table.Cell>
                                  <Table.Cell>{response.PublicationDate}</Table.Cell>
                              </Table.row>
                          )}
                        </Table.Row>
                      </Table.Body>
                    </Table>)
                  : (<Header as='h3'> LOADING... </Header>)
                }
                <p>{JSON.stringify(this.state.response)}</p>
            </div>
        );
    }
}

