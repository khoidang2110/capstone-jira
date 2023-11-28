import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { projectService } from "../../service/service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const taskStatus = {
  requested: {
    name: "BLACKLOG",
    items: tasks,
    bgColor: "e5e7eb",
  },
  toDo: {
    name: "SELECTED FOR DEVELOPMENT",
    items: [],
    bgColor: "c7d2fe",
  },
  inProgress: {
    name: "IN PROGRESS",
    items: [],
    bgColor: "bfdbfe",
  },
  done: {
    name: "DONE",
    items: [],
    bgColor: "a7f3d0",
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.lstTaskDeTail];
    const destItems = [...destColumn.lstTaskDeTail];
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
  }
};
export default function ProjectDetail() {
  //lấy tên project
  let { id } = useParams();
  //const [columns, setColumns] = useState(taskStatus);
  // if(projectDetail!==false){
  //   const columns = projectDetail.lstTask
  // }

  // console.log("columns",columns)
  const [projectDetail, setProjectDetail] = useState([]);
  console.log(
    "🚀 ~ file: ProjectDetail.jsx:84 ~ projectDetail:",
    projectDetail
  );
  const [columns, setColumns] = useState(false);
  console.log("🚀 ~ file: ProjectDetail.jsx:87 ~ columns:", columns);

  const [stt1, setStt1] = useState([]);
  console.log("🚀 ~ file: ProjectDetail.jsx:92 ~ stt1:", stt1);

  const [stt2, setStt2] = useState([]);
  console.log("🚀 ~ file: ProjectDetail.jsx:93 ~ ProjectDetail ~ stt2:", stt2);

  const [stt3, setStt3] = useState([]);
  console.log("🚀 ~ file: ProjectDetail.jsx:98 ~ stt3:", stt3);
  const [stt4, setStt4] = useState([]);
  console.log("🚀 ~ file: ProjectDetail.jsx:100 ~ stt4:", stt4);

  // if(columns){

  // }

  // useEffect(() => {

  // }, [columns]);
  // lấy data project detail
  useEffect(() => {
    projectService
      .getProjectDetail(id)
      .then((result) => {
        // console.log("project detail", result.data.content);
        setProjectDetail(result.data.content);
        setColumns(result.data.content.lstTask);
      })
      .then((res) => {
        setStt1(columns[0]?.lstTaskDeTail);
        setStt2(columns[1]?.lstTaskDeTail);
        setStt3(columns[2]?.lstTaskDeTail);
        setStt4(columns[3]?.lstTaskDeTail);
      })
      .catch((err) => {});
  }, []);
  // useEffect(() => {

  //   return cleanUp = () => {

  //   }
  // }, []);
  return (
    <div className="container pt-20 px-5">
      {/* ProjectDetail{id} */}
      <Breadcrumb
        items={[
          {
            title: <NavLink to="/">Projects</NavLink>,
          },
          {
            title: projectDetail?.projectName,
          },
        ]}
      />
      {/* board */}
      <div>
        <div className="flex">
          <h1
            style={{
              // textAlign: "center",
              paddingTop: "20px",
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            Board
          </h1>
          <button>add</button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            paddingTop: "50px",
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
      {/* <BoardComponent projectDetail = {projectDetail} /> */}
    </div>
  );
}
