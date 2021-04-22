import React, { useState } from "react";

function App() {
  const [todoItems, settodoItems] = useState([]);
  const [newItem, setnewItem] = useState({});
  //todoItemsBak是todoItems的拷贝，在handleSearch()中使用
  const [todoItemsBak, settodoItemsBak] = useState([]);

  const [curEditValue, setcurEditValue] = useState("");

  /**
   * 存储用户输入的新增待办事项
   * @param {*} e onChange传递的事件参数
   */
  const storeNewItem = (e) => {
    const value = e.target.value;
    setnewItem({
      content: value,
      complete: false,
      id: Array.from(todoItems).length,
    });
  };

  /**
   * 新增一条待办事项
   */
  const addTodoItem = () => {
    const copyTodoItems = Array.from(todoItems);
    copyTodoItems.push(newItem);
    settodoItems(copyTodoItems);
    settodoItemsBak(copyTodoItems);
  };

  /**
   * 用户按下回车可实现提交
   * @param {number} e onClick传递的事件参数
   */
  const enterToSubmit = (e) => {
    if (e.code === "Enter") {
      addTodoItem(); //注意加括号
      e.target.value = ""; //清空输入框
      e.target.focus(); //定位光标
    }
  };

  /**
   * 当用户点击删除按钮时
   * @param {number} id 当前待办事项的id
   */
  const handleDelete = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.filter((curItem) => {
      return curItem.id !== id;
    });
    settodoItems(copyTodoItems);
    settodoItemsBak(copyTodoItems);
  };

  /**
   * 当用户点击完成/未完成按钮时
   * @param {*} e onClick传递的事件参数
   */
  const toggleComplete = (curItem) => {
    const copyTodoItems = Array.from(todoItems);
    copyTodoItems[curItem.id].complete = !curItem.complete;
    settodoItems(copyTodoItems);
    settodoItemsBak(copyTodoItems);
  };

  /**
   * 当用户按下回车键查询待办事项时
   * @param {*} e onClick传递的事件参数
   */
  const handleSearch = (e) => {
    if (e.code === "Enter") {
      const value = e.target.value;
      if (value === "") {
        settodoItems(todoItems);
      }
      let copyTodoItems = Array.from(todoItemsBak);
      copyTodoItems = copyTodoItems.filter(
        (curItem) => curItem.content.indexOf(value) !== -1
      );
      settodoItems(copyTodoItems);
    }
  };

  const toggleEditState = (curItem) => {
    if (!curItem) return;

    const newTodoItems = Array.from(todoItems).map((todoItem) => {
      if (curItem.id === todoItem.id) {
        todoItem.isEdit = !todoItem.isEdit;
      }
      return todoItem;
    });

    settodoItems(newTodoItems);
  };

  const changeCurTodoItemContent = (curItem) => {
    if (!curItem) return;

    const newTodoItems = Array.from(todoItems).map((todoItem) => {
      if (curItem.id === todoItem.id) {
        todoItem.content = curEditValue;
      }
      return todoItem;
    });
    settodoItems(newTodoItems);
  };

  const renderEdit = (curItem) => {
    if (!curItem) return;

    const handleSubmit = (curItem) => {
      toggleEditState(curItem);
      changeCurTodoItemContent(curItem);
    };

    return (
      <>
        <input
          defaultValue={curItem.content}
          onChange={(e) => setcurEditValue(e.target.value)}
        />
        <button onClick={() => handleSubmit(curItem)}>提交</button>
      </>
    );
  };

  /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns
   */
  const renderCurTodoItem = (curItem) => {
    return (
      <tr key={curItem.id}>
        <td>
          {curItem.isEdit ? (
            renderEdit(curItem)
          ) : (
            <span
              style={{
                textDecoration: curItem.complete ? "line-through" : "none",
              }}
            >
              {curItem.content}
            </span>
          )}
        </td>
        <td>
          <button onClick={() => toggleEditState(curItem)}>编辑</button>
          <button onClick={() => handleDelete(curItem.id)}>删除</button>
          <button onClick={() => toggleComplete(curItem)}>
            {curItem.complete ? "未完成" : "完成"}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <input
        onChange={storeNewItem}
        onKeyDown={(e) => enterToSubmit(e)}
        placeholder="添加待办事项"
      />
      {/* <button onClick={addTodoItem} >增加待办事项</button> */}

      <input onKeyDown={handleSearch} placeholder="搜索待办事项" />

      <table>
        <caption>待办事项列表</caption>
        <thead>
          <tr>
            <th scope="col">待办事项</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>{todoItems.map(renderCurTodoItem)}</tbody>
      </table>
    </div>
  );
}

export default App;
