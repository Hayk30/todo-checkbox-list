import React, { PureComponent } from 'react'

export default class SingleTask extends PureComponent {
    state = {
        task: null
    }

    componentDidMount() {
        const taskId = this.props.match.params.id
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                this.setState({
                    task: response
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { task } = this.state
        return (
            <div>
                {!!task ?
                    <>
                        <h2>{task.title}</h2>
                        <p>Description: {task.description}</p>
                        <p>Date: {task.date}</p>
                        <p>Create At: {task.created_at}</p>
                    </>
                    :
                    <div>Loading....</div>
                }
            </div>
        )
    }
}