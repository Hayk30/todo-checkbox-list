import React, { Component } from 'react';
import {BContext} from './BContext'

class A extends Component {
    state = {
        value: ''
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    render() {
        return (
            <div>
                <p>B component</p>
                <BContext.Consumer>
                    {
                        (context) => {
                        console.log(context, 'B component')

                            return (
                                <>
                                    <input
                                        type='text'
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        onClick={()=>{
                                                context.onSendValue(this.state.value)
                                                this.setState({
                                                    value:''
                                                })
                                            }
                                        }
                                    >
                                        Click me
                                    </button>
                                </>
                            )
                        }
                    }

                </BContext.Consumer>

            </div>
        )
    }
}
export default A