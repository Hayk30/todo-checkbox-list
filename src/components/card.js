import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import './card.css'


class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const task = this.props.data
        const {disabled} = this.props
        const {selectedCard} = this.props
        return (
            <Card className={selectedCard ? 'task' : ''}>
                <Card.Body>
                    <input
                        type="checkbox"
                        onClick={() => this.props.onCheacke(task._id)}
                        key={task._id}
                    />
                    <Card.Title>{task.text.slice(0, 4) + '...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button variant="danger" onClick={() => this.props.onRemove(task._id)} disabled={disabled}>Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default MyCard;