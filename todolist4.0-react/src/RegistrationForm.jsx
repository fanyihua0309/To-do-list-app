import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

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

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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

  let history = useHistory();
  const handleClick = () => {
    alert("注册成功！返回登录");
    history.replace("/login");
  }

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
        label="手机号码"
        rules={[
          {
            required: true,
            message: '请输入手机号码!',
          },
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
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!',
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
        <Button type="primary" htmlType="submit" style={{width: "270px"}} onClick={handleClick}>
          注&nbsp;&nbsp;&nbsp;&nbsp;册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;