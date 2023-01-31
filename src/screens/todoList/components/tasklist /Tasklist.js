import React from "react";
import { useState } from "react";
import uuid from "react-uuid";
import remove from "lodash/remove";
import "./Tasklist.css";

function Tasklist() {
  // state variable defined to adapt to change

  const [taskTitle, setTaskTitle] = useState("");
  const [descriptionName, setDescriptionName] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  // functions to handle various changes

  const handleTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionName = (event) => {
    setDescriptionName(event.target.value);
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

    const newTask = {
      id: uuid(),
      title: taskTitle,
      description: descriptionName,
      subTask: subTasks,
      completed: false,
    };

    setTasks([...tasks, newTask]);
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

  const deleteSubTask = () => {};

  const showTask = () => {
    console.log(tasks);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = [...tasks];

    setTasks(
      remove(updatedTasks, function (n) {
        return n.id !== taskId;
      })
    );
  };

  return (
    <>
      <form className="text-box" onSubmit={handleAddTask}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter title"
            value={taskTitle}
            onChange={handleTaskTitle}
          ></input>
        </div>
        <div className="form-group">
          <textarea
            className="form-control my-3"
            placeholder="Enter description"
            value={descriptionName}
            onChange={handleDescriptionName}
            rows="5"
          ></textarea>
        </div>
        {subTasks.map((item) => {
          return (
            <input
              key={item.sid}
              type="text"
              id={item.sid || "0"}
              placeholder="Enter sub-task"
              onChange={handleSubTaskName}
            />
          );
        })}

        <button type="submit" className="btn btn-primary">
          Add-Task
        </button>
        <button
          type="button"
          onClick={handleAddSubTask}
          className="btn btn-primary"
        >
          Sub-task
        </button>
        {/* 
        <button type="button" onClick={showTask} className="btn btn-primary">
          show tasks
        </button> */}
      </form>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {tasks.map((item) => (
          <div className="col" key={item.id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="left-card-body">
                  {item.completed ? (
                    <h5 className="card-title" style={{ color: "black" }}>
                      <del>{item.title}</del>
                    </h5>
                  ) : (
                    <h5 className="card-title" style={{ color: "black" }}>
                      <u>{item.title}</u>
                    </h5>
                  )}
                  {item.completed ? (
                    <p className="card-text" style={{ color: "black" }}>
                      <del>{item.description}</del>
                    </p>
                  ) : (
                    <p className="card-text" style={{ color: "black" }}>
                      {item.description}
                    </p>
                  )}
                  <ul className="list-group list-group-flush">
                    {item.subTask.map((val) => {
                      return (
                        <li key={val.sid} className="list-group-item">
                          <input
                            type="checkbox"
                            id="check"
                            checked={val.completed}
                            onChange={() => handleCheckBox(item.id, val.sid)}
                          />
                          <label htmlFor="check" style={{ color: "black" }}>
                            {val.title}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <br />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleTaskDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tasklist;
