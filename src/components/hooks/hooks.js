import React, { useState, useEffect, memo, useRef } from 'react';

function Hooks() {
    const [counterHook, setCounter] = useState(0)
    const [value, setValue] = useState('')
    // componentDidUpdate
    // useEffect(() => {
    //     console.log('useEffect')
    // })

    // componentDidUpdate
    // useEffect(() => {
    //     console.log('useEffect mounting')
    // }, [counterHook])

    // componentDidMount
    // useEffect(() => {
    //     console.log('useEffect mounting')
    // }, [])

    useEffect(() => {
        console.log('useEffect mounting')

        return () => {
            console.log('componentDidUnmount')
        }
    }, [])

    const incrementHook = () => {
        inputRef.current.focus()
        setCounter(counterHook + 1)
    }
    const changeValue = (event) => {
        setValue(event.target.value)
    }
    const inputRef = useRef(null)
    return (
        <div className='lifeSicleBody'>
            <h3>React Hooks</h3>

            <h3>{counterHook}</h3>
            <button
                onClick={incrementHook}
            >
                Click
                </button>

            <input
                ref={inputRef}
                value={value}
                type='text'
                onChange={changeValue}
            />
        </div>
    )
}

export default memo(Hooks)