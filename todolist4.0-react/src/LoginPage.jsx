import React from "react"
import { Tabs } from 'antd';
import { Divider } from 'antd';
import NormalLoginForm from "./NormalLoginForm.jsx"
import "./App.less"

const LoginPage = () => {

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <h1 className="title">待办事项管理系统</h1>
      <div id="login-form-div">
        <Divider><span style={{fontWeight: "bold", fontSize: "18px", color: "grey"}}>欢 迎 登 录</span></Divider>
        <Tabs onChange={callback} type="card" size="large" id="login-tabs">
          <TabPane tab="账号登录" key="1">
              <NormalLoginForm />
          </TabPane>
          <TabPane tab="微信登录" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>

      </div>
    </div>
  )
}

export default LoginPage;