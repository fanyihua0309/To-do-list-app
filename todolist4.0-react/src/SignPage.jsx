import "./App.less"
import { Divider } from 'antd';


const SignPage = ({ formLable, render }) => {

  return (
    <div>
      <h1 className="title">待办事项管理系统</h1>
      <div id="sign-form-div">
        <Divider style={{borderWidth: "2px"}}>
          <span className="form-lable">
            {formLable}
          </span>
        </Divider>
        {render}
      </div>
    </div>
  );
}

export default SignPage;