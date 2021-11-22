import React, { useState } from "react"

import logo from "./logo.svg"
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      globalFilter: "",
      todolist: {
        "todo-1": {
          order: 0,
          title: "",
          filter: "",
          subTodolist: [],
        },
        "todo-2": {
          title: "",
          filter: "",
          subTodolist: [
            {
              order: 1,
              title: "",
              state: "DONE",
            },
          ],
        },
        "todo-3": {
          title: "",
          filter: "",
          subTodolist: [],
        },
      },
    }
  }

  moveSubTodo(subTodo) {
  }

  render() {
    return (
      <div className="App">
        {this.state.todolist.map(() => {
          return (
            <div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
