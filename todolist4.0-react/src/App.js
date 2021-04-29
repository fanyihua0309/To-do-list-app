import React, { useState, useEffect } from "react";

import MyInput from './MyInput.jsx'
import TodoList from "./TodoList.jsx";

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
   * 请求数据存储到 todoItems 对象数组中
   */
  const fetchAllTodoItems = () => {
    fetch("http://42.193.140.83/todos/")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.data);
      res.data.map((curItem) => {
        const newItem = new TodoItem(curItem.content);
        newItem.id = curItem._id;
        newItem.complete = curItem.complete;
        newItem.edit = curItem.edit;
        newItem.show = curItem.match;
        settodoItems((preItem) => {
        return [...preItem, newItem];
        })
        return curItem;
    })
    })
  }
  
  /**
   * 在页面加载时发请求获取数据
   */
  useEffect(() => {
    fetchAllTodoItems();
  }, [])

  /**
   * 用户新增一条待办事项时，向服务器发 post 请求
   * @param {string} value 待办事项的内容
   */
  const fetchAddTodoItem = (value) => {
    console.log(value);
    fetch("http://42.193.140.83/todos/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ content: value }),
    })
      .then((res) => res.json())
      .then((res) => {
        const {
          meta: { code, error },
        } = res;
        if (code !== 0) {
          alert(error || "新增失败！");
        } 
        else {
          fetchAllTodoItems();
        }
      });
  }

  /**
   * 当用户在搜索框键入 content ，请求数据修改对象的 show 属性
   * @param {string} content 待办事项的内容
   */
  const fetchSearchTodoItems = (content) => {
    // fetchAllTodoItems();  // 请求所有数据，进行前端搜索
    let copyTodoItems = Array.from(todoItems);
    if(content !== ""){
      copyTodoItems = copyTodoItems.map((curItem) => {
        curItem.show = (curItem.content.indexOf(content) !== -1);
        // console.log(curItem); 
        return curItem;
      })
    }
    else{
      copyTodoItems = copyTodoItems.map((curItem) => {
        curItem.show = true;  // 将每个待办事项的show恢复为默认状态true
        return curItem;
      })
    }
    console.log(copyTodoItems); 
    settodoItems(copyTodoItems);
  }

  return (
    <div>
      <MyInput placeholder="添加待办事项" onClickEnter={fetchAddTodoItem}/>
      <br />
      <MyInput placeholder="搜索待办事项" onClickEnter={fetchSearchTodoItems} />

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