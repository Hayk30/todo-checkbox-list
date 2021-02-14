import React, { Component } from 'react';
import Hooks from './hooks'
import './lifeSicle.css'

export default class CounterHooks extends Component{
    constructor(props){
        super(props)
        this.state={
            counterHook:0
        }
        console.log('counter number')
    }

    incrementCounter=()=>{
        this.setState({
            counterHook: this.state.counterHook +1
        })
    }

    render(){
        return(
            <div className='lifeSicleBody'>
                <h3>{this.state.counterHook}</h3>
                <button 
                    onClick={this.incrementCounter}
                >
                    Click
                </button>
                <Hooks />
            </div>
        )
    }
}