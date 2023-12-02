import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  ConfigProvider,
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
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render:(text) => <p style={{color:"#252935"}}>{text}</p>,
      width: 80,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",

      render: (text, record, index) => {
        return (
          <Tag color="purple">
 <NavLink to={`/projectdetail/${record.id}`} style={{color:"#531dab", fontSize:"14px"}}>
            {text}
          </NavLink>
          </Tag>
         
        );
      },
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      render:(text) => <p style={{color:"#252935"}}>{text}</p>,
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Creator",
      key: "creator",
      render: (text, record, index) => {
        return <div style={{color:"#252935"}} >{record.creator?.name}</div>;
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
             <Avatar.Group
                maxCount={3}
                maxPopoverTrigger="click"
                size="medium"
                maxStyle={{
                  color: "white",
                  backgroundColor: "#A2987A",
                  cursor: "pointer",
                }}
              >
            {record.members?.map((member, index) => {
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
                             
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >

                  {/* <Avatar key={index} src={member.avatar}     /> */}
                  <Avatar style={{
        backgroundColor: '#B7BCCC',
      }}>{member.name.slice(0, 2).toUpperCase()}</Avatar>
                </Popover>
               
              );
            })}
         
            
            </Avatar.Group>
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
             
              trigger="click"
            >
     
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <Button className="btnBlue" type="text" icon= {<EditOutlined />}></Button>
          <Button type="text" className="btnRed" icon={<DeleteOutlined />}></Button>
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
  const [toggleData, setToggleData] = useState([]);
  console.log("toggleData",toggleData)

  useEffect(() => {
   // console.log("chạy ueff")
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
      <ConfigProvider
 
    theme={{
      token: {
        /* here is your global tokens */
        colorPrimary:"#001529",
        color:"red"
      },
    }}
 
>
<Switch
     className="switch"
     style={{ marginBottom: "25px"  }}
     checkedChildren="Your Project"
     unCheckedChildren="All Project"
     defaultChecked
     onChange={onChangeSwitch}
   />
 
</ConfigProvider>
   

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
