import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useHistory } from "react-router-dom";
import axios from "axios"


const axiosInst = axios.create({
  baseURL: "http://42.193.140.83:3000",
  timeout: 10000,
});

axiosInst.interceptors.response.use(
  function (response) {
    const {
      meta : { code, errors },
      data
    } = response.data;
    if(code !== 0){
      alert(errors[0]);
      return Promise.reject(errors);
    }
    return data;
  },
  function (errors) {
    return Promise.reject(errors);
  }
)


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  let history = useHistory();

  const onFinish = (values) => {
    axiosInst
      .post("/users/signup", {
        name: values.nickname,
        email: values.email,
        mobile: values.phone,
        password: values.password
      })
      .then(() => {
        history.push("/register/result");
      })
    
    // console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >

      <Form.Item
        name="nickname"
        label="昵称"
        tooltip="您希望别人怎么称呼您？"
        rules={[
          {
            required: true,
            message: '请输入昵称!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机"
        rules={[
          {
            required: true,
            message: '请输入手机号码!',
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, 
            message: '请输入正确的手机号码!'
          }
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱地址!',
          },
          {
            required: true,
            message: '请输入邮箱地址!',
          },
        ]}
      >
        <Input />
      </Form.Item>
 
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
          {
            min: 6,
            message: '密码不能少于6位!'
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入确认密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('两次输入的密码不匹配!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{width: "270px"}}>
          注&nbsp;&nbsp;&nbsp;&nbsp;册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;