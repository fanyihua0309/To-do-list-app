import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Divider } from 'antd';
import TodoListPage from "./TodoListPage.jsx"
import LoginPage from "./LoginPage.jsx"
import RegistrationForm from "./RegistrationForm"
import "./App.less"

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/todolist">
            <TodoListPage />
          </Route>
          <Route path="/register">
            <div id="register-form-div">
              <Divider>
                <span style={{fontWeight: "bold", fontSize: "18px", color: "grey"}}>注 册 账 户</span>
              </Divider>
              <RegistrationForm/>
            </div>
          </Route>
          <Route path="/">  
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;