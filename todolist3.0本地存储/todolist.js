let curId = 0; //记录当前待办事项的id值

/**
 * window.onload表示在页面加载时即执行readData函数
 * 从localStorage中读取已有的待办事项
 */
window.onload = function readData() {
  let itemList = JSON.parse(localStorage.getItem("待办事项")) || [];
  curId = itemList.length; //设置新增的第一个待办事项的id
  for (let i = 0; i < itemList.length; i++) {
    const curItem = itemList[i];
    // 做容错处理：先判断 curItem 是否存在，如果不存在程序都没必要往下进行
    if (!curItem) {
      console.error("没有取得当前待办事项元素，初始化失败！");
      return;
    }
    if (curItem.id !== -1) {
      //id值为-1表示被删除的待办事项,不处理
      renderTodoList(curItem.content, curItem.complete, curItem.id, false);
    }
  }
};

/**
 * 按下回车键提交进行新增
 * @param {number} keyCode 用户按下的按键的键值
 */
function enterToSubmit(keyCode) {
  if (keyCode === 13) {
    //回车键的键值为13
    handleSubmit();
  }
}

/**
 * 按下回车键提交进行查询
 * @param {number} keyCode 用户按下的按键的键值
 */
function enterToSearch(keyCode) {
  if (keyCode === 13) {
    //回车键的键值为13
    handleSearch();
  }
}

/**
 * 处理用户提交的表单
 */
function handleSubmit() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const todoItem = formData.get("todo-item");

  // 如果用户在创建输入框中的内容是空的，就不处理（否则会出现一条空的待办事项）
  const spaces = "^[ ]+$"; //多个空格也判为空
  const re = new RegExp(spaces);
  if (re.test(todoItem) === true) {
    alert("待办事项为空，无法创建!");
    return;
  }

  renderTodoList(todoItem, false, 0, true);
  document.querySelector("#item").value = "";
  document.querySelector("#item").focus();
}

/**
 * 渲染出用户的待办事项
 * @param {string} todoItem 待办事项名称
 * @param {boolean} complete 表示是否完成
 * @param {number} id 待办事项的id
 * @param {boolean} newObj 当前要进行渲染的待办事项为新增的还是从localStorage中读取的旧值
 */
function renderTodoList(todoItem, complete, id, newObj) {
  let tbody = document.getElementById("todo-list-body");
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let span = document.createElement("span");
  span.innerHTML = todoItem;

  td.appendChild(span);
  tr.appendChild(td);
  tbody.appendChild(tr);

  if (newObj === true) {
    let oneItem = new Object();
    oneItem.content = todoItem;
    oneItem.complete = false; //新增的待办事项默认为未完成
    oneItem.id = curId;

    let itemList = JSON.parse(localStorage.getItem("待办事项")) || [];
    itemList.push(oneItem);
    localStorage.setItem("待办事项", JSON.stringify(itemList));

    tr.id = String(curId);
    curId++;
  } else {
    tr.id = String(id);
  }
  span.id = tr.id + "span";

  createOperationTd(tr.id, span.id, todoItem, complete);
}

/**
 * 创建当前行的第二列,创建三个操作按钮并实现相应功能
 * @param {string} trId 待操作行tr的id
 * @param {string} spanId 存储待办事项内容的标签span的id
 * @param {string} todoItem 待操作的待办事项的内容
 * @param {boolean} complete 当前待办事项是否完成
 */
function createOperationTd(trId, spanId, todoItem, complete) {
  const tr = document.getElementById(trId);
  const span = document.getElementById(spanId);
  let tdButton = document.createElement("td");

  //1.编辑
  const buttonEdit = createButton("编辑"); //新增编辑按钮
  let inputEdit = document.createElement("input"); //新增标签input,用于编辑功能用户输入编辑的内容
  inputEdit.type = "text";
  inputEdit.id = trId + "input-edit-text";
  inputEdit.className = "input-edit-text";
  inputEdit.value = todoItem;
  inputEdit.style.display = "none";
  tr.cells[0].appendChild(inputEdit);

  const buttonSubmit = createButton("提交"); //新增提交按钮
  buttonSubmit.id = trId + "button-submit-edit";
  buttonSubmit.style.display = "none";
  tr.cells[0].appendChild(buttonSubmit);

  buttonEdit.onclick = () => handleEdit(trId, inputEdit.id, buttonSubmit.id);
  tdButton.appendChild(buttonEdit);

  //2.删除
  const buttonDelete = createButton("删除"); //新增删除按钮
  buttonDelete.onclick = () => handleDelete(trId);
  tdButton.appendChild(buttonDelete);

  //3.完成/未完成
  span.style.textDecoration = complete ? "line-through" : "none";
  let buttonComplete = createButton(complete ? "未完成" : "完成");
  buttonComplete.id = trId + "button-complete";
  buttonComplete.onclick = () =>
    handleComplete(trId, spanId, buttonComplete.id);
  tdButton.appendChild(buttonComplete);

  tr.appendChild(tdButton);
}

