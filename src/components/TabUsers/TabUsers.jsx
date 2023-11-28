import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import { setUsersData } from "../../redux/action/userManage";
const columns = [

  {
    title: "Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    width: 150,
  },
  {
    title: "User ID",
    dataIndex: "userId",
    width: 80,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    width: 200,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
    ,
    width: 150,
    
  },
  {
    title: "Action",
    dataIndex: "english",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    width: 200,
    
  }
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsers() {
  const dispatch = useDispatch();
  let {usersRedux} = useSelector(state=>state.usersManageReducer);
  console.log("usersDataRedux",usersRedux)

  return (
  
    <div  className=""
    //  style={{
    //   margin: '24px 16px',
    //   padding: 24,
    //   minHeight: 280,
     
    // }}
    >
      <button>ada</button>
      <Table columns={columns} dataSource={usersRedux} onChange={onChange} scroll={{
      y: 280,
    }} />
    </div>
  );
}
