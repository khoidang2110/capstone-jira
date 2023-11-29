import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  Popover,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { userService } from "../../service/service";
import { NavLink } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

  const columns = [
    {
      title: "Id",
      dataIndex: "id",

      width: 80,
    },
    {
      title: "Project name",
      dataIndex: "projectName",

      render: (text, record, index) => {
        return (
          <NavLink to={`/projectdetail/${record.id}`} className="text-blue-700">
            {text}
          </NavLink>
        );
      },
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

      width: 100,
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
              placement="rightBottom"
              title={"Add user"}
              content={() => {
                return (
                  <div>
                    {""}
                    <AutoComplete
                      style={{
                        width: 200,
                      }}
                      onSearch={(value) => {
                        console.log(value);
                        searchUser(value);
                      }}
                      placeholder="Search User"
                      options={usersRedux?.map((user, index) => {
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
                      }}
                    />
                  </div>
                );
              }}
              // content={() => {
              //   return (
              //     <AutoComplete
              //       options={userSearch?.map((user, index) => {
              //         return {
              //           label: user.name,
              //           value: user.userId.toString(),
              //         };
              //       })}
              //       value={value}
              //       onChange={(value) => {
              //         setValue(value);
              //       }}
              //       onSelect={(value, option) => {
              //         setValue(option.label);
              //         dispatch(
              //           callAssignUser({
              //             projectId: record.id,
              //             userId: value,
              //           })
              //         );
              //       }}
              //       style={{ width: "100%" }}
              //       onSearch={(value) => {
              //         // if (searchRef.current) {
              //         //   clearTimeout(searchRef.current);
              //         // }
              //         // searchRef.current = setTimeout(() => {
              //         //   dispatch(callGetUser(value));
              //         // }, 300);
              //         userSearch(value);
              //       }}
              //     />
              //   );
              // }}
              trigger="click"
            >
              <Button
                style={{
                  borderRadius: "50%",
                  height: "32px",
                  width: "32px",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                +
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "action",

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
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
 
  let {projectDataRedux} = useSelector(state=>state.projectReducer);
  console.log("projectDataRedux",projectDataRedux)
  const [projectDataReduxById, setProjectDataReduxById] = useState([])
  const [toggleData, setToggleData] = useState(false);
  console.log("toggleData",toggleData)

  useEffect(() => {
    if(projectDataRedux) {
      const projectDataReduxById = projectDataRedux.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataReduxById(projectDataReduxById)
      setToggleData(projectDataReduxById);
    }
  },[projectDataRedux])
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);

    if (checked == true) {
      setToggleData(projectDataReduxById);
    } else if (checked == false) {
      setToggleData(projectDataRedux);
    }
  };

 
  return (
    <div className="">
      <Switch
        style={{ marginBottom: "25px" }}
        checkedChildren="Your Project"
        unCheckedChildren="All Project"
        defaultChecked
        onChange={onChangeSwitch}
      />

      <Table
        columns={columns}
        dataSource={toggleData}
        onChange={onChange}
        scroll={{
          y: 280,
        }}
      />
    </div>
  );
}