/**
 * 新创建一个以buttonName为名的按钮
 * @param {string} buttonName 按钮名称
 * @returns button元素
 */
function createButton(buttonName) {
  const button = document.createElement("button");
  button.innerHTML = buttonName;
  button.className = "button";
  return button;
}

/**
 * 当用户输入编辑后的内容点击提交时
 * @param {string} trId 待操作行tr的id
 * @param {string} inputEditId 点击编辑按钮后出现的输入框的id
 * @param {string} buttonSubmitId 点击编辑按钮后出现的提交按钮的id
 */
function handleSubmitEdit(trId, inputEditId, buttonSubmitId) {
  //点击提交按钮表示用户输入编辑后的内容完毕
  const tr = document.getElementById(trId);
  const inputEdit = document.getElementById(inputEditId);
  const buttonSubmit = document.getElementById(buttonSubmitId);
  let editText = inputEdit.value;
  tr.cells[0].firstChild.innerHTML = editText;
  tr.cells[0].firstChild.style.display = "inline";
  inputEdit.style.display = "none";
  buttonSubmit.style.display = "none";

  // 更改localStorage中相应的待办事项
  let itemList = JSON.parse(localStorage.getItem("待办事项")) || [];
  let curItem = itemList[Number(trId)];
  if (!curItem) {
    console.error("没有取得当前待办事项元素，初始化失败！");
    return;
  }
  curItem.content = editText;
  localStorage.setItem("待办事项", JSON.stringify(itemList));
}

/**
 * 处理用户点击编辑按钮事件
 * @param {string} trId 待操作行tr的id
 * @param {string} inputEditId 点击编辑按钮后出现的输入框的id
 * @param {string} buttonSubmitId 点击编辑按钮后出现的提交按钮的id
 */
function handleEdit(trId, inputEditId, buttonSubmitId) {
  const tr = document.getElementById(trId);
  const inputEdit = document.getElementById(inputEditId);
  const buttonSubmit = document.getElementById(buttonSubmitId);

  inputEdit.style.display = "inline"; //点击编辑按钮后显示输入框和提交按钮
  inputEdit.focus();
  buttonSubmit.style.display = "inline";
  tr.cells[0].firstChild.style.display = "none";

  buttonSubmit.onclick = () =>
    handleSubmitEdit(trId, inputEditId, buttonSubmitId);
}

/**
 * 处理用户点击删除按钮事件
 * @param {string} trId 待删除行的tr元素的id
 */
function handleDelete(trId) {
  const tr = document.getElementById(trId);
  tr.remove();

  //删除localStorage中相应的待办事项(不是真正删除，只是将id置为不可用值)
  let itemList = JSON.parse(localStorage.getItem("待办事项")) || [];
  let curItem = itemList[Number(trId)];
  if (!curItem) {
    console.error("没有取得当前待办事项元素，初始化失败！");
    return;
  }
  curItem.id = -1; //id置为-1表示不再使用该条待办事项记录
  localStorage.setItem("待办事项", JSON.stringify(itemList));
}

/**
 * 处理用户点击完成/未完成按钮事件
 * @param {string} trId 待操作行tr的id
 * @param {string} spanId 存储待办事项内容的标签span的id
 */
function handleComplete(trId, spanId, buttonCompleteId) {
  const buttonComplete = document.getElementById(buttonCompleteId);
  const span = document.getElementById(spanId);

  let itemList = JSON.parse(localStorage.getItem("待办事项")) || [];
  let curItem = itemList[Number(trId)];
  if (!curItem) {
    console.error("没有取得当前待办事项元素，初始化失败！");
    return;
  }
  if (buttonComplete.innerHTML === "完成") {
    span.style.textDecoration = "line-through";
    buttonComplete.innerHTML = "未完成";

    curItem.complete = true; //变更localStorage中相应的待办事项为完成状态
  } else {
    span.style.textDecoration = "none";
    buttonComplete.innerHTML = "完成";

    curItem.complete = false; //变更localStorage中相应的待办事项为未完成状态
  }
  localStorage.setItem("待办事项", JSON.stringify(itemList));
}

/**
 * 处理用户的查询待办事项操作
 */
function handleSearch() {
  const searchText = document.getElementById("search-text").value; //用户输入的待查询文本
  const tbody = document.getElementById("todo-list-body");
  const tr = tbody.getElementsByTagName("tr");
  if (searchText === "") {
    //若用户输入的内容为空,则恢复初始的待办事项表格
    for (let i = 0; i < tr.length; i++) {
      tr[i].style.display = "table-row";
    }
  } else {
    for (i = 0; i < tr.length; i++) {
      let item = tr[i].cells[0].firstChild.innerHTML; //firstchild元素的第一个子节点
      let index = item.indexOf(searchText); //indexOf方法用于查找子串,返回索引,索引为-1表示不存在子串
      if (index === -1) {
        tr[i].style.display = "none";
      } else {
        tr[i].style.display = "table-row"; //注意这条语句
      }
    }
  }
}
