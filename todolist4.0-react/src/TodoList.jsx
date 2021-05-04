import React, {useState} from 'react'

import { Button, Input } from 'antd';
import { Table, Space } from 'antd';
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
    onClickEditSubmitBtn(id, editContent);  // 将待办事项的 id, 编辑后的内容抛给父组件
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
  }

  const columns = [
    {
      title: '待办事项',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        return (
          record.edit ? 
          (<div>
            <Input type="text" allowClear value={editContent} onChange={storeEditContent}/>
            <Button type="primary" onClick={() => handleEditSubmit(record.id)}>提交</Button>
          </div>)
          :
            (<span style={{textDecoration: (record.complete ? "line-through" : "none")}}>
              {text}
            </span>)
        )
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
          return (
            <Space size="middle">
              <Button type="primary" onClick={(e) => onClickEditBtn1(e, record.id, record.content)}>编辑</Button>
              <Button type="primary" onClick={() => onClickDeleteBtn(record.id)}>删除</Button>
              <Button type="primary" onClick={() => onClickCompleteBtn(record.id)}>
                {record.complete ? "未完成" : "完成"}
              </Button>
            </Space>
          )
      },
    },
  ];


  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={todoItems.filter((curItem) => {return curItem.show === true;})} 
        pagination={{position: ["topLeft"], pageSize: 4, showQuickJumper: true}}
        id="table"
      />
    </div>
  )
}

export default TodoList;