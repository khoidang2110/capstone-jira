import React, { useEffect, useState } from "react";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
import { userService } from "../../service/service";
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Project name",
    dataIndex: "projectName",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Category name",
    dataIndex: "categoryName",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Creator",
    key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Members",
    
    render: (text, record, index) => {
      return (
        <div>
          {record.members?.slice(0, 3).map((member, index) => {
            return (
              <Popover
                key={index}
                placement="top"
                title="Member"
                content={() => {
                  return (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.members?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.userId}</td>
                              <td>
                                <img
                                  style={{ borderRadius: "50%" }}
                                  width={30}
                                  height={30}
                                  src={item.avatar}
                                  alt=""
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>
                                {/* <button className="btn btn-danger">X</button> */}
                                <NavLink
                                  onClick={() => {
                                    dispatch(
                                      callDeleteUserProject({
                                        projectId: record.id,
                                        userId: item.userId,
                                      })
                                    );
                                  }}
                                  style={{ color: "red" }}
                                >
                                  <DeleteOutlined />
                                </NavLink>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  );
                }}
              >
                <Avatar key={index} src={member.avatar} />
              </Popover>
            );
          })}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
          <Popover
            className="ml-1"
            placement="rightTop"
            title={"Add user"}
            content={() => {
              return (
                <AutoComplete
                  options={userSearch?.map((user, index) => {
                    return {
                      label: user.name,
                      value: user.userId.toString(),
                    };
                  })}
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                  }}
                  onSelect={(value, option) => {
                    setValue(option.label);
                    dispatch(
                      callAssignUser({
                        projectId: record.id,
                        userId: value,
                      })
                    );
                  }}
                  style={{ width: "100%" }}
                  onSearch={(value) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch(callGetUser(value));
                    }, 300);
                  }}
                />
              );
            }}
            trigger="click"
          >
            <Button style={{ borderRadius: "50%",height:"32px",width:"32px",padding:"0",fontSize:"14px" }}>+</Button>
          </Popover>
        </div>
      );
    },
  },
  {
    title: "Actions",
    key:'action',
   
  
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabProjects() {
  let {projectDataRedux} = useSelector(state=>state.projectReducer);
  console.log("projectDataRedux",projectDataRedux)
  //   if(projectDataRedux == false){
  //     console.log('chay false')
  //     userService
  //     .getProjectList()
  //     .then((result) => {
  //       console.log("project list",result.data.content)
  //       setProjectData(result.data.content)
  //       dispatch(setProjectData(result.data.content))
  //       localStorage.setItem("PROJECTDATA", JSON.stringify(result.data.content));
  //     }).catch((err) => {
  //       console.log("err",err)
  //     });
    
  //   }
  //   else {
  //  return;
  //   }
    
   
  // }, []);
  return (
    <div className="container py-20">
     <div className="mb-3 flex items-start"><h3 className="ant-typography flex-grow">Projects</h3><a className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white font-medium py-1.5 px-3 rounded cursor-pointer" href="/projects/new">Create project</a></div>

      <Table columns={columns} dataSource={projectDataRedux} onChange={onChange} />
    </div>
  );
}
