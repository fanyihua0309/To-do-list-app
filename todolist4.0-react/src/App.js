import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Divider } from 'antd';
import { Result, Button } from 'antd';
import TodoListPage from "./TodoListPage.jsx"
import LoginPage from "./LoginPage.jsx"
import RegistrationForm from "./RegistrationForm"
import "./App.less"

function App() {

  const RegisterResult = () => {
    let history = useHistory();
    console.log(history);
    const handleClick = () => {
      history.push("/login");
  }
    return (
      <Result
      status="success"
      title="注册成功!"
      extra={[
        <Button type="primary" key="console" onClick={handleClick}>
          返回登录
        </Button>
      ]}
      />
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/todolist">
            <TodoListPage id="todolist-page"/>
          </Route>

          <Route path="/register/result">
            <RegisterResult />
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