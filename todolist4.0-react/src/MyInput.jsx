import React, {useState} from 'react'

import "./App.css"

const MyInput = ({placeholder, onClickEnter}) => {
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
      onClickEnter(e, content);  // 将 e, content 抛出给父组件
      // 在搜索时并不希望清空输入框，所以将这一步操作交由父组件完成
      // e.target.value = '';    // 清空输入框
      e.target.focus();          // 定位光标
    }
  }

  return (
    <input className="myInput" placeholder={placeholder} onKeyDown={enterToSubmit} onChange={storeContent}/>
    );
}

export default MyInput;