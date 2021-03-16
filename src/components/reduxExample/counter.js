import React, { Component } from 'react';
import ChangeCounter from './changeCounter';
import ShowCounter from './showCounter';
import Message from './message'

class Counter extends Component {
    state={
        count: 0
    }
    onHendleValue = (value) => {
        this.setState({
            count: this.state.count + value
        });
    }
    render() {
        const { count } = this.state
        return (
            <div>
                <ShowCounter value={count} />
                <ChangeCounter
                    onchangeValue={this.onHendleValue}
                />
                <Message/>
            </div>
        )
    }
}

export default Counter