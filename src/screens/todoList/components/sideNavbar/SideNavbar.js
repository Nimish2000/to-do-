import React from "react";
import Modal from "react-modal";
import Select from "react-select";
import Button from "../../../../components/Button/Button";
import "./SideNavbar.css";

function SideNavbar({
  isEnable,
  enableSideBar,
  handleAddTask,
  taskTitle,
  handleTaskTitle,
  descriptionName,
  handleDescriptionName,
  subTasks,
  errors,
  handleSubTaskName,
  handleAddSubTask,
  modalIsOpen,
  handleModal,
  closeModal,
  priorityName = "low",
  handlePriorityChange,
  handleFilterChange,
}) {
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  return (
    <>
      <div className="sideNavbar">
        <div className="navbar-title">
          <span
            onClick={enableSideBar}
            className="material-icons"
            style={{ fontSize: "32px" }}
          >
            close
          </span>
          <h3>Tekion to-do</h3>
        </div>
        <div className="navbar-content">
          <button
            className="btn-sidenavbar"
            type="button"
            value="tasks"
            onClick={handleFilterChange}
          >
            <span className="material-icons">home</span>
            All tasks
          </button>
          <button
            value="high"
            className="btn-sidenavbar"
            type="button"
            onClick={handleFilterChange}
          >
            <span className="material-icons">star_rate</span>
            High Priority
          </button>
          <button
            className="btn-sidenavbar"
            type="button"
            onClick={handleFilterChange}
            value="medium"
          >
            <span className="material-icons">star_half</span>
            Medium Priority
          </button>
          <button
            className="btn-sidenavbar"
            type="button"
            value="low"
            onClick={handleFilterChange}
          >
            <span className="material-icons">star_rate</span>
            Low Priority
          </button>
          <button
            className="btn-sidenavbar"
            type="button"
            onClick={handleModal}
          >
            <span className="material-icons">add_circle</span>
            Add Task
          </button>
        </div>
      </div>

      <Modal
        style={{
          content: {
            height: "50%",
            width: "50%",
            margin: "auto",
            borderStyle: "solid",
            borderColor: "grey",
            borderRadius: "5px",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <form className="text-box" onSubmit={handleAddTask}>
          <div className="modal-content">
            <div className="modal-select">
              <input
                type="text"
                className="input-text"
                placeholder="Enter title"
                value={taskTitle}
                onChange={handleTaskTitle}
              ></input>
              <Select
                className="selector"
                options={options}
                defaultValue={priorityName}
                onChange={handlePriorityChange}
              />
            </div>
            <textarea
              className="description"
              placeholder="Enter description"
              value={descriptionName}
              onChange={handleDescriptionName}
              rows="8"
            ></textarea>
            {subTasks.map((item, index) => {
              return (
                <div className="subtask" key={item.sid}>
                  <input
                    className="subtask-input"
                    type="text"
                    id={item.sid || "0"}
                    placeholder={
                      errors[index]
                        ? "Please fill this field or delete it"
                        : `Enter Sub-task ${index + 1}`
                    }
                    style={errors[index] ? { border: "2.2px solid red" } : {}}
                    onChange={handleSubTaskName}
                  />
                  <span class="material-icons">remove_circle</span>
                </div>
              );
            })}
          </div>
          <div className="modal-footer">
            <button type="submit" className="">
              Add-Task
            </button>
            <button type="button" onClick={handleAddSubTask} className="">
              Sub-task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SideNavbar;
