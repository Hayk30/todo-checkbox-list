import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';


class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const task = this.props.data
        return (
            <Card className='task'>
                <Card.Body>
                    <input
                        type="checkbox"
                        onClick={() => this.props.onCheacke(task._id)}
                    />
                    <Card.Title>{task.text.slice(0, 4) + '...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button variant="danger" onClick={() => this.props.onRemove(task._id)}>Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default MyCard;