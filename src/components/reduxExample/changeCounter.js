import React, { Component } from 'react';

class ChangeCounter extends Component {

    render() {
        return (
            <div>
                <button
                    onClick={() => this.props.onchangeValue(1)}
                >
                    Increment
                </button>
                <button
                    onClick={() => this.props.onchangeValue(-1)}
                >
                    Decriment
                </button>

            </div>
        )
    }
}

export default ChangeCounter