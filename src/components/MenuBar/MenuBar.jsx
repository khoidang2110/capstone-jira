import React, { useEffect, useState } from "react";
import {
  FolderOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Drawer,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  Slider,
  ConfigProvider,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { projectService } from "../../service/service";
import toast from "react-hot-toast";

const { Option } = Select;

// const onFinish = (values) => {
//   console.log("Success:", values);
// };

const MenuBar = () => {
  const [form] = Form.useForm();
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
 // console.log("USER id", USER.id);
  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  if (projectDataRedux == false) {
    projectDataRedux = [];
  }

  const projectDataReduxById = projectDataRedux.filter(
    (item) => item.creator.id == USER.id
  );

  //console.log("projectDataReduxById", projectDataReduxById);
  const [taskPriority, setTaskPriority] = useState();
  //console.log("task priority state", taskPriority);
  const [taskStatus, setTaskStatus] = useState();
  const [taskType, setTaskType] = useState();
  //console.log("task type", taskType);
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState();
  //console.log("pick product", productSelected);
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    const productSelected = projectDataReduxById.find(
      (item) => item.id == value
    );
    setProductSelected(productSelected);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [totalTime, setTotalTime] = useState(0);
  const onChangeTotalTime = (newValue) => {
    setTotalTime(newValue);
  };
  const [spentTime, setSpentTime] = useState(0);
  const onChangeSpentTime = (newValue) => {
    setSpentTime(newValue);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      "New Task",
      "4",
      <NavLink
        onClick={() => {
          console.log("nhan");
          showDrawer();
        }}
      >
        {" "}
        <FileTextOutlined />
      </NavLink>
    ),

    getItem("Projects", "sub1", <FolderOutlined />, [
      getItem("View all Projects", "1", <NavLink to="/"></NavLink>),
      getItem("New Project", "3", <NavLink to="/newproject"></NavLink>),
    ]),
    getItem(
      "Users",
      "2",
      <NavLink to="/users">
        {" "}
        <TeamOutlined />
      </NavLink>
    ),
  ];
  useEffect(() => {
    projectService
      .getTaskPriority()
      .then((result) => {
        //console.log("project service",result.data.content)
        setTaskPriority(result.data.content);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    projectService
      .getTaskStatus()
      .then((result) => {
        //console.log("project service",result.data.content)
        setTaskStatus(result.data.content);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    projectService
      .getTaskType()
      .then((result) => {
        //console.log("project service",result.data.content)
        setTaskType(result.data.content);
      })
      .catch((err) => {});
  }, []);
  const onFinish = (values) => {
    const data = { ...values, timeTrackingRemaining: totalTime - spentTime };
   console.log("Success:", data);
    projectService
      .createTask(data)
      .then((result) => {
        toast.success("Đăng ký thành công");
        console.log("dk thanh cong", result);
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        toast.error("Đăng ký thất bại");
        console.log("dk thanh cong",err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          paddingTop: "60px",
          // minWidth:"180px"
        }}
      >
        {" "}
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          // onClick={({key})=>{
          //   navigate(key)

          // }}
        />
      </Layout>
      <Drawer
        title="Create Task"
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <ConfigProvider
          theme={{
            //     token:{
            // margin:10
            //     },
            components: {
              Form: {
                itemMarginBottom: 20,
                verticalLabelPadding: 1,
              },
            },
          }}
        >
          <Form
            form={form}
            name="basic"
            // labelCol={{
            //   span: 8,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Project"
              name="projectId"
              help="* You can only create tasks of your own projects!"
            >
              <Select onChange={handleChange}>
                {projectDataReduxById?.map((project, index) => {
                  return (
                    <Option value={project.id} key={index}>
                      {project.projectName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Task name" name="taskName">
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="statusId">
              <Select
              //defaultValue={taskStatus? taskStatus[0].statusName : ""}
              >
                {taskStatus?.map((item, index) => {
                  // return  <Select.Option selected={taskStatus[0].statusName === item.statusName ? true : false} value={item.statusName} key={index}>{item.statusName}</Select.Option>
                  return (
                    <Option value={item.statusId} key={index}>
                      {item.statusName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priorityId"
              rules={[]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Select
              // defaultValue={taskPriority ? taskPriority[0].priority : ""}
              >
                {taskPriority?.map((item, index) => {
                  return (
                    <Option value={item.priorityId} key={index}>
                      {item.priority}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Task Type"
              name="typeId"
              rules={[]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Select
              // defaultValue={taskType ? taskType[0].taskType : ""}
              >
                {taskType?.map((item, index) => {
                  return (
                    <Option
                      value={item.id}
                      //value={parseInt(item.TypeId)}
                      key={index}
                    >
                      {item.taskType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Assigners" name="listUserAsign">
              <Select mode="multiple" placeholder="Please select Assigners">
                {productSelected?.members?.map((member, index) => {
                  return (
                    <Option
                      value={member.userId}
                      //value={JSON.stringify(member)}
                      // value={member.obj}
                      key={index}
                    >
                      {member.name}
                    </Option>
                  );
                })}

                {/* const projectDataReduxById = projectDataRedux.filter(
    (item) => item.creator.id == USER.id
  ); */}
              </Select>
            </Form.Item>
            <p>Time tracker</p>
            <Form.Item
              name="originalEstimate"
              label="Total Estimated Hours"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <InputNumber value={totalTime} onChange={onChangeTotalTime} />
            </Form.Item>
            <Form.Item
              name="timeTrackingSpent"
              label="Hours spent"
              rules={[
                {
                  type: "number",
                  // min: 0,
                  // max:3,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <InputNumber
                value={spentTime}
                onChange={onChangeSpentTime}
                min={0}
                max={totalTime}
              />
            </Form.Item>
            {/* <Form.Item
              name="timeTrackingRemaining"
              label="Time remaining"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <InputNumber  defaultValue={typeof spentTime === "number" ? totalTime-spentTime : 0} />
            </Form.Item> */}

            <Form.Item label="Slider" name="timeTrackingRemaining">
              <Slider
                min={0}
                max={totalTime}
                onChange={onChangeTotalTime}
                value={typeof spentTime === "number" ? spentTime : 0}
              />
              <span className="flex space-x-96 font-medium">
                <p>{spentTime} hour(s)spent</p>
                <p>{totalTime - spentTime} hour(s)remaining</p>
              </span>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#1890ff" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Drawer>
    </div>
  );
};
export default MenuBar;
