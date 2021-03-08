import React, {Component} from 'react';

class ShowCounter extends Component{
    render(){
        const {value} =this.props
        return(
            <p>{value}</p>
        )
    }
}

export default ShowCounter