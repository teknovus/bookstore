import React, { Component } from 'react';
import '../App.css';

export default class Table extends Component { 
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }
    
    componentDidMount(){
        this.wait();
    }    

    wait = async () => {
        await delay(5000);
    };

    getKeys(){
        if(this.props.json){
            return Object.keys(this.props.json[0]);  
        }
    }
    
    getHeader(){
        if(this.props.json){
            var keys = this.getKeys();
            return keys.map((key, index)=>{
                return <th key={key}>{key.toUpperCase()}</th>
            })
        }
    }
    
    getRowsData(){
        if(this.props.json){
            var items = this.props.json;
            var keys = this.getKeys();
            return items.map((row, index)=>{
                return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
            })
        }
        
    }
    
    render() {
        return (
                <div>
                    <table>
                        <thead>
                            <tr>{this.getHeader()}</tr>
                        </thead>
                        <tbody>
                            {this.getRowsData()}
                        </tbody>
                    </table>
                </div>
        );
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
}