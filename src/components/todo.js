import React, { PureComponent } from 'react';
// import Lists from './lists';
import './todo.css'
import { Button, Container, Row, Col } from 'react-bootstrap';
// import idGenerator from './idGenerator'; // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ 
import MyCard from './card'
import AddTask from './addTasks';
import Confirm from './removeModal';
import EditTaskModal from './editTaskModal';

class Todo extends PureComponent {
    state = {
        editTask: null,
        tasks: [],
        selectedCard: new Set(),
        toggle: false,
    }

        // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ

    componentDidMount() {
        fetch("http://localhost:3001/task", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.error) {
                throw response.error
            }
            this.setState({
                tasks: response,
            })       
        }) 
        .catch((error) => {
            console.log(error)
        })
    }

        // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ

    onCheacke = (taskId) => {
        const selectedCard = new Set(this.state.selectedCard)
        if (selectedCard.has(taskId)) {
            selectedCard.delete(taskId)
        } else {
            selectedCard.add(taskId)
        }
        this.setState({
            selectedCard: selectedCard
        })
    }
                // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ

    // hendleClick = (value) => {
    //     const myId = {
    //         text: value,
    //         _id: idGenerator()
    //     }
    //     const newTasks = [myId, ...this.state.tasks]

    //     this.setState({
    //         tasks: newTasks,
    //     })
    // }

                // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ

    hendleClick = (data) => {
        const body = JSON.stringify(data)
        fetch("http://localhost:3001/task", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.error) {
                throw response.error
            }
            const tasks = [response, ...this.state.tasks]
            this.setState({
                tasks: tasks,
            })       
        })
        .catch((error) => {
            console.log(error)
        })
    }

                // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ

                // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ

    // hendleDelete = (taskId) => {
    //     const delId = this.state.tasks.filter(task => task._id !== taskId);
    //     this.setState({
    //         tasks: delId,
    //     })
    // }

    // handleRemove = () => {
    //     let tasks = [...this.state.tasks]
    //     this.state.selectedCard.forEach((id) => {
    //         tasks = tasks.filter((task) => task._id !== id)
    //     })
    //     this.setState({
    //         tasks,
    //         toggle:false,
    //         selectedCard: new Set()
    //     })
    // }
                 // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ

    hendleDelete = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.error) {
                throw response.error
            }
            const delId = this.state.tasks.filter(task => task._id !== taskId);
            this.setState({
                tasks: delId,
            })      
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleRemove = () => {
        const body={
            tasks: [...this.state.selectedCard]
        }

        fetch("http://localhost:3001/task/", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.error) {
                throw response.error
            }

            let tasks = [...this.state.tasks]

            this.state.selectedCard.forEach((id) => {
                tasks = tasks.filter((task) => task._id !== id)
            })
            this.setState({
                tasks,
                toggle:false,
                selectedCard: new Set()
            })     
        })
        .catch((error) => {
            console.log(error)
        })
    }

                // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    toggleEditModal=(task)=> {
        this.setState({
            editTask: task
        })
    }

                // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ

    // saveTask=(editedTask)=> {
    //     const tasks=[...this.state.tasks]
    //     const foundTextIndex=tasks.findIndex((task)=>task._id === editedTask._id)
    //     tasks[foundTextIndex]=editedTask
    //     this.setState({
    //         tasks:tasks,
    //         editTask: null,
    //     })
    // }

                 // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ
    
    saveTask=(editedTask)=> {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(editedTask),
        })
        .then((response) =>  response.json())
        .then((response) => {
            if(response.error) {
                throw response.error
            }
            const tasks=[...this.state.tasks]
            const foundTextIndex=tasks.findIndex((task)=>task._id === editedTask._id)
            tasks[foundTextIndex]=response
            this.setState({
                tasks:tasks,
                editTask: null,
            })
                 
        })
        .catch((error) => {
            console.log(error)
        })
    }
                // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ

    render() {
        const { toggle, selectedCard, editTask } = this.state
        const tasksArr = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={6} md={3} xl={2} className='mb-3'>
                    <MyCard
                        data={task}
                        onRemove={this.hendleDelete}
                        onCheacke={this.onCheacke}
                        disabled={!!selectedCard.size}
                        onEdit={()=>this.toggleEditModal(task)}
                    />
                </Col>

            )
        })
        return (
            <div>
                <Container>
                    <Container>
                        <Row className="justify-content-center pt-4">
                            <Col xs={6} lg={4}>
                                <AddTask
                                    onAdd={this.hendleClick}
                                    disabled={!!selectedCard.size}
                                />
                            </Col>
                        </Row>
                    </Container>

                    <Row>
                        {tasksArr}
                    </Row>
                    <Row>
                        <Col xs={6} className="removAll">
                            <Button
                                variant='danger'
                                onClick={this.toggleConfirm}
                                disabled={selectedCard.size === 0 ? true : false}
                            >
                                Remove Selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {toggle &&
                <Confirm
                    onSubmite={this.handleRemove}
                    onClose={this.toggleConfirm}
                    count={selectedCard.size}
                />
                }
                {
                    !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toggleEditModal(null)}
                    />
                }

            </div>
        );
    }
}

export default Todo;