import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Popover,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import { projectService, userService } from "../../service/service";
import { NavLink } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabProjects() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [project, setProject] = useState("");
  const [category, setCategory] = useState();
  console.log(
    "🚀 ~ file: TabProjects.jsx:35 ~ TabProjects ~ category:",
    category
  );
  console.log(
    "🚀 ~ file: TabProjects.jsx:33 ~ TabProjects ~ project:",
    project.creator?.name
  );

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        console.log("🚀 ~ file: TabProjects.jsx:41 ~ .then ~ res:", res);
        setCategory(res.data.content);
      })
      .catch((err) => {});
  }, []);
  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
  };
  const onClose = () => {
    console.log("dong drawer");
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("🚀 ~ file: TabProjects.jsx:60 ~ onFinish ~ values:", values);
    let dataUpdate = {
      id: values.id,
      projectName: values.projectName,
      creator: data.id,
      description: values.description,
      categoryId: values.category,
    };
    projectService
      .updateProject(dataUpdate)
      .then((res) => {
        message.success("Edit thành công");
      })
      .catch((err) => {
        console.log("🚀 ~ file: TabProjects.jsx:77 ~ onFinish ~ err:", err);

        message.error("Edit thất bại");
      });
    console.log(
      "🚀 ~ file: TabProjects.jsx:70 ~ onFinish ~ dataUpdate:",
      dataUpdate
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  let data = JSON.parse(localStorage.getItem("USER"));

  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  console.log("projectDataRedux", projectDataRedux);
  const [projectDataReduxById, setProjectDataReduxById] = useState([]);
  const [toggleData, setToggleData] = useState([]);

  useEffect(() => {
    console.log("chạy ueff");
    if (projectDataRedux) {
      const projectDataReduxById = projectDataRedux.filter(
        (item) => item.creator.id == USER.id
      );
      setProjectDataReduxById(projectDataReduxById);
      setToggleData(projectDataReduxById);
    }
  }, [projectDataRedux]);

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);

    if (checked == true) {
      setToggleData(projectDataReduxById);
    } else if (checked == false) {
      setToggleData(projectDataRedux);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <p style={{ color: "#252935" }}>{text}</p>,
      width: 80,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",

      render: (text, record, index) => {
        return (
          <Tag color="purple">
            <NavLink
              to={`/projectdetail/${record.id}`}
              style={{ color: "#531dab", fontSize: "14px" }}
            >
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
      render: (text) => <p style={{ color: "#252935" }}>{text}</p>,
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Creator",
      key: "creator",
      render: (text, record, index) => {
        return <div style={{ color: "#252935" }}>{record.creator?.name}</div>;
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
                    <Avatar
                      style={{
                        backgroundColor: "#B7BCCC",
                      }}
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </Avatar>
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
            ></Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <Button
                className="btnBlue"
                // type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  projectService
                    .getProjectDetail(record.id)
                    .then((res) => {
                      setProject(res.data.content);
                      showDrawer();
                    })
                    .catch((err) => {
                      console.log("jsx:257 ~ TabProjects ~ err:", err);
                    });
                }}
              ></Button>
              <Button
                type="text"
                className="btnRed"
                icon={<DeleteOutlined />}
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#001529",
            color: "red",
          },
          components: {
            Form: {
              itemMarginBottom: 20,
              verticalLabelPadding: 1,
            },
          },
        }}
      >
        <Switch
          className="switch"
          style={{ marginBottom: "25px" }}
          checkedChildren="Your Project"
          unCheckedChildren="All Project"
          defaultChecked
          onChange={onChangeSwitch}
        />

        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={() => {
            onClose();
          }}
          open={open}
        >
          <Form
            form={form}
            name="basic"
            style={
              {
                // maxWidth: 600,
              }
            }
            initialValues={{
              id: project?.id,
              projectName: project?.projectName,
              categoryId: project.projectCategory?.id,
              description: project?.description,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="id"
              label="id"
              style={{
                borderColor: "black",
                borderStyle: "dashed",
                width: "300px",
                height: "50px",
              }}
              rules={[]}
            >
              <Input defaultValue={project?.id} disabled={true} />
            </Form.Item>

            <Form.Item
              name="projectName"
              label="project Name"
              style={{
                borderColor: "black",
                borderStyle: "dashed",
                width: "300px",
                height: "50px",
              }}
              rules={[]}
              //    defaultValue={{
              //   id: project?.id,
              //   projectName: project?.projectName,
              // }}
            >
              <Input
                defaultValue={project?.projectName}
                // onChange={(e) => setProject(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="category" label="Project category" rules={[]}>
              <Select
                style={{
                  borderColor: "black",
                  borderStyle: "dashed",
                  height: "50px",
                }}
                defaultValue={project.projectCategory?.name}
              >
                {category?.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.projectCategoryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[]}>
              <Input.TextArea
                rows={4}
                style={{
                  borderColor: "black",
                  borderStyle: "dashed",
                  height: "350px",
                }}
                defaultValue={project?.description}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="px-3 mx-2 "
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#1890ff",
                  borderRadius: "30px",
                  minWidth: "100px",
                  height: "50px",
                }}
              >
                Submit
              </Button>
              <Button
                className="px-3 mx-2 "
                type="text"
                onClick={() => {
                  window.location.href = "/";
                }}
                style={{
                  backgroundColor: "#808080",
                  borderRadius: "30px",
                  color: "white",
                  minWidth: "100px",
                  height: "50px",
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
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
