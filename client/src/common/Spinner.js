import React from 'react'
import './Spinner.scss'

const Spinner = () => {
  return (
    <svg width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r="70"
        strokeOpacity="0.4"
        strokeWidth="20"
        stroke={this.props.color}
        fill="none"
      />
      <path
        d="M100,30 A 70 70 0 0 1 100,30"
        fill="none"
        stroke="red"
        strokeWidth="20"
      />
      <path
        className="spinner"
        d="M100,30 A 70 70 0 0 1 170,100"
        fill="none"
        stroke={this.props.color}
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        className="spinner"
        d="M100,170 A 70 70 0 0 1 30,100"
        fill="none"
        stroke={this.props.color}
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  )
}

Spinner.defaultProps = {
  color: 'red'
}

export default Spinner
