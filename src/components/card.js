import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import './card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'



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
                <Card.Body className='cardStyle'>
                    <input 
                        className='mb-3'
                        type="checkbox"
                        onClick={() => this.props.onCheacke(task._id)}
                        key={task._id}
                    />

                            {/* ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ */}

                    {/* <Card.Title>{task.text.slice(0, 4) + '...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text> */}

                            {/* ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ */}

                    <Card.Title>{task.title}</Card.Title>
                    

                    {/* <Card.Text>
                        {task.description}
                    </Card.Text> */}

                            {/* ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ */}
                    <div>
                        <Button className="m-1 Button"
                            variant="danger" 
                            onClick={() => this.props.onRemove(task._id)} 
                            disabled={disabled}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button className="m-1"
                            variant="primary" 
                            onClick={() => this.props.onEdit(task)} 
                            disabled={disabled}>
                            <FontAwesomeIcon icon={faUserEdit} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default MyCard;