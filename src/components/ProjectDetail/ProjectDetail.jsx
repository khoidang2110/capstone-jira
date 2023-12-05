import React, { useState } from "react";
import VirtualList from "rc-virtual-list";
import { NavLink, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Drawer,
  message,
  Select,
  Form,
  ConfigProvider,
  Input,
  InputNumber,
  Slider,
  Avatar,
  Popover,
  Divider,
  Tooltip,
  Modal,
  Row,
  Col,
  List,
  Space,
  Collapse,
} from "antd";
import { projectService } from "../../service/service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  AntDesignOutlined,
  BugOutlined,
  DeleteOutlined,
  PlusOutlined,
  RocketOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};
const { Option } = Select;

const data = [
  "Racing car ",
  "Japanese princess ",
  "Australian",
  "Man charged .",
  "Los Angeles ",
  "Australian.",
  "Man charged ",
  "Los Angeles .",
];
const handleChangeAssigners = (value) => {
  console.log(`selected ${value}`);
};
const ContainerHeight = 250;
export default function ProjectDetail() {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  // modal thêm user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    //form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeTaskEdit = (value) => {
    console.log(`selected ${value}`);
  };
  //modal task update
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
  const [taskData, setTaskData] = useState({});
  console.log("task data", taskData);
  const showModalTask = (id) => {
    setIsModalTaskOpen(true);
    console.log("task id click", id);
    projectService
      .getTaskDetail(id)
      .then((result) => {
        setTaskData(result.data.content);
      })
      .catch((err) => {
        console.log("err task detail", err);
      });
  };

  const handleCancelTask = () => {
    setIsModalTaskOpen(false);
  
  };

  const [form] = Form.useForm();
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);

  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  if (projectDataRedux == false) {
    projectDataRedux = [];
  }
  let usersRedux = useSelector((state) => state.usersManageReducer.usersRedux);
  console.log("users redux", usersRedux);
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
        setTaskStatus(result.data.content);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    projectService
      .getTaskType()
      .then((result) => {
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
        message.success("Đăng ký thành công");
        console.log("dk thanh cong", result);
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        message.error("Đăng ký thất bại");
        console.log("dk thanh cong", err);
      });
    setRandomNumber(Math.random());
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.lstTaskDeTail];
      // item đang chọn

      const destItems = [...destColumn.lstTaskDeTail];
      //destColumn.lstTaskDeTail item của collum đang chọn
      //console.log("destColumn.lstTaskDeTail",destColumn.lstTaskDeTail)
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          lstTaskDeTail: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          lstTaskDeTail: destItems,
        },
      });

      // console.log("remove",removed)
      // console.log("status id ", destination.droppableId);
      let data = {
        taskId: removed.taskId,
        statusId: destination.droppableId * 1 + 1,
      };
      // console.log("data", data);
      projectService
        .updateStatus(data)
        .then((result) => {
          message.success("cập nhật thành công");
          setRandomNumber(Math.random());
        })
        .catch((err) => {
          // message.error("cập nhật thất bại");
        });

      //console.log("sourceItems",sourceItems)
      //console.log("drop end ",destItems)
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.lstTaskDeTail];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          lstTaskDeTail: copiedItems,
        },
      });
      console.log("drop end same column");
      setRandomNumber(Math.random());
    }
  };
  const onAddUserOfProject = (UserId) => {
    const item = { projectId: projectDetail.id, userId: UserId };
    projectService
      .addUserFromProject(item)
      .then((result) => {
        message.success("thêm thành công");
      })
      .catch((err) => {
        message.error("thêm thất bại");
      });
    setRandomNumber(Math.random());
    SetSearchInput("");
  };
  const onDeleteUserOfProject = (UserId) => {
    console.log("delete id", UserId);
    console.log("project id", projectDetail.id);
    const item = { projectId: projectDetail.id, userId: UserId };
    console.log("item", item);
    projectService
      .removeUserFromProject(item)
      .then((result) => {
        message.success("xoá thành công");
        //console.log("dk thanh cong", result);
      })
      .catch((err) => {
        message.error("xoá thất bại");
        // console.log("dk thanh cong", err);
      });
    setRandomNumber(Math.random());
  };

  //console.log("random number", randomNumber);
  //lấy tên project
  let { id } = useParams();
  //const [columns, setColumns] = useState(taskStatus);
  // if(projectDetail!==false){
  //   const columns = projectDetail.lstTask
  // }

  // console.log("columns",columns)

  const [columns, setColumns] = useState(false);
  console.log("🚀 ~ file: ProjectDetail.jsx:87 ~ columns:", columns);

  const [randomNumber, setRandomNumber] = useState("11");
  const [projectDetail, setProjectDetail] = useState(false);
  console.log(
    "🚀 ~ file: ProjectDetail.jsx:84 ~ projectDetail:",
    projectDetail
  );
  // lấy data project detail
  useEffect(() => {
    console.log("lay projectdetail lan dau");
    projectService
      .getProjectDetail(id)
      .then((result) => {
        // console.log("project detail", result.data.content);
        setProjectDetail(result.data.content);
        setColumns(result.data.content.lstTask);
      })

      .catch((err) => {});
  }, []);
  // lấy data project detail khi cập nhật status
  useEffect(() => {
    projectService
      .getProjectDetail(id)
      .then((result) => {
        // console.log("project detail", result.data.content);
        setProjectDetail(result.data.content);
        setColumns(result.data.content.lstTask);
        console.log("lay data luc update status");
      })
      .catch((err) => {});
  }, [randomNumber]);
  let usersFilter = [];
  if (usersRedux && projectDetail) {
    usersFilter = usersRedux?.filter(
      (item1) =>
        !projectDetail.members.some((item2) => item2.userId === item1.userId)
    );
    console.log("users Filter", usersFilter);
  }
  const [searchInput, SetSearchInput] = useState("");
  console.log("🚀 ~ file: ProjectDetail.jsx:299 ~ searchInput:", searchInput);

  const FilteredData = () => {
    return usersFilter.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            title: <NavLink to="/">Projects Management</NavLink>,
          },
          {
            title: projectDetail?.projectName,
          },
        ]}
      />
      <div>
        <div className="flex ">
          <Button
            type="text"
            className="mr-10  btnAddTask ml-3"
            style={{ backgroundColor: "#001529", color: "white" }}
            onClick={() => {
              showDrawer();
            }}
          >
            Create Task
          </Button>
          <div className="">
            <p className="font-semibold pt-1 pr-2">Members:</p>{" "}
          </div>

          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="click"
            size="medium"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
          >
            {projectDetail?.members?.map((item, index) => {
              return (
                <Tooltip title={item.name} placement="top">
                  <Avatar
                    key={index}
                    style={{
                      backgroundColor: "#dddddd",
                      color: "#AE8EBB",
                    }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
          <Tooltip title="Add member" placement="top">
            <Button
              type="text"
              className="btnBlue"
              shape="circle"
              onClick={showModal}
              icon={<PlusOutlined />}
            ></Button>
          </Tooltip>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "100%",
            paddingTop: "20px",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns)?.map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: "#f3f4f6",
                              padding: 4,
                              width: 230,
                              minHeight: 100,
                              borderRadius: "6px",
                            }}
                            className="shadow-md hover:shadow-2xl"
                          >
                            <h2
                              style={{
                                margin: "5px 5px 8px 5px",
                                fontWeight: "600",
                                fontSize: ".75rem",
                                lineHeight: "1rem",
                                padding: "0.125rem 0.5rem 0.125rem 0.5rem",
                                borderRadius: "4px",
                              }}
                              className={column.statusName}
                            >
                              {column.statusName}
                            </h2>
                            {/* {column.items.map((item, index) => { */}
                            {column.lstTaskDeTail?.map((item, index) => {
                              return (
                                <Draggable
                                  key={String(item.taskId)}
                                  draggableId={String(item.taskId)}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 7,
                                          margin: "5px 5px 8px 5px",
                                          minHeight: "50px",
                                          backgroundColor: "#ffffff",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                          borderRadius: "4px",

                                          color: "black",
                                        }}
                                        className="shadow-md"
                                      >
                                        <div
                                          className="flex justify-between"
                                          onClick={() =>
                                            showModalTask(item.taskId)
                                          }
                                        >
                                          <div className="ant-col ant-col-18">
                                            <div className="iconBlue text-lg">
                                              {item.taskName}
                                            </div>
                                            <div className="flex justify-start items-center mt-2">
                                              <div className=" mr-2 h-5">
                                                {item.taskTypeDetail.taskType ==
                                                "bug" ? (
                                                  <Tooltip
                                                    title="Bug"
                                                    placement="top"
                                                  >
                                                    <BugOutlined className="iconBrown" />
                                                  </Tooltip>
                                                ) : (
                                                  <Tooltip
                                                    title="New Task"
                                                    placement="top"
                                                  >
                                                    <RocketOutlined className="iconBrown" />
                                                  </Tooltip>
                                                )}
                                              </div>

                                              <span
                                                className={
                                                  item.priorityTask.priority
                                                }
                                              >
                                                {item.priorityTask.priority}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="ant-col ant-col-6 pt-3">
                                            <Avatar.Group
                                              maxCount={3}
                                              maxPopoverTrigger="click"
                                              size="medium"
                                              maxStyle={{
                                                color: "#f56a00",
                                                backgroundColor: "#fde3cf",
                                                cursor: "pointer",
                                              }}
                                            >
                                              {item.assigness?.map(
                                                (item1, index) => {
                                                  return (
                                                    <Tooltip
                                                      title={item1.alias}
                                                      placement="top"
                                                    >
                                                      <Avatar
                                                        key={index}
                                                        style={{
                                                          backgroundColor:
                                                            "#dddddd",
                                                          color: "#AE8EBB",
                                                        }}
                                                      >
                                                        {item1.alias
                                                          .slice(0, 2)
                                                          .toUpperCase()}
                                                      </Avatar>
                                                    </Tooltip>
                                                  );
                                                }
                                              )}
                                            </Avatar.Group>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>

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

              // help="* You can only create tasks of your own projects!"
            >
              <Select
                onChange={handleChange}
                defaultValue={{
                  value: projectDetail.projectName,
                }}
                disabled
              >
                {/* {projectDataReduxById?.map((project, index) => { */}

                <Option
                  value={projectDetail.projectName}
                  key={projectDetail.id}
                >
                  {projectDetail.projectName}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="Task name" name="taskName">
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="statusId">
              <Select
                defaultValue={{
                  value: taskStatus ? taskStatus[0].statusName : "",
                }}
              >
                {taskStatus?.map((item, index) => {
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
                defaultValue={{
                  value: taskPriority ? taskPriority[0].priority : "",
                }}
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
                defaultValue={{
                  value: taskType ? taskType[0].taskType : "",
                }}
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
                {projectDetail?.members?.map((member, index) => {
                  return (
                    <Option value={member.userId} key={index}>
                      {member.name}
                    </Option>
                  );
                })}
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
                className=" btnBlue"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Drawer>
      <Modal
        title="Add members to project"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={600}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <Divider />
        <Row>
          <Col span={20} className="pb-3 pl-3">
            <Space.Compact size="small">
              <Input
                addonAfter={<SearchOutlined />}
                placeholder="Search users"
                value={searchInput}
                onChange={(e) => SetSearchInput(e.target.value)}
              />
            </Space.Compact>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <h5 className="font-medium pb-2 pl-3">Not yet added</h5>
            <List size="small">
              <VirtualList
                data={FilteredData()}
                height={ContainerHeight}
                itemHeight={30}
                itemKey="assigner"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#dddddd",
                          }}
                        >
                          {item.name.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={<p>User ID: {item.userId}</p>}
                    />

                    <Button
                      className="btnBlue"
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={() => onAddUserOfProject(item.userId)}
                    ></Button>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
          <Col span={11} offset={2}>
            {" "}
            <h5 className="font-medium pb-2 pl-3">Already in project</h5>
            <List size="small">
              <VirtualList
                data={projectDetail.members}
                height={ContainerHeight}
                itemHeight={20}
                itemKey="assigner"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#dddddd",
                          }}
                        >
                          {item.name.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={<p>User ID: {item.userId}</p>}
                    />

                    <Button
                      type="text"
                      className="btnRed"
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteUserOfProject(item.userId)}
                    ></Button>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
        </Row>
      </Modal>
      <Modal
       destroyOnClose={true}
      // afterClose={() => form.resetFields()}
        // title="Task update"
        title={
          <Row className="flex justify-between">
            <div>
              <Select
                defaultValue={{
                  value: taskData?.taskTypeDetail?.id,
                   label: taskData?.taskTypeDetail?.taskType,
                }}
                style={{
                  width: 120,
                }}
                onChange={handleChangeTaskEdit}
                options={[
                  {
                    value: 2,
                    label: "new task",
                  },
                  {
                    value: 1,
                    label: "bug",
                  },
                ]}
              />
              {<BugOutlined /> && <RocketOutlined />}
            </div>

           
            <Button type="link" danger className="pr-5">
              <DeleteOutlined />
            </Button>
          </Row>
        }
        open={isModalTaskOpen}
        onCancel={handleCancelTask}
        footer={[]}
        width={800}
      >
       
        <Row>
          <Col span={12}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input defaultValue={taskData.taskName} />
              <Button type="text">Submit</Button>
            </Space.Compact>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <TextArea
                showCount
                maxLength={100}
                onChange={onChange}
                placeholder="can resize"
                defaultValue={taskData.description}
              />
              <Button type="text">Submit</Button>
            </Space.Compact>
            <p>Comments</p>
            <TextArea
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="can resize"
            />
            <Button type="text">Submit</Button>
            comment list
          </Col>
          <Col span={10} offset={2}>
            <Select
              defaultValue={{
                value: taskData.Id,
                // label: 'Lucy (101)',
              }}
              style={{
                width: 120,
              }}
              onChange={handleChangeTaskEdit}
              options={[
                {
                  value: 2,
                  label: "new task",
                },
                {
                  value: 1,
                  label: "bug",
                },
              ]}
            />
            <Collapse
              size="small"
              items={[
                {
                  key: "1",
                  label: "Details",
                  children: (
                    <div>
                      <Row className="justify-between">
                        {" "}
                        <p> Assignees</p>{" "}
                        <Select
                          style={{
                            width: 80,
                          }}
                          mode="multiple"
                          placeholder="Please select Assigners"
                          onChange={handleChangeAssigners}
                        >
                          {projectDetail?.members?.map((member, index) => {
                            return (
                              <Option value={member.userId} key={index}>
                                {member.name}
                              </Option>
                            );
                          })}
                        </Select>{" "}
                      </Row>
                      <br />

                      <Row className="justify-between">
                        {" "}
                        <p>Priority</p>{" "}
                        <Select
                          defaultValue="lucy"
                          style={{
                            width: 120,
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: "jack",
                              label: "Jack",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "Yiminghe",
                              label: "yiminghe",
                            },
                            {
                              value: "disabled",
                              label: "Disabled",
                              disabled: true,
                            },
                          ]}
                        />
                      </Row>

                      <br />
                      <Row className="justify-between">
                        <p>Estimate </p>
                        <p>0m</p>
                      </Row>
                      <br />

                      <p>Time tracking</p>
                    </div>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      
      
      </Modal>
    </div>
  );
}
