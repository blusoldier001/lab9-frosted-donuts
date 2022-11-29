import React, { Component } from 'react'

export default function Todo(text, id, completeTag) {
  // completeTag will either be "Complete" or "Incomplete"
  return (
    // <div className={`Todo-Single-Element ${this.props.completeTag}`} id={this.props.id} >
    //     <button className="CompletedButton" onclick='submit()'>{this.props.completeTag}</button>
    //     <p>{this.props.text}</p>
    //     <button className="RemoveButton" onclick>Remove</button>
    // </div>
    <div>
      <div id='123' className='Todo-Item-Single'>
        <button className='incompleteButton'>Completed</button>
        <p>Test Todo</p>
        <button>Remove</button>
      </div>
    </div>
  )
}
