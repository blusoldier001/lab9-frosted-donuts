import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

// const endpoint = 'https://cse204.work';
// const api_key = '5b832d-2a041d-104386-3307d2-acff66';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      todos: []   // array of our todos
    }
  }

  componentDidMount() {
    
  }

  onChange(event) {

  }



  render() {
    return (
      <div className="App">
        <h1>To - Do</h1>
      <div id="todo-wrapper">
          <div id="todo-list">
            <Todo todo_id="yadada" todo_text="sleep" todo_status="incomplete" />
          </div>
          <NewTodo />
      </div>
      <input type="button" id="todo-creator-submit" name="todo-creator-submit" value="New TODO" />

      <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
      <script src="script.js"></script>
      </div>
    );
  }
}

export default App;
