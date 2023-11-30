import React, { useState } from "react";
import VirtualList from 'rc-virtual-list';
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
} from "antd";
import { projectService } from "../../service/service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AntDesignOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;
const data = [
  'Racing car ',
  'Japanese princess ',
  'Australian',
  'Man charged .',
  'Los Angeles ',
  'Australian.',
  'Man charged ',
  'Los Angeles .',
];
const ContainerHeight = 250;
export default function ProjectDetail() {

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  // modal thêm user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);

  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  if (projectDataRedux == false) {
    projectDataRedux = [];
  }
let usersRedux = useSelector((state)=>state.usersManageReducer.usersRedux)
console.log("users redux",usersRedux)
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
      console.log(
        "sourceColumn.lstTaskDeTail ",
        sourceColumn.lstTaskDeTail[0].taskId
      );
      console.log("status id ", destination.droppableId);
      let data = {
        taskId: sourceColumn.lstTaskDeTail[0]?.taskId,
        statusId: destination.droppableId * 1 + 1,
      };
      console.log("data", data);
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
  const onAddUserOfProject = (UserId)=>{
    const item = { "projectId": projectDetail.id,
"userId": UserId}
projectService
.addUserFromProject(item)
.then((result) => {
  message.success("thêm thành công");
}).catch((err) => {
  message.error("thêm thất bại");
});
setRandomNumber(Math.random());
SetSearchInput("")
  }
  const onDeleteUserOfProject = (UserId)=>{
console.log("delete id", UserId)
console.log("project id",projectDetail.id)
const item = { "projectId": projectDetail.id,
"userId": UserId}
console.log("item",item)
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
  }

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
  let usersFilter=[]
  if(usersRedux && (projectDetail)){
     usersFilter = usersRedux?.filter(item1 =>!projectDetail.members.some(item2=>item2.userId ===item1.userId));
    console.log("users Filter",usersFilter)
  }
  const [searchInput, SetSearchInput] = useState("");
  console.log("🚀 ~ file: ProjectDetail.jsx:299 ~ searchInput:", searchInput)

    const FilteredData = () => {
        return usersFilter.filter(
            (user) =>
                user.name.toLowerCase().includes(searchInput.toLowerCase()) 
                // ||
                // user.position.toLowerCase().includes(searchInput.toLowerCase()) ||
                // user.gender.toLowerCase().includes(searchInput.toLowerCase()) ||
                // user.office.toLowerCase().includes(searchInput.toLowerCase()) ||
                // user.email.toLowerCase().includes(searchInput.toLowerCase())
        );
    };

  return (
    <div>
      {/* ProjectDetail{id} */}
      <Breadcrumb className="mb-3"
        items={[
          {
            title: <NavLink to="/">Projects</NavLink>,
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
          <div className="" >
            <p className="font-semibold pt-1 pr-2" >
            Members: 
            </p>{" "}
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
                        color:"black"
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                );
              })}
            </Avatar.Group>
            <Tooltip title="Add member" placement="top">
              <Button type="text" className="btnBlue" shape="circle" onClick={showModal}icon= {<PlusOutlined />}>
                
              </Button>
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
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                          color: "black",
                                        }}
                                      >
                                        <div className="flex justify-between">
                                          <div className="ant-col ant-col-18">
                                            <div>{item.taskName}</div>
                                            <div className="flex justify-start items-center">
                                              {item.taskTypeDetail.taskType ==
                                              "bug" ? (
                                                <span>
                                                  <svg
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    className="mr-1"
                                                  >
                                                    <g
                                                      id="Page-1"
                                                      stroke="none"
                                                      strokeWidth={1}
                                                      fill="none"
                                                      fillRule="evenodd"
                                                    >
                                                      <g>
                                                        <g transform="translate(1.000000, 1.000000)">
                                                          <rect
                                                            fill="#E5493A"
                                                            x={0}
                                                            y={0}
                                                            width={14}
                                                            height={14}
                                                            rx={2}
                                                          />
                                                          <path
                                                            d="M10,7 C10,8.657 8.657,10 7,10 C5.343,10 4,8.657 4,7 C4,5.343 5.343,4 7,4 C8.657,4 10,5.343 10,7"
                                                            fill="#FFFFFF"
                                                          />
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>
                                                </span>
                                              ) : (
                                                <span>
                                                  <svg
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    className="mr-1"
                                                  >
                                                    <defs />
                                                    <g
                                                      stroke="none"
                                                      strokeWidth={1}
                                                      fill="none"
                                                      fillRule="evenodd"
                                                    >
                                                      <g>
                                                        <g transform="translate(1.000000, 1.000000)">
                                                          <rect
                                                            id="Rectangle-36"
                                                            fill="#4BADE8"
                                                            x={0}
                                                            y={0}
                                                            width={14}
                                                            height={14}
                                                            rx={2}
                                                          />
                                                          <g
                                                            transform="translate(4.000000, 4.500000)"
                                                            stroke="#FFFFFF"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                          >
                                                            <path
                                                              d="M2,5 L6,0"
                                                              id="Stroke-1"
                                                            />
                                                            <path
                                                              d="M2,5 L0,3"
                                                              id="Stroke-3"
                                                            />
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>
                                                </span>
                                              )}

                                              <span className="text-xs rounded px-1 pb-0.5  border ">
                                                {item.priorityTask.priority}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="ant-col ant-col-6">
                                            <div className="h-full w-full flex justify-end items-end">
                                              <span className="ant-avatar ant-avatar-sm ant-avatar-circle ant-avatar-icon">
                                                <span
                                                  role="img"
                                                  aria-label="user"
                                                  className="anticon anticon-user"
                                                >
                                                  <svg
                                                    viewBox="64 64 896 896"
                                                    focusable="false"
                                                    data-icon="user"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <div className="ant-avatar-group" />
                                            </div>
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
          <Row>
      <Col span={20} className="">
        
     
        <Space.Compact  size="small">
      <Input addonAfter={<SearchOutlined />} placeholder="Search users" 
      value={searchInput}
       onChange={(e) => SetSearchInput(e.target.value)
    
      } />
      
    </Space.Compact></Col>
    </Row>
        <Row>
        <Col span={11}><h5>Not yet added</h5>
        <List
      size="small"

    >
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
           avatar={     <Avatar
          
            style={{
              backgroundColor: "#dddddd",
            }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </Avatar>}
           title={<a href="https://ant.design">{item.name}</a>}
           description={<p>User ID: {item.userId}</p>}
         />
         
            <Button className="btnBlue" type="text" icon= {<PlusOutlined />}  onClick={()=> onAddUserOfProject(item.userId)}></Button>
       </List.Item>
        )}
        </VirtualList>
        </List>
        </Col>
      <Col span={11} offset={2}> <h5>Already in project</h5>
      <List
      size="small"

    >
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
         avatar={     <Avatar
         
          style={{
            backgroundColor: "#dddddd",
          }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </Avatar>}
         title={<a href="https://ant.design">{item.name}</a>}
         description={<p>User ID: {item.userId}</p>}
       />

          <Button type="text" className="btnRed" icon={<DeleteOutlined />} onClick={()=> onDeleteUserOfProject(item.userId)}></Button>
     </List.Item>
        )}
        </VirtualList>
        </List></Col>
        </Row>
   
        
      </Modal>
    </div>
  );
}
