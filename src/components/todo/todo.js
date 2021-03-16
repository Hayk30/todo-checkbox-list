import React, { PureComponent } from 'react';
// import Lists from './lists';
import './todo.css'
import { Button, Container, Row, Col } from 'react-bootstrap';
// import idGenerator from './idGenerator'; // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ 
import MyCard from '../card/card'
import AddTask from '../addTasks/addTasks';
import Confirm from '../removeModal/removeModal';
import EditTaskModal from '../editTaskModal/editTaskModal';

class Todo extends PureComponent {
    state = {
        editTask: null,
        tasks:[],
        selectedCard: new Set(),
        toggle: false,
        openNewTaskModal: false,
    }
    // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ՍԿԻԶԲ

    componentDidMount() {
        fetch("http://localhost:3001/task", {
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
        console.log(data)
        const body = JSON.stringify(data)
        fetch("http://localhost:3001/task", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                const tasks = [response, ...this.state.tasks]
                this.setState({
                    tasks: tasks,
                    openNewTaskModal: false,
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
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
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
        const taskIds = {
            tasks: [...this.state.selectedCard]
        }

        fetch("http://localhost:3001/task/", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(taskIds),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }

                let tasks = [...this.state.tasks]

                this.state.selectedCard.forEach((id) => {
                    tasks = tasks.filter((task) => task._id !== id)
                })
                this.setState({
                    tasks,
                    toggle: false,
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
    toggleEditModal = (task) => {
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

    saveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(editedTask),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                const tasks = [...this.state.tasks]
                const foundTextIndex = tasks.findIndex((task) => task._id === response._id)
                tasks[foundTextIndex] = response
                this.setState({
                    tasks: tasks,
                    editTask: null,
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

// ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ ԱՎԱՐՏ

    togglenNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }
    render() {
        const { toggle, selectedCard, editTask, openNewTaskModal } = this.state
        const tasksArr = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={6} sm={6} md={4} lg={3} className='mb-3'>
                    <MyCard
                        data={task}
                        onRemove={this.hendleDelete}
                        onCheacke={this.onCheacke}
                        disabled={!!selectedCard.size}
                        onEdit={() => this.toggleEditModal(task)}
                    />
                </Col>

            )
        })
        return (
            <div>
                <Container>
                    <Container>
                        <Row className="justify-content-center pt-4 mb-5">
                            <Col xs={6} lg={4} className="addNewTask">
                                <Button
                                    variant="primary"
                                    onClick={this.togglenNewTaskModal}
                                    disabled={!!selectedCard.size}
                                >
                                    Add new task
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <Row>
                        {tasksArr}
                    </Row>
                    <Row className="mt-5">
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
                {
                    openNewTaskModal &&
                    <AddTask
                    onAdd={this.hendleClick}
                        disabled={!!selectedCard.size}
                        onClose={this.togglenNewTaskModal}
                    />
                }

            </div>
        );
    }
}



export default Todo;