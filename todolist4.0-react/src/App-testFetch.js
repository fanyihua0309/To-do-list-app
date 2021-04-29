import React, { useState, useEffect } from "react";

import MyInput from './MyInput.jsx'
import TodoList from "./TodoList.jsx";

import { Button } from 'antd';
import './App.less'


// 定义待办事项的类
class TodoItem{ 
  id;       // id
  content;  // 内容
  complete; // 是否完成
  edit;     // 是否处于编辑状态
  show;     // 是否显示（用于查询功能）

  constructor(content){
    this.id = Math.random();  // id使用随机数，保证每个id唯一
    this.content = content;
    this.complete = false;
    this.edit = false;
    this.show = true;
  }
}



function App() {
  const [todoItems, settodoItems] = useState([]);

  /**
   * 新增一条待办事项
   * @param {*} e onClick传递的事件参数
   * @param {string} content 待办事项的内容
   */
  const addTodoItem = (e, content) => {
    const newItem = new TodoItem(content);
    settodoItems((preItem) => {
      return [...preItem, newItem];
    })
    e.target.value = "";
  }

  /**
   * 当用户点击编辑按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleEdit = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.map((curItem) => {
      if(curItem.id === id){
        curItem.edit = true;
      }
      return curItem;
    })
    settodoItems(copyTodoItems);
  }

  /**
   * 当用户点击删除按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleDelete = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.filter((curItem) => {
      return curItem.id !== id});
    settodoItems(copyTodoItems);
  }

  /**
   * 当用户点击完成/未完成按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleComplete = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.map((curItem) => {
      if(curItem.id === id){
        curItem.complete = !curItem.complete;
      }
      return curItem;   
    })
    settodoItems(copyTodoItems);
  }

  /**
   * 当用户按下回车键查询待办事项时
   * @param {*} e onClick传递的事件参数
   */
  const handleSearch = (e, content) => {
    let copyTodoItems = Array.from(todoItems);
    if(content !== ""){
      copyTodoItems = copyTodoItems.map((curItem) => {
        curItem.show = (curItem.content.indexOf(content) !== -1);
        return curItem;
      })
    }
    else{
      copyTodoItems = copyTodoItems.map((curItem) => {
        curItem.show = true;  // 将每个待办事项的show恢复为默认状态true
        return curItem;
      })
    }
    settodoItems(copyTodoItems);
  }

  const [res, setres] = useState([]);

  //https://www.kuaidi100.com/query?type=yuantong&postid=YT5409924808522&temp=0.006291141281837387&phone=

  window.onload = () => {
    console.log("window.onload");
    fetch("https://api.apiopen.top/getJoke?page=1&count=20&type=video")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setres(res.result)})  
  }

  const [num, setnum] = useState(1);  //count
  const [url, seturl] = useState("https://api.apiopen.top/getJoke?page=1&count=2&type=video");

  const loadData = () => {
    console.log("url", url);
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      console.log(res.result);
      setres(res.result);
    })
    }
  
  const setUrlCount = (url) => {
    // const newUrl = "https://api.apiopen.top/getJoke?page=1&count=" + String(num) + "&type=video";
    const newUrl = `https://api.apiopen.top/getJoke?page=1&count=${num}&type=video`;
    seturl(newUrl);
  }

  const loadNumData = () => {
    console.log(num);
    setUrlCount(); 
    // loadData();
  }

  // state改变，react重新渲染页面。
  useEffect(() => { 
    loadData();
  }, [url])


  return (
    <div>
      <Button type="primary">Button</Button>

      <input type="text" onChange={(e) => setnum(e.target.value)}/>
      <button onClick={loadNumData}>提交</button>
      <div>
        {res.map((cur) => {
          return (
            <p key={Math.random()}>{cur.text}</p>
          )
        })}
      </div>

      <MyInput placeholder="添加待办事项" onClickEnter={(e, content) => addTodoItem(e, content)}/>

      <MyInput placeholder="搜索待办事项" onClickEnter={(e, content) => handleSearch(e, content)} />

      <TodoList 
        todoItems={todoItems}
        onClickEditBtn={(id) => handleEdit(id)}
        onClickEditSubmitBtn={(todoItems) => settodoItems(todoItems)}
        onClickDeleteBtn={(id) => handleDelete(id)}
        onClickCompleteBtn={(id) => handleComplete(id)} 
      />
    </div>
  );
}

export default App;