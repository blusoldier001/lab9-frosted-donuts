import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
    <div className="task incomplete" value="cb2882d0-656c-11ed-87c6-710e77fd4cdb">
        <input type="checkbox" value="cb2882d0-656c-11ed-87c6-710e77fd4cdb" />
        <p>sleep</p>
        <input type="button" class="delete-button" value="🗑️" id="cb2882d0-656c-11ed-87c6-710e77fd4cdb" />
    </div>
    );
  }
}

export default Todo;
