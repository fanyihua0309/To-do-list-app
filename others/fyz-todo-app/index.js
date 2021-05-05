const todos = []; // 待办事项数组

/**
 * 过滤待办事项
 * @param {*} e 点击 Enter 时传入的参数
 */
function searchTodos(e) {
  console.log(e.code, e.target.value);
  // 根据获取的搜索关键词来过滤待办事项数组

  // 先清空原来的搜索结果
  const todoListBody = document.querySelector("#todo-list-body");
  if (!todoListBody) {
    console.error("没有定位到待办事项的列表body，搜索失败！");
    return;
  }
  todoListBody.innerHTML = "";

  // 再将匹配到的待办事项渲染出来
  const keywordForSearch = e.target.value;
  todos.forEach((todo) => {
    if (todo.indexOf(keywordForSearch) > -1) {
      append1TodoItem(todo);
    }
  });
}

/**
 * 当新增输入框点击 enter 时
 * @param {*} e 点击 Enter 时传入的参数
 */
function handleAddTodoItem(e) {
  if (e.code === "Enter") {
    const todoItem = e.target.value;

    todos.push(todoItem);
    append1TodoItem(todoItem);
    afterAdd();
  }
}

/**
 * 删除一行待办事项
 * @param {*} e 传入的事件
 */
function handleDelete(e) {
  if (!e) return;

  // 获取当前所在行的dom节点
  const deleteBtn = e.path && e.path[0];
  if (!deleteBtn) {
    console.error("无法定位到删除按钮，删除失败！");
    return;
  }
  const curTr = deleteBtn.closest("tr");
  if (!curTr) {
    console.error("无法定位到当前行，删除失败！");
    return;
  }

  // 获取当前所在行的父亲节点
  const parentElement = curTr && curTr.parentElement;

  if (!parentElement) {
    console.error("无法找到当前所在行，删除失败！");
    return;
  }

  // 移除当前所在行
  parentElement.removeChild(curTr);
  console.log("删除成功！");
}

/**
 * 当点击完成按钮时
 * @param {*} e
 */
function handleFinish(e) {
  if (!e) return;

  // 获取当前所在行的dom节点
  const finishBtn = e.path && e.path[0];
  if (!finishBtn) {
    console.error("无法定位到完成按钮，操作失败！");
    return;
  }

  // 获取当前所在行
  const curTr = finishBtn.closest("tr");
  if (!curTr) {
    console.error("无法定位到当前行，操作失败！");
    return;
  }
  // 获取当前所在行的待办事项列
  const todoItemElement = curTr.children[0];

  // 如果当前按钮显示“完成”，则将该行置为完成状态；否则将该行恢复成未完成状态
  const btnText = finishBtn.innerHTML;
  if (btnText === "完成") {
    todoItemElement.style["text-decoration"] = "line-through";
    finishBtn.innerHTML = "未完成";
  } else {
    todoItemElement.style["text-decoration"] = "none";
    finishBtn.innerHTML = "完成";
  }
}

/**
 * 新生成一行表格数据
 * @param {*} value 待办事项的内容
 */
function append1TodoItem(value) {
  const tdTodoItem = document.createElement("td");
  tdTodoItem.innerHTML = value;
  tdTodoItem.style.width = "70%";

  const tdOperation = createOperationTd();
  tdOperation.style.width = "30%";

  const tr = document.createElement("tr");
  tr.appendChild(tdTodoItem);
  tr.appendChild(tdOperation);

  document.querySelector("#todo-list-body").appendChild(tr);
}

/**
 * 当添加完一个待办事项
 */
function afterAdd() {
  const input = document.querySelector("#input-add-todo-item");
  input.value = "";
  input.focus();
}

/**
 * 生成操作按钮那一列
 */
function createOperationTd() {
  const editBtn = createBtn("编辑");

  const finishBtn = createBtn("完成");
  finishBtn.onclick = handleFinish;

  const deleteBtn = createBtn("删除");
  deleteBtn.onclick = handleDelete;

  const tdOperation = document.createElement("td");
  tdOperation.appendChild(editBtn);
  tdOperation.appendChild(finishBtn);
  tdOperation.appendChild(deleteBtn);

  return tdOperation;
}

/**
 * 生成一个按钮元素
 * @param {*} btnText 按钮上的文案
 */
function createBtn(btnText) {
  const button = document.createElement("button");
  button.innerHTML = btnText;

  return button;
}
