import React, { Component } from 'react';
import $ from 'jquery';
import './Todo.css';

const endpoint = 'https://cse204.work';
const api_key = '5b832d-2a041d-104386-3307d2-acff66';

/* Props:
  - todo_id
  - todo_text
  - todo_status
*/

export default class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.todo_status === "complete" ? true : false,
    }
  }

  // Handler for toggling task completeness
  completeTodoHandler = _ => {
    console.log("u toggle me!");
    
    // Update frontend dynamically with jquery
    let completedBool = this.state.completed;
    console.log(completedBool);

    let chk_id = this.props.todo_id;
    let PUT_data = {};

    if (completedBool == true) {
        // update with incomplete status
        $(`#${this.props.todo_id}`).removeClass('complete').addClass('incomplete');
        PUT_data['completed'] = false;
        this.setState({completed: false});
    } else {
        // update with complete status
        $(`#${this.props.todo_id}`).removeClass('incomplete').addClass('complete');
        PUT_data['completed'] = true;
        this.setState({completed: true});
    }

    // Make fetch request to PUT
    fetch(endpoint+`/todos/${chk_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
        },
        body: JSON.stringify(PUT_data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(err));
  };



  render() {
    let checkbox = <input type="checkbox" todo_id={this.props.todo_id} onClick={this.completeTodoHandler}/>;
    if (this.props.todo_status === "complete") {
      checkbox = <input type="checkbox" todo_id={this.props.todo_id} onClick={this.completeTodoHandler} defaultChecked/>;
    }
    return (
    <div 
      key={this.props.todo_id}
      id={this.props.todo_id}
      className={`task ${this.props.todo_status}`}
      todo_id={this.props.todo_id}
    >
      {checkbox}
      <p>
        {this.props.todo_text}
      </p>
      <input type="button" className="delete-button" value="???????" onClick={this.props.deleteTodoHandler}/>
    </div>
    );
  }
}
