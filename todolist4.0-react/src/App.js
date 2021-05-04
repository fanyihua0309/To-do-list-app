import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignPage from "./SignPage.jsx"
import RegisterResult from "./RegisterResult"
import TodoListPage from "./TodoListPage.jsx"
import "./App.less"


function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <SignPage type="login"/>
          </Route>

          <Route path="/todolist">
            <TodoListPage id="todolist-page"/>
          </Route>

          <Route path="/register/result">
            <RegisterResult />
          </Route>

          <Route path="/register">
            <SignPage type="register"/>
          </Route>

          <Route path="/">  
            <SignPage type="login"/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;