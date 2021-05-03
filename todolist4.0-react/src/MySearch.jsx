import React, {useState} from 'react'

import { Input } from 'antd';
import "./App.less"
const { Search } = Input;

const MySearch = ({onClickEnter}) => {
  const [content, setcontent] = useState("");

  /**
   * 存储用户在输入框中输入的内容
   * @param {*} e onChange传递的事件参数
   */
  const storeContent = (e) => {
    setcontent(e.target.value);
  }

  return (
    <Search
      placeholder="按回车搜索待办事项"
      allowClear
      enterButton
      size="large"
      className="myInput" 
      onChange={storeContent} 
      onPressEnter={() => onClickEnter(content)}
    />
  )
}

export default MySearch;