import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignPage from "./SignPage.jsx"
import RegisterResult from "./RegisterResult"
import TodoListPage from "./TodoListPage.jsx"
import NormalLoginForm from "./NormalLoginForm.jsx"
import RegistrationForm from "./RegistrationForm.jsx"
import "./App.less"


function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} className="sign-page"/>
          </Route>

          <Route path="/todolist">
            <TodoListPage id="todolist-page"/>
          </Route>

          <Route path="/register/result">
            <SignPage formLable="注 册 结 果" render={<RegisterResult />} />
          </Route>

          <Route path="/register">
            <SignPage formLable="注 册 账 户" render={<RegistrationForm />} />
          </Route>

          <Route path="/">  
            <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;