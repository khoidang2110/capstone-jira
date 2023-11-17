import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
const columns = [
  {
    title: "No.",
    dataIndex: "nam",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "User ID",
    dataIndex: "userId",
    
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },,
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    
  },
  {
    title: "Action",
    dataIndex: "english",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  }
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsers() {
  let {usersRedux} = useSelector(state=>state.usersManageReducer);
  console.log("usersDataRedux",usersRedux)
  return (
  
    <div  className="container py-20"
    //  style={{
    //   margin: '24px 16px',
    //   padding: 24,
    //   minHeight: 280,
     
    // }}
    >
      <button>ada</button>
      <Table columns={columns} dataSource={usersRedux} onChange={onChange} />
    </div>
  );
}
