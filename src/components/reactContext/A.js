import React, { Component } from 'react';
import B from './B'
import C from './C'
import {BContext} from './BContext'
import './context.css'

class A extends Component {
    state={
        val: 'hello'
    }
    render() {
        return (
            <div className="contextA">
                <p>A component</p>
                <BContext.Provider value={{
                    counter: 15,
                    value: this.state.val,
                    onSendValue: (value)=>{
                        this.setState({
                            val:value
                        })
                    }
                }}>
                    <B />
                    <C />
                </BContext.Provider>
            </div>
        )
    }
}
export default A