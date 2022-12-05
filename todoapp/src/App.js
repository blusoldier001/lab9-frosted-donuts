import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

const endpoint = 'https://cse204.work';
const api_key = '5b832d-2a041d-104386-3307d2-acff66';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      todos: [],   // array of our todos
      newtodo_input: "",  // input string from NewTodo input
    }
  };

  // (Native) Function called when App component mounted, use to initialize component data
  componentDidMount() {

    fetch(endpoint+'/todos', {
      method: 'GET',
      headers: {
          'x-api-key': api_key
      }
    })
    .then(res => res.json())
    .then(data => {
      // set 'todos' state
      console.log("SETTING TODOS STATE");
      this.setState({
        todos: data
      });
      console.log("==== this.state.todos ====");
      console.log(this.state.todos);
    })
    .catch(err => console.error(err));
  };

  // Listener on New TODO input to update App input state 
  inputListener = (event) => {
    this.setState({
      newtodo_input: event.target.value  // set to input target value
    });
    console.log(this.state.newtodo_input);
  };



  render() {
    return (
      <div className="App">
        <h1>To - Do</h1>
      <div id="todo-wrapper">
          <div id="todo-list">
            {
              this.state.todos.map((todo) => 
                <Todo 
                  id={todo.id} 
                  todo_id={todo.id} 
                  todo_text={todo.text}
                  todo_status={todo.completed ? "complete" : "incomplete"}
                />
              )
            }
          </div>
          <NewTodo inputListener={this.inputListener} />
      </div>
      <input type="button" id="todo-creator-submit" name="todo-creator-submit" value="New TODO" />

      <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
      <script src="script.js"></script>
      </div>
    );
  }
}

export default App;
