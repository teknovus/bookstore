import React, { Component } from 'react';
import '../App.css';
import { Header } from 'semantic-ui-react';

export default class Catalog extends Component{
   
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
      
      componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res }))
          .catch(err => console.log(err));
          console.log("Mounting:" + JSON.stringify(this.state.response));
      }
      
      callApi = async () => {
        const response = await fetch('/bookstore/Catalog');
        const body = await response.json();
        //console.log(JSON.stringify(body));
        if (response.status !== 200) throw Error(body.message);
        this.setState({ response: body })
        console.log(JSON.stringify(this.state.response));
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
                <p>{JSON.stringify(this.state.response)}</p>
            </div>
        );
    }
}