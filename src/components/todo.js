import React, {Component } from 'react';
import Lists from './lists';

class Todo extends Component {
    state={
        tasks: [],
        inpValues: ''
    }
    hendleChange=(ev)=> {
        this.setState({
            inpValues: ev.target.value
        })
        console.log(ev.target.value)
    }
    hendleClick=()=> {
        const {inpValues} = this.state
        const newTasks = [...this.state.tasks]
        newTasks.push(inpValues)
        this.setState({
            tasks: newTasks,
            inpValues: ""
        })
    }
    render() { 
        return ( 
            <>
                <input type="text" placeholder="New List" value={this.state.inpValues} onChange={this.hendleChange}/>
                <input type="button" value="Add" onClick={this.hendleClick}/>
                <ol>
                    {
                        this.state.tasks.map((task, index)=>{
                            return <Lists data={task}/>
                        })
                    }
                </ol>
            </>
        );
    }
}
 
export default Todo;