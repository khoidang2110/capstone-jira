import React, { useEffect, useState } from "react";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
import { userService, usersManageService } from "../../service/service";
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { usersManageReducer } from "../../redux/reducer/userManage";

function TabProjects() {
  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  console.log("projectDataRedux", projectDataRedux);
  let { usersRedux } = useSelector((state) => state.usersManageReducer);
  console.log(
    "🚀 ~ file: TabProjects.jsx:13 ~ TabProjects ~ usersRedux:",
    usersRedux
  );
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
  let searchUser = (value) => {
    usersManageService
      .getUser(value)
      .then((res) => {
        console.log("🚀 ~ file: TabProjects.jsx:218 ~ .then ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ file: TabProjects.jsx:221 ~ searchUser ~ err:", err);
      });
  };
  // searchUser(2417);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const handleSearch = (value) => {
    // let res = [];
    // if (!value || value.indexOf("@") >= 0) {
    //   res = [];
    // } else {
    //   res = ["gmail.com", "163.com", "qq.com"].map((domain) => ({
    //     value,
    //     label: `${value}@${domain}`,
    //   }));
    // }
    for (let index = 0; index < usersRedux.length; index++) {
      if (value == index[i].name) {
        // res.push(value);
        searchUser(index[i].userId);
      }
    }
    // console.log(res);
    // setOptions(res);
    setOptions(searchUser(index[i].userId));
  };

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

  return (
    <div className="container pt-20 px-5">
      <button>Create Project</button>
      <Table
        columns={columns}
        dataSource={projectDataRedux}
        onChange={onChange}
        scroll={{
          y: 280,
        }}
      />
    </div>
  );
}
export default TabProjects;
