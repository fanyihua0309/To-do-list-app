let itemNum = 0;    //记录待办事项的数目


function enterToSubmit(keyCode){     //按下回车键提交进行新增
    if (keyCode === 13){  //回车键的键值为13
        handleSubmit();
    }
}
function enterToSearch(keyCode){    //按下回车键提交进行查询
    if (keyCode === 13){  //回车键的键值为13
        handleSearch();
    }
}

//处理用户提交的表单
function handleSubmit(){
    const form = document.querySelector("form"); 
    const formData = new FormData(form);
    const todoItem = formData.get("todo-item");

    window.localStorage.setItem("0-" + String(itemNum), todoItem);   //注意相同的key只能存储一条记录

    renderTodoList(todoItem, "0");
    afterSubmit();
}

function createButton(buttonName){      //新创建一个以buttonName为名的按钮
    const button = document.createElement("button");
    button.innerHTML = buttonName;
    button.className = "button";
    return button;
}

//渲染出用户输入的待办事项
function renderTodoList(todoItem, isComplete){
    let table = document.querySelector("#todo-list");
    let tr = document.createElement("tr");
    tr.id = isComplete + "-" + String(itemNum); //用0表示未完成，1表示完成，-是连接符
    itemNum++;
    let td = document.createElement("td");
    let span = document.createElement("span");
    span.innerHTML = todoItem;
    span.className = "todo-list-left";
    if(isComplete === "1"){
        span.style.textDecoration = "line-through";
    }
    else if(isComplete === "0"){
        span.style.textDecoration = "none";
    }
    td.appendChild(span);
    tr.appendChild(td);
    table.appendChild(tr);


    let tdButton = document.createElement("td");
    tdButton.className = "todo-list-right";

    const buttonEdit = createButton("编辑");    //新增编辑按钮

    let inputEdit = document.createElement("input");    //新增标签input,用于编辑功能用户输入编辑的内容
    inputEdit.type = "text";
    inputEdit.id = "input-edit-text";
    inputEdit.value = todoItem;
    inputEdit.style.height = "25px";
    inputEdit.style.width = "200px";
    inputEdit.style.display = "none";
    tr.cells[0].appendChild(inputEdit);

    const buttonSubmit = createButton("提交");  //新增提交按钮
    buttonSubmit.style.display = "none";
    tr.cells[0].appendChild(buttonSubmit);

    buttonEdit.onclick = function handleEdit(){   //处理用户点击编辑按钮事件
        inputEdit.style.display = "inline";       //点击编辑按钮后显示输入框
        buttonSubmit.style.display = "inline";

        tr.cells[0].removeChild(span);  //将原来的文本显示去掉
        
        let editText;
        buttonSubmit.onclick = function hideInputEdit(){    //点击提交按钮表示用户输入编辑后的内容完毕
            inputEdit.style.display = "none";
            editText = inputEdit.value;
            tr.cells[0].innerHTML = editText;
            window.localStorage[tr.id] = editText;
        }
    }
    tdButton.appendChild(buttonEdit);


    const buttonDelete = createButton("删除");       //新增删除按钮
    buttonDelete.onclick = function handleDelete(){   //处理用户点击删除按钮事件
        // const curValue = localStorage.getItem(tr.id);
        console.log(tr.id);
        tr.remove();
        // localStorage.removeItem(tr.id);
        // itemNum = localStorage.length;
        
        // const string = tr.id.split("-");
        // // console.log(string[1]);
        // const curNum = Number(string[1]);
        // for(let i = curNum; i < itemNum; i++){

        // }

    }
    tdButton.appendChild(buttonDelete);

    let buttonComplete;
    if(isComplete === "0")
        buttonComplete = createButton("完成");    //新增完成按钮
    else if(isComplete === "1"){
        buttonComplete = createButton("未完成");    //新增未完成按钮 
    }
    buttonComplete.onclick = function handleComplete(){   //处理用户点击完成/未完成按钮事件
        if(buttonComplete.innerHTML === "完成"){
            tr.cells[0].style.textDecoration = "line-through";
            buttonComplete.innerHTML = "未完成";
            const value = localStorage.getItem(tr.id);
            localStorage.removeItem(tr.id);
            tr.id = tr.id.replace("0", "1");
            localStorage.setItem(tr.id, value); //更改键值
        }
        else{
            tr.cells[0].style.textDecoration = "none";
            buttonComplete.innerHTML = "完成";
            const value = localStorage.getItem(tr.id);
            localStorage.removeItem(tr.id);
            tr.id = tr.id.replace("1", "0");
            localStorage.setItem(tr.id, value); //更改键值
        }
    }
    tdButton.appendChild(buttonComplete);

    tr.appendChild(tdButton);
}

window.onload =  function readData(){   //在页面加载时即执行该函数
    for(let i = 0; i < localStorage.length; i++){
        const name = localStorage.key(i);
        const string = name.split("-");
        // console.log(string[0]);
        const value = localStorage.getItem(name);
        renderTodoList(value, string[0]);
    }
}


//提交表单之后的操作
function afterSubmit(){
    document.querySelector("#item").value = "";
    document.querySelector("#item").focus();
}

//查询功能
function handleSearch(){
    const searchText = document.getElementById("search-text").value;    //用户输入的待查询文本
    const tabel = document.getElementById("todo-list");  
    const tr = tabel.getElementsByTagName("tr");
    console.log(searchText);
    if(searchText === ""){      //若用户输入的内容为空,则恢复初始的待办事项表格
        for(let i = 0; i < tr.length; i++){
        tr[i].style.display = "block";
        }
    }
    else{
        let isExit = 0;
        for(i = 0; i < tr.length; i++){
            let item = tr[i].cells[0].firstChild.innerHTML; //firstchild元素的第一个子节点
            let index = item.indexOf(searchText);   //indexOf方法用于查找子串,返回索引,索引为-1表示不存在子串
            if(index === -1){
                tr[i].style.display = "none";
            }
            else{
                tr[i].style.display = "block";  //注意这条语句
            }
        }
    }
}