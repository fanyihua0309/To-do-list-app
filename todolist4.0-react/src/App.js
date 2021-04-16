import React, { useState } from "react";

function App() {
  const [todoItems, settodoItems] = useState([]);
  const [newItem, setnewItem] = useState({});
  const [buttonName, setbuttonName] = useState("完成");

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
  }

  /**
   * 用户按下回车可实现提交
   * @param {*} e onClick传递的事件参数
   */
  const enterToSubmit = (e) => {
    if(e.keyCode === 13){
      addTodoItem();  //注意加括号
      e.target.value = '';  //清空输入框
    }
  }


  const handleEdit = () => {

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
   * @param {object} curItem 当前待办事项
   */
  const handleComplete = (curItem) => {
    const copyTodoItems = Array.from(todoItems);
    copyTodoItems[curItem.id].complete = true ? false : true;
    settodoItems(copyTodoItems);
    changeButtonName();
  }

  /**
   * 更改完成/未完成按钮的名称
   */
  const changeButtonName = () => {
    const newButtonName = (buttonName === "完成" ? "未完成" : "完成");
    setbuttonName(newButtonName);
  }

  /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns 
   */
  const renderCurTodoItem = (curItem) => {
    return (
      <tr>
        <td>
          {curItem.content}
        </td>
        <td>
          <button onClick={() => handleEdit(curItem.id)}>编辑</button>
          <button onClick={() => handleDelete(curItem.id)}>删除</button>
          <button onClick={() => handleComplete(curItem)}>{buttonName}</button>
        </td>
      </tr>
    )
  }

  
  return (
    <div>
      <input onChange={storeNewItem} onKeyDown={(e) => enterToSubmit(e)}/>
      <button onClick={addTodoItem} >增加待办事项</button>

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
