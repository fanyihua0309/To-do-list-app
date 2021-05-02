import React from "react"


import NormalLoginForm from "./NormalLoginForm.jsx"
import "./App.less"


const LoginPage = () => {





  return (
    <div>
      {/* react 中图片需放在 public 文件夹中 */}
      <img src="./login-picture.png" alt="登录图片" height="50%" width="50%" />
      <div id="login-form-div">
        <h2 id="login-form-caption">账号登录</h2>
        <NormalLoginForm />
      </div>
    </div>
  )
}

export default LoginPage;