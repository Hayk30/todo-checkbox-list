import React, { PureComponent } from 'react';
// import Lists from './lists';
import './todo.css'
import { Button, Container, Row, Col } from 'react-bootstrap';
// import idGenerator from './idGenerator'; // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ 
import MyCard from '../card/card'
import AddTask from '../addTasks/addTasks';
import Confirm from '../removeModal/removeModal';
import EditTaskModal from '../editTaskModal/editTaskModal';
import { connect } from 'react-redux'
import { getTask } from '../reduxExample/action'

class Todo extends PureComponent {
    state = {
        editTask: null,
        selectedCard: new Set(),
        toggle: false,
        openNewTaskModal: false,
    }

    componentDidMount() {
        this.props.getTask()
    }

    componentDidUpdate (prevProps) {
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.togglenNewTaskModal()
        }
    }

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
                const delId = this.props.tasks.filter(task => task._id !== taskId);
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

                let tasks = [...this.props.tasks]

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
                const tasks = [...this.props.tasks]
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



    togglenNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }
    render() {
        const { toggle, selectedCard, editTask, openNewTaskModal } = this.state
        const tasksArr = this.props.tasks.map((task, i) => {
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
                        disabled={!!selectedCard.size}
                        onClose={this.togglenNewTaskModal}
                    />
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess
    }
}
const mapDispatchToProps = {
    getTask: getTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);