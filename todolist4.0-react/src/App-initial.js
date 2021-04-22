import React, { useState } from "react";

function App() {
  const [todoItems, settodoItems] = useState([]);
  const [newItem, setnewItem] = useState({});
  //todoItemsBak是todoItems的拷贝，在handleSearch()中使用
  const [todoItemsBak, settodoItemsBak] = useState([]);

  /**
   * 存储用户输入的新增待办事项
   * @param {*} e onChange传递的事件参数
   */
  const storeNewItem = (e) => {
    const value = e.target.value;
    setnewItem({
      content: value,
      complete: false,
      id: Array.from(todoItems).length
    })
  }

  /**
   * 新增一条待办事项
   */
  const addTodoItem = () => {
    const copyTodoItems = Array.from(todoItems);
    copyTodoItems.push(newItem);
    settodoItems(copyTodoItems);
    settodoItemsBak(copyTodoItems); 
  }

  /**
   * 用户按下回车可实现提交
   * @param {number} e onClick传递的事件参数
   */
  const enterToSubmit = (e) => {
    if(e.code === "Enter"){
      addTodoItem();  //注意加括号
      e.target.value = '';  //清空输入框
      e.target.focus();     //定位光标
    }
  }

  /**
   * 当用户点击编辑按钮时
   * @param {object} curItem 当前待办事项
   */
  const handleEdit = (curItem) => {
    const td = document.getElementById("td" + String(curItem.id));
    const span = document.getElementById("span" + String(curItem.id));
    span.style.display = "none";
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = curItem.content;
    // inputEdit.focus();   //直接这样写不生效，可能原因：浏览器对dom的操作是等待代码执行完毕后进行
    setTimeout(() => {
      inputEdit.focus();    //使用延迟函数解决问题
    })
    inputEdit.style.display = "inline";

    const buttonEditSubmit = document.createElement("button");
    buttonEditSubmit.innerHTML = "提交";
    buttonEditSubmit.style.display = "inline";

    td.appendChild(inputEdit);
    td.appendChild(buttonEditSubmit);

    /**
     * 当用户输入编辑内容完成后，按回车或点击提交按钮时
     */
    const handleEditSubmit = () => {
      span.innerHTML = inputEdit.value;
      const editContent = inputEdit.value;
      span.style.display = "inline";
      inputEdit.style.display = "none";
      buttonEditSubmit.style.display = "none";

      const copyTodoItems = Array.from(todoItems);
      copyTodoItems[curItem.id].content = editContent;
      settodoItems(copyTodoItems);
      settodoItemsBak(copyTodoItems);
    }

    buttonEditSubmit.onclick = () => handleEditSubmit();  //点击提交按钮提交编辑内容

    inputEdit.onkeydown = (e) => {  //按下回车提交编辑内容
      if(e.code === "Enter"){   
        handleEditSubmit();
      }
    }
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
    settodoItemsBak(copyTodoItems); 
  }

  /**
   * 当用户点击完成/未完成按钮时
   * @param {*} e onClick传递的事件参数
   */
  const handleComplete = (e, curItem) => {
    e.currentTarget.innerHTML = (curItem.complete === false) ? "未完成" : "完成";
    document.getElementById("span" + String(curItem.id)).style.textDecoration = (curItem.complete === false) ? "line-through" : "none";

    const copyTodoItems = Array.from(todoItems);
    copyTodoItems[curItem.id].complete = (curItem.complete === false) ? true : false;
    settodoItems(copyTodoItems);
    settodoItemsBak(copyTodoItems); 
  }

  /**
   * 当用户按下回车键查询待办事项时
   * @param {*} e onClick传递的事件参数
   */
  const handleSearch = (e) => {
    if(e.code === "Enter"){
      const value = e.target.value;
      if(value === ""){
        settodoItems(todoItems);
      }
      let copyTodoItems = Array.from(todoItemsBak);
      copyTodoItems = copyTodoItems.filter((curItem) => {
        if(curItem.content.indexOf(value) !== -1){
          return true;
        }
        else{
          return false;
        }
      })
      settodoItems(copyTodoItems);
    }
  }

  /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns 
   */
  const renderCurTodoItem = (curItem) => {
    const curTdId = "td" + String(curItem.id);
    const curSpanId = "span" + String(curItem.id);
    return (
      <tr>
        <td id={curTdId}>
          <span id={curSpanId}>
            {curItem.content}
          </span>
        </td>
        <td>
          <button onClick={() => handleEdit(curItem)}>编辑</button>
          <button onClick={() => handleDelete(curItem.id)}>删除</button>
          <button onClick={(e) => handleComplete(e, curItem)}>完成</button>
        </td>
      </tr>
    )
  }
  
  return (
    <div>
      <input onChange={storeNewItem} onKeyDown={(e) => enterToSubmit(e)} placeholder="添加待办事项"/>
      {/* <button onClick={addTodoItem} >增加待办事项</button> */}

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