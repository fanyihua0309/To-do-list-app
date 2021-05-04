import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";

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

export default RegisterResult;