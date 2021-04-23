import React, { useState } from "react";

import MyInput from './MyInput.jsx'
import TodoList from "./TodoList.jsx";

import './App.css'


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

  
  return (
    <div>
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