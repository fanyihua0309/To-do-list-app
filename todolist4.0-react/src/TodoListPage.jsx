import React, { useState, useEffect } from "react";

import MyInput from './MyInput.jsx'
import MySearch from './MySearch.jsx'
import TodoList from './TodoList.jsx'
import './App.less'
import axios from "axios"

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
      alert(errors[0]);
      return Promise.reject(errors);
    }
    return data;
  },
  function (errors) {
    return Promise.reject(errors);
  }
);


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
   * 当用户输入编辑内容完毕，点击提交按钮时，更新服务器对应待办事项的 content
   * @param {number} id 待办事项的 id
   */
     const fetchEditTodoItem = (id, editContent) => {
      axiosInst
        .patch("/todos", {
          id,
          content: editContent,
        })
        .then(() => {
          settodoItems([]);     // 先将本地的 todoItems 置为空
          fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
        })
    }

  /**
   * 当用户点击删除按钮时，向服务器发 post 请求删除对应的待办事项
   * @param {number} id 待删除待办事项的 id
   */
  const fetchDeleteTodoItem = (id) => {
    axiosInst
      .delete(`todos/${id}`)
      .then((res) => {
        settodoItems([]);     // 先将本地的 todoItems 置为空
        fetchAllTodoItems();  // 请求获取所有的 todoItems，存储到对象数组中
      })
  }

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
    console.log("id", id);
    console.log("content", content);
    console.log("complete", !original_complete);
    axiosInst
      .patch("/todos", {
        id,
        content,
        complete: !original_complete,
      })
      .then(() => {
        settodoItems([]);
        fetchAllTodoItems();
      });
  }

  /**
   * 请求所有数据存储到 todoItems 对象数组中
   */
  const fetchAllTodoItems = () => {
    axiosInst
      .get("/todos")
      .then((res) => {
        console.log("res", res);
        settodoItems([]);
        res.map((curItem) => {
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
    axiosInst
      .post("/todos", {
        content: value
      })
      .then(() => {
        settodoItems([]);
        fetchAllTodoItems();
      })
  }

  /**
   * 当用户在搜索框键入 content ，修改对象的 show 属性
   * @param {string} content 待办事项的内容
   */
  const fetchSearchTodoItems = (content) => {
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
      <h1 className="big-title">待办事项管理系统</h1>
      <div>
        <MyInput onClickEnter={fetchAddTodoItem}/>
        <MySearch onClickEnter={fetchSearchTodoItems} />
      </div>

      <div>
        <h2 className="sub-title">待办事项列表</h2>
        <TodoList 
          todoItems={todoItems}
          onClickEditBtn={(id) => handleEdit(id)}
          onClickEditSubmitBtn={(id, editContent) => fetchEditTodoItem(id, editContent)}
          onClickDeleteBtn={(id) => fetchDeleteTodoItem(id)}
          onClickCompleteBtn={(id) => fetchCompleteTodoItem(id)} 
        />
      </div>
    </div>
  );
}

export default TodoListPage;