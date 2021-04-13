let curId = 0;    //记录当前待办事项的id值

let obj = {     //定义存储对象
    content: "test",
    complete: true,
    id: 0
};

let objArray = JSON.parse(localStorage.getItem("待办事项"));  
if(objArray === null)   //若localStorage中不存在待办事项,objArray为null
    objArray = [];      //则将值置为空数组,否则无法使用push等数组操作方法

localStorage.setItem("待办事项", JSON.stringify(objArray));

// window.onload表示在页面加载时即执行readData函数,从localStorage中读取已有的待办事项
window.onload =  function readData(){  
    objArray = JSON.parse(localStorage.getItem("待办事项")); 
    curId = objArray.length;    //设置新增的第一个待办事项的id
    for(let i = 0; i < objArray.length; i++){
        let curObj = objArray[i];
        if(curObj.id !== -1){       //id值为-1表示被删除的待办事项,不处理
            renderTodoList(curObj.content, curObj.complete, curObj.id, false);
        }
    }
}

//按下回车键提交进行新增
function enterToSubmit(keyCode){     
    if (keyCode === 13){  //回车键的键值为13
        handleSubmit();
    }
}

//按下回车键提交进行查询
function enterToSearch(keyCode){    
    if (keyCode === 13){  //回车键的键值为13
        handleSearch();
    }
}

//处理用户提交的表单
function handleSubmit(){
    const form = document.querySelector("form"); 
    const formData = new FormData(form);
    const todoItem = formData.get("todo-item");

    renderTodoList(todoItem, false, 0, true);
    afterSubmit();
}

//提交表单之后的操作
function afterSubmit(){
    document.querySelector("#item").value = "";
    document.querySelector("#item").focus();
}

//新创建一个以buttonName为名的按钮
function createButton(buttonName){      
    const button = document.createElement("button");
    button.innerHTML = buttonName;
    button.className = "button";
    return button;
}

//渲染出用户的待办事项
//传入的参数中todoItem为待办事项名称
//complete为true/false表示是否完成
//id为待办事项的id
//newObj为true/false表示当前要进行渲染的待办事项为新增的还是从localStorage中读取的旧值
function renderTodoList(todoItem, complete, id, newObj){
    let tbody = document.getElementById("todo-list-body");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let span = document.createElement("span");
    span.innerHTML = todoItem;
    span.className = "todo-list-left";
    
    td.appendChild(span);
    // td.style.width = "60%";
    tr.appendChild(td);
    tbody.appendChild(tr);

    if(newObj == true){
        obj.content = todoItem;
        obj.complete = false;   //新增的待办事项默认为未完成
        obj.id = curId;
        
        objArray = JSON.parse(localStorage.getItem("待办事项"));
        objArray.push(obj);
        localStorage.setItem("待办事项", JSON.stringify(objArray));

        tr.id = String(curId);
        curId++;
    }
    else{
        tr.id = String(id);
    }

    span.id = tr.id + "span";

    let tdButton = document.createElement("td");
    tdButton.className = "todo-list-right";

    //--------------------------------------------------编 辑--------------------------------------------------
    const buttonEdit = createButton("编辑");    //新增编辑按钮
    let inputEdit = document.createElement("input");    //新增标签input,用于编辑功能用户输入编辑的内容
    inputEdit.type = "text";
    inputEdit.id = "input-edit-text";
    inputEdit.value = todoItem;
    tr.cells[0].appendChild(inputEdit);

    const buttonSubmit = createButton("提交");  //新增提交按钮
    buttonSubmit.style.display = "none";
    tr.cells[0].appendChild(buttonSubmit);

    buttonEdit.onclick = function handleEdit(){   //处理用户点击编辑按钮事件
        inputEdit.style.display = "inline";       //点击编辑按钮后显示输入框
        buttonSubmit.style.display = "inline";
        tr.cells[0].firstChild.style.display = "none";
        
        buttonSubmit.onclick = function hideInputEdit(){    //点击提交按钮表示用户输入编辑后的内容完毕
            let editText = inputEdit.value;
            tr.cells[0].firstChild.innerHTML = editText;
            tr.cells[0].firstChild.style.display = "inline";
            inputEdit.style.display = "none";
            buttonSubmit.style.display = "none";

            //更改localStorage中相应的待办事项
            objArray = JSON.parse(localStorage.getItem("待办事项"));    
            let curObj = objArray[Number(tr.id)];   
            curObj.content = editText;
            localStorage.setItem("待办事项", JSON.stringify(objArray));
        }
    }  
    tdButton.appendChild(buttonEdit);

    //--------------------------------------------------删 除--------------------------------------------------
    const buttonDelete = createButton("删除");       //新增删除按钮
    buttonDelete.onclick = function handleDelete(){   //处理用户点击删除按钮事件
        tr.remove();

        //删除localStorage中相应的待办事项(不是真正删除，只是将id置为不可用值)
        objArray = JSON.parse(localStorage.getItem("待办事项"));    
        let curObj = objArray[Number(tr.id)];   
        curObj.id = -1;     //id置为-1表示不再使用该条待办事项记录
        localStorage.setItem("待办事项", JSON.stringify(objArray));
    }
    tdButton.appendChild(buttonDelete);

    //--------------------------------------------------完 成--------------------------------------------------
    let buttonComplete;
    if(complete === false){
        document.getElementById(span.id).style.textDecoration = "none";
        buttonComplete = createButton("完成");    //新增完成按钮
    }
    else if(complete === true){
        document.getElementById(span.id).style.textDecoration = "line-through";
        buttonComplete = createButton("未完成");    //新增未完成按钮 
    }

    buttonComplete.onclick = function handleComplete(){   //处理用户点击完成/未完成按钮事件
        objArray = JSON.parse(localStorage.getItem("待办事项"));    
        let curObj = objArray[Number(tr.id)];
        if(buttonComplete.innerHTML === "完成"){
            document.getElementById(span.id).style.textDecoration = "line-through";
            buttonComplete.innerHTML = "未完成";

            curObj.complete = true;    //变更localStorage中相应的待办事项为完成状态
        }
        else{
            document.getElementById(span.id).style.textDecoration = "none";
            buttonComplete.innerHTML = "完成";
            
            curObj.complete = false;     //变更localStorage中相应的待办事项为未完成状态
        }
        localStorage.setItem("待办事项", JSON.stringify(objArray));  
    }
    tdButton.appendChild(buttonComplete);
    // tdButton.style.width = "40%";

    tr.appendChild(tdButton);
}

//查询功能
function handleSearch(){
    const searchText = document.getElementById("search-text").value;    //用户输入的待查询文本
    const tbody = document.getElementById("todo-list-body");  
    const tr = tbody.getElementsByTagName("tr");
    console.log(searchText);
    if(searchText === ""){      //若用户输入的内容为空,则恢复初始的待办事项表格
        for(let i = 0; i < tr.length; i++){
        tr[i].style.display = "table-row";
        }
    }
    else{
        for(i = 0; i < tr.length; i++){
            let item = tr[i].cells[0].firstChild.innerHTML; //firstchild元素的第一个子节点
            let index = item.indexOf(searchText);   //indexOf方法用于查找子串,返回索引,索引为-1表示不存在子串
            if(index === -1){
                tr[i].style.display = "none";
            }
            else{
                tr[i].style.display = "table-row";  //注意这条语句
            }
        }
    }
}