import React, { useState } from 'react'
import './contact.css'
const defoultValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
}
export default function ContactUs() {
    const [values, setValues] = useState(defoultValues)
    const hendleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        })
    }
    const send = () => {
        console.log('values', values)
        setValues(defoultValues)
    }
    return (
        <div className="contactStyle">
            <h2>Contact Us</h2>
            <input
                type='text'
                name='name'
                placeholder='Your Name'
                value={values.name}
                onChange={hendleChange} />
            <input
                type='email'
                name='email'
                placeholder='Your Email'
                value={values.email}
                onChange={hendleChange} />
            <input
                type='phone'
                name='phone'
                placeholder='Your Phone'
                value={values.phone}
                onChange={hendleChange} />
            <textarea
                name='message'
                onChange={hendleChange}
                placeholder='Your Message'
                value={values.message}
            >
            </textarea>
            <button onClick={send}>Send</button>
        </div>

    )
}