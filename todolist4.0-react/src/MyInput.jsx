import React, {useState} from 'react'
import { Input } from 'antd';
import "./App.less"

const MyInput = ({onClickEnter}) => {
  const [content, setcontent] = useState("");

  /**
   * 存储用户在输入框中输入的内容
   * @param {*} e onChange传递的事件参数
   */
  const storeContent = (e) => {
    setcontent(e.target.value);
  }

  /**
   * 用户按下回车可实现提交
   * @param {number} e onClick传递的事件参数
   */
   const enterToSubmit = (e) => {
    if(e.code === "Enter"){
      onClickEnter(content);  // 将 content 抛出给父组件
      e.target.value = '';    // 清空输入框
      e.target.focus();          // 定位光标
    }
  }

  

  return (
    <Input 
      className="myInput" 
      size="large"
      allowClear
      placeholder="按回车添加待办事项"
      onKeyDown={enterToSubmit} 
      onChange={storeContent} 
    />
  );
}

export default MyInput;