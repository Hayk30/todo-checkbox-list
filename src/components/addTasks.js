import React, { Component } from 'react';
import { Button,InputGroup,FormControl } from 'react-bootstrap';
import './addTasks.css'


export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inpValues: '',
        }    
    }
    
    hendleChange = (ev) => {
        this.setState({
            inpValues: ev.target.value
        })
    }
    hedleKeydown = (ev) => {
        if (ev.key === 'Enter') {
            this.hendleClick()
        }
    }

                // ԱՌԱՆՑ  ՍԵՐՎԵՐ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ

    // hendleClick = (value) => {
    //     const {inpValues}= this.state
    //     if(!inpValues){
    //         return
    //     }
    //     this.props.onAdd(inpValues)
    //     this.setState({
    //         inpValues: ''
    //     })
    // }

                // ՍԵՐՎԵՐՈՎ ՏԱՐԲԵՐԱԿԻ ԴԵՊՔՈՒՄ

    hendleClick = () => {
        const {inpValues}= this.state
        if(!inpValues){
            return
        }
        const task = {
            title: inpValues
        }
        this.props.onAdd(task)
        this.setState({
            inpValues: ''
        })
    }


    render() {
        const {inpValues} = this.state;
        const {disabled} = this.props;
        return (
            <InputGroup className="mb-4">
                <FormControl className="formContr"
                    aria-describedby="basic-addon1"
                    value={inpValues}
                    onChange={this.hendleChange}
                    onKeyDown={(ev) => this.hedleKeydown(ev)}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="secondary"
                        onClick={this.hendleClick}
                        disabled={!inpValues}
                    >
                        Button
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
