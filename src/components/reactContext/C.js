import React, { Component } from 'react';
import { BContext } from './BContext'

class C extends Component {
    render() {
        return (
            <BContext.Consumer>
                {
                    (context) => {
                        console.log(context, 'C component')
                        return (
                            <div>
                                <p>C component</p>
                            </div>
                        )
                    }
                }

            </BContext.Consumer>

        )
    }
}
export default C