import NormalLoginForm from "./NormalLoginForm.jsx"
import RegistrationForm from "./RegistrationForm.jsx"
import "./App.less"
import { Tabs } from 'antd';
import { Divider } from 'antd';


const SignPage = ({ type }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <h1 className="title">待办事项管理系统</h1>
      <div id={type === "login" ? "login-form-div" : "register-form-div"}>
        <Divider>
          <span style={{fontWeight: "bold", fontSize: "18px", color: "grey"}}>
            {type === "login" ? "欢 迎 登 录" : "注 册 账 户"}
          </span>
        </Divider>
        {(type === "login") ? 
          (
            <Tabs onChange={callback} type="card" size="large" id="login-tabs">
              <TabPane tab="账号登录" key="1">
                  <NormalLoginForm />
              </TabPane>
              <TabPane tab="微信登录" key="2">
                暂未开放使用。敬请期待！
              </TabPane>
            </Tabs>
          )
          :
          (
            <RegistrationForm/>
          )}
      </div>
    </div>
  );
}

export default SignPage;