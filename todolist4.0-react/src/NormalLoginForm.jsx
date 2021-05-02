import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const NormalLoginForm = () => {
  let history = useHistory();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    history.push("/todolist");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="http://localhost:3000/register">
          还没有账号？现在注册
        </a> */}
        <Router>
          <Link to="/register">还没有账号？现在注册</Link>
          {/* <Switch>
            <Route path="/register">
              <RegistrationForm />
            </Route>
          </Switch> */}
        </Router>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}>
          登&nbsp;&nbsp;&nbsp;&nbsp;录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;