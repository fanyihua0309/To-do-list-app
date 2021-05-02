import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import TodoListPage from "./TodoListPage.jsx"
import LoginPage from "./LoginPage.jsx"
import "./App.less"

function App() {

  const Home = () => {
    return (
      <h2>Home</h2>
    );
  }

  return (
    <Router>
      <div>
        {/* <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">登录</Link>
          </li>
          <li>
            <Link to="/todolist">待办事项列表</Link>
          </li>
        </nav> */}

        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/todolist">
            <TodoListPage />
          </Route>
          {/* /的匹配应该放在最后，否则其他都会匹配成此项 */}
          <Route path="/">  
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;