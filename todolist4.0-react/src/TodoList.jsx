import React, {useState} from 'react'

const TodoList = ({todoItems, onClickEditBtn, onClickEditSubmitBtn, onClickDeleteBtn, onClickCompleteBtn}) => {

  const [editContent, seteditContent] = useState("");

  /**
   * 存储编辑的待办事项内容
   * @param {*} e onChange传递的事件参数
   */
   const storeEditContent = (e) => {
    seteditContent(e.target.value);
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
    onClickEditSubmitBtn(copyTodoItems);
  }

  /**
   * 将 id, content 抛出给父组件，并设置 editContent 的值
   * @param {*} e onClick传递的事件参数
   * @param {number} id 待办事项的id
   * @param {string} content 待办事项的内容
   */
  const onClickEditBtn1 = (e, id, content) => {
    onClickEditBtn(id);
    seteditContent(content);
    
    // 问题：无法定位光标？
    // setTimeout(()=>{
    //   e.target.focus();
    // })
  }
 
   /**
   * 渲染当前待办事项
   * @param {object} curItem 当前待办事项
   * @returns 
   */
     const renderCurTodoItem = (curItem) => {
      if(curItem.show){   
        return (
          // 通过循环遍历list生成的元素，要给每一行唯一的key，否则会有warning
          <tr key={curItem.id}>
            <td>
              {
                curItem.edit ? 
                  (
                    // 也可以用空标签<></>包裹起来，jsx只能返回一个元素
                    <div>
                      <input type="text" value={editContent} onChange={storeEditContent}/>
                      <button onClick={() => handleEditSubmit(curItem.id)}>提交</button>
                    </div>
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
              <button onClick={(e) => onClickEditBtn1(e, curItem.id, curItem.content)}>编辑</button>
              <button onClick={() => onClickDeleteBtn(curItem.id)}>删除</button>
              <button onClick={() => onClickCompleteBtn(curItem.id)}>
                {curItem.complete ? "未完成" : "完成"}
              </button>
            </td>
          </tr>
        )
      }
      
    }


  return (
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
  )
}

export default TodoList;
