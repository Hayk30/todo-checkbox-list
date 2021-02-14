import React, { Component } from 'react';
import './lifeSicle.css'

export default class LifeSicle extends Component{
    constructor(props){
        super(props)
        this.state={
            counter:0
        }
        console.log('counter number')
    }
    componentDidMount(){
        console.log('count componentDidMount')
    }
    componentDidUpdate(prevState,prevProps){
        console.log('count componentDidUpdate')
    }
    componentWillUnmount(){
        console.log('componentWilUnmount')
    }

    increment=()=>{
        this.setState({
            counter: this.state.counter +1
        })
    }

    render(){
        return(
            <div className='lifeSicleBody'>
                <h3>{this.state.counter}</h3>
                <button 
                    onClick={this.increment}
                >
                    Click
                </button>
            </div>
        )
    }
}