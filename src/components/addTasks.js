import React, { Component } from 'react';
import { Button,InputGroup,FormControl } from 'react-bootstrap';


export default class AddTask extends Component {
    state = {
        inpValues: '',
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

    hendleClick = (value) => {
        const {inpValues}= this.state
        if(!inpValues){
            return
        }
        this.props.onAdd(inpValues)
        this.setState({
            inpValues: ''
        })
    }
    render() {
        const {inpValues} = this.state;
        const {disabled} = this.props;
        return (
            <InputGroup className="mb-3">
                <FormControl
                    aria-describedby="basic-addon1"
                    value={inpValues}
                    onChange={this.hendleChange}
                    onKeyDown={(ev) => this.hedleKeydown(ev)}
                    disabled={disabled}

                />
                <InputGroup.Append>
                    <Button
                        variant="outline-secondary"
                        onClick={this.hendleClick}
                        disabled={!inpValues}
                    >Button</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
