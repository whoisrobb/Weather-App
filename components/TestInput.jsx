import React, { useState } from 'react'

const TestInput = ({ sendSelectedCity }) => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event) => {
        const value = event.target.value
        setInputValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendSelectedCity(inputValue)
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="input-container">
            <input
                type="text"
                value={inputValue}
                placeholder="Enter City"
                onChange={handleChange}
            />
            <i className="uil uil-search" />
        </div>
    </form>

  )
}

export default TestInput