import React, { useState, useEffect } from "react";

import MyInput from './MyInput.jsx'
import TodoList from './TodoList.jsx'
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



const TodoListPage = () => {
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
   * 当用户点击删除按钮时，向服务器发 post 请求删除对应的待办事项
   * @param {number} id 待删除待办事项的 id
   */
  const fetchDeleteTodoItem = (id) => {
    fetch(`http://42.193.140.83:3000/todos/${id}`, {
      method: "delete",})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const {
          meta: { code, error },
        } = res;
        if (code !== 0) {
          alert(error || "删除失败！");
        } 
        else {
          settodoItems([]);     // 先将本地的 todoItems 置为空
          fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
          console.log("todoItems", todoItems);
        }
      });
  }

  /**
   * 当用户点击完成/未完成按钮时
   * @param {number} id 当前待办事项的id
   */
  // const handleComplete = (id) => {
  //   let copyTodoItems = Array.from(todoItems);
  //   copyTodoItems = copyTodoItems.map((curItem) => {
  //     if(curItem.id === id){
  //       curItem.complete = !curItem.complete;
  //     }
  //     return curItem;   
  //   })
  //   settodoItems(copyTodoItems);
  // }


  /**
   * 当用户点击完成/未完成按钮时, 发请求更新服务器端的数据
   * @param {number} id 当前待办事项的id
   */
  const fetchCompleteTodoItem = (id) => {
    let original_complete, content;
    Array.from(todoItems).forEach((curItem) => {
      if(curItem.id === id){
        original_complete = curItem.complete;
        content = curItem.content;
      }
    })
    fetch("http://42.193.140.83:3000/todos", {
      method: "patch",
      body: JSON.stringify({
        id: id,
        content: content,
        complete: !original_complete,
      }),
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const { meta: { code, error },} = res;
      if(code !== 0){
        alert(error || "更改事项完成状态失败!");
      }
      else{
        settodoItems([]);
        fetchAllTodoItems();
      }
    })
  }

  /**
   * 请求所有数据存储到 todoItems 对象数组中
   */
  const fetchAllTodoItems = () => {
    fetch("http://42.193.140.83:3000/todos")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
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
    fetch("http://42.193.140.83:3000/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ content: value }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { meta: { code, error },} = res;
        if (code !== 0) {
          alert(error || "新增失败！");
        } 
        else {
          settodoItems([]);
          fetchAllTodoItems();
        }
      });
  }

  /**
   * 当用户在搜索框键入 content ，请求数据修改对象的 show 属性
   * @param {string} content 待办事项的内容
   */
  const fetchSearchTodoItems = (content) => {
    settodoItems([]);
    fetchAllTodoItems();  // 请求所有数据，进行前端搜索
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
        onClickDeleteBtn={(id) => fetchDeleteTodoItem(id)}
        // onClickDeleteBtn={(id) => handleDelete(id)}
        onClickCompleteBtn={(id) => fetchCompleteTodoItem(id)} 
      />
    </div>
  );
}

export default TodoListPage;