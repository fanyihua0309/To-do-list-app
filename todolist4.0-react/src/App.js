import React, { useState } from "react";

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
  const [newItem, setnewItem] = useState({});
  const [editContent, seteditContent] = useState("");
  

  /**
   * 存储用户输入的新增待办事项
   * @param {*} e onChange传递的事件参数
   */
  const storeNewItem = (e) => {
    const value = e.target.value;
    const newItem = new TodoItem(value);
    setnewItem(newItem);
  }

  /**
   * 存储编辑的待办事项内容
   * @param {*} e onChange传递的事件参数
   */
  const storeEditContent = (e) => {
    seteditContent(e.target.value);
  }

  /**
   * 新增一条待办事项
   */
  const addTodoItem = () => {
    settodoItems((preItem) => {
      return [...preItem, newItem];
    })
  }

  /**
   * 用户按下回车可实现提交
   * @param {number} e onClick传递的事件参数
   */
  const enterToSubmit = (e) => {
    if(e.code === "Enter"){
      addTodoItem();        //注意加括号
      e.target.value = '';  //清空输入框
      e.target.focus();     //定位光标
    }
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
        seteditContent(curItem.content);
      }
      return curItem;
    })
    settodoItems(copyTodoItems);
  }

  /**
   * 当用户输入编辑内容完毕，点击提交按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleEditSubmit = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.map((curItem) => {
      if(curItem.id === id){
        curItem.content = editContent;
        curItem.edit = false;
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
  const handleSearch = (e) => {
    if(e.code === "Enter"){
      const value = e.target.value;
      let copyTodoItems = Array.from(todoItems);
      if(value !== ""){
        copyTodoItems = copyTodoItems.map((curItem) => {
          curItem.show = (curItem.content.indexOf(value) !== -1);
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
  }


  /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns 
   */
  const renderCurTodoItem = (curItem) => {
    if(curItem.show){   
      return (
        <tr>
          <td>
            {
              curItem.edit ? 
                (
                  (<input type="text" value={editContent} onChange={storeEditContent}/>)
                  (<button onclick={() => handleEditSubmit(curItem.id)}>提交</button>)
                )
                :
                (<span style={{textDecoration:
                  (curItem.complete ? "line-through" : "none")  
                }}>
                  {curItem.content}
                </span>)
            }
          </td>
          <td>
            <button onClick={() => handleEdit(curItem.id)}>编辑</button>
            <button onClick={() => handleDelete(curItem.id)}>删除</button>
            <button onClick={(e) => handleComplete(curItem.id)}>
              {curItem.complete ? "未完成" : "完成"}
            </button>
          </td>
        </tr>
      )
    }
    
  }
  
  return (
    <div>
      <input onChange={storeNewItem} onKeyDown={(e) => enterToSubmit(e)} placeholder="添加待办事项"/>
      <br />
      <input onKeyDown={handleSearch} placeholder="搜索待办事项"/>

      <table>
        <caption>
          待办事项列表
        </caption>
        <thead>
          <tr>
            <th scope="col">待办事项</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          {
            todoItems.map(renderCurTodoItem)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;