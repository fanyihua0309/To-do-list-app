import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"

const NormalLoginForm = () => {
  const axiosInst = axios.create({
      baseURL: "http://42.193.140.83:3000",
      timeout: 10000,
  });

  axiosInst.interceptors.response.use(
    function (response) {
      const {
        meta: { code, errors },
        data,
      } = response.data;
      if (code !== 0) {
        console.log("errors", errors);
        alert(errors);
        return Promise.reject(errors);
      }
      return data;
    },
    function (errors) {
      return Promise.reject(errors);
    }
  );

  let history = useHistory();

  const onFinish = (values) => {
    axiosInst
      .post("/users/signin", {
        "name": values.username,
        "password": values.password
      })
      .then(() => {
        history.push("/todolist");
      })
    // console.log('Received values of form: ', values);
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

        <Link to="/register">还没有账号？现在注册</Link>

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