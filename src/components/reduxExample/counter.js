import React, { Component } from 'react';
import ChangeCounter from './changeCounter';
import ShowCounter from './showCounter';

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
            </div>
        )
    }
}

export default Counter