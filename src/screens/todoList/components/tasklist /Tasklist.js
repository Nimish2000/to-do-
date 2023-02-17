import React from "react";
import { useState } from "react";
import uuid from "react-uuid";
import remove from "lodash/remove";
import reject from "lodash/reject";
import SideNavbar from "../sideNavbar";
import Button from "../../../../components/Button/Button";
import Card from "../card";
import "./Tasklist.css";

function Tasklist({ isEnable, enableSideBar }) {
  // state variable defined to adapt to change

  const [taskTitle, setTaskTitle] = useState("");
  const [descriptionName, setDescriptionName] = useState("");
  const [priorityName, setPriorityName] = useState("low");
  const [subTasks, setSubTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [errors, setErros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTask, setFilterTask] = useState("tasks");

  // functions to handle various changes

  const handleTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionName = (event) => {
    setDescriptionName(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriorityName(event.value);
  };

  const handleFilterChange = (event) => {
    setFilterTask(event.target.value);
  };

  const handleSubTaskName = (event) => {
    var index = event.target.id;

    setSubTasks(
      subTasks.map((obj) => {
        if (obj.sid === index) {
          return { ...obj, title: event.target.value };
        } else {
          return obj;
        }
      })
    );
  };

  const handleAddSubTask = () => {
    if (!taskTitle) {
      return alert("Title cannot be empty !!");
    }

    const newSubTask = {
      sid: uuid(),
      title: "",
      completed: false,
    };
    setSubTasks([...subTasks, newSubTask]);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!taskTitle) {
      return alert("Please enter title name");
    }

    console.log("in add task");

    var hasError = false;

    subTasks.map((obj, index) => {
      if (obj.title === "") {
        hasError = true;
        setErros([...errors], (errors[index] = true));
      } else {
        setErros([...errors], (errors[index] = false));
      }
    });
    console.log(errors);
    if (hasError) return;
    const filteredSubTask = reject(subTasks, function (n) {
      return n.title === "";
    });

    const newTask = {
      id: uuid(),
      priority: priorityName,
      title: taskTitle,
      description: descriptionName,
      subTask: filteredSubTask,
      completed: false,
    };

    console.log(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setErros([]);
    setIsModalOpen(false);
    setTaskTitle("");
    setDescriptionName("");
    setSubTasks([]);
  };

  const handleCheckBox = (taskId, subTaskId) => {
    var index = subTaskId;
    var cnt = 0;
    var taskIndex;

    tasks.map((item, i) => {
      if (taskId === item.id) {
        taskIndex = i;
      }
    });

    const updatedSubTasks = tasks[taskIndex].subTask.map((obj) => {
      if (obj.sid === index) {
        var tmp = obj.completed;
        return { ...obj, completed: !tmp };
      } else {
        return obj;
      }
    });
    updatedSubTasks.map((obj) => {
      if (obj.completed) {
        cnt++;
      }
    });
    if (cnt === tasks[taskIndex].subTask.length) {
      setTasks((prevTasks) =>
        prevTasks.map((obj) =>
          obj.id !== taskId
            ? obj
            : { ...obj, completed: true, subTask: updatedSubTasks }
        )
      );
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((obj) =>
          obj.id !== taskId
            ? obj
            : { ...obj, completed: false, subTask: updatedSubTasks }
        )
      );
    }
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = [...tasks];

    setTasks(
      remove(updatedTasks, function (n) {
        return n.id !== taskId;
      })
    );
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showTasks = () => {
    console.log(tasks);
  };

  return (
    <div className="mainScreen">
      {isEnable && (
        <SideNavbar
          enableSideBar={enableSideBar}
          isEnable={isEnable}
          handleAddSubTask={handleAddSubTask}
          descriptionName={descriptionName}
          errors={errors}
          handleAddTask={handleAddTask}
          handleDescriptionName={handleDescriptionName}
          taskTitle={taskTitle}
          handleTaskTitle={handleTaskTitle}
          subTasks={subTasks}
          handleSubTaskName={handleSubTaskName}
          modalIsOpen={isModalOpen}
          handleModal={modalOpen}
          closeModal={closeModal}
          priorityName={priorityName}
          setPriorityName={setPriorityName}
          handlePriorityChange={handlePriorityChange}
          handleFilterChange={handleFilterChange}
        />
      )}
      <div className="right-screen">
        {tasks.map((item) => {
          return (
            <Card
              completed={item.completed}
              description={item.description}
              handleCheckBox={handleCheckBox}
              handleTaskDelete={handleTaskDelete}
              id={item.id}
              title={item.title}
              priority={item.priority}
              subTask={item.subTask}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Tasklist;
