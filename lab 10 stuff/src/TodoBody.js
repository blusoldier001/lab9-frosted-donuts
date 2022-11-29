import React from 'react'
import Todo from './Todo.js'

export default function TodoBody() {
  return (
    <div id="Todo-Body">
            <div id="Todo-Items">
                <Todo />
            </div>
            <div id="Todo-Submit">
                <p>Submit a Todo!</p>
                <input type="text" id="todo_text" onkeydown="enterPressed(event)" name="todo_text" value=""></input>
                <button type="button" id="button1"  onclick = "submit()">Submit</button>
            </div>
    </div>
  )
}
