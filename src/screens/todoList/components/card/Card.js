import React from "react";
import Button from "../../../../components/Button/Button";
import "./Card.css";

function Card({
  id,
  title,
  completed,
  description,
  subTask,
  handleCheckBox,
  handleTaskDelete,
  priority,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">
          {completed ? <del>{title}</del> : <u>{title}</u>}
        </h3>
        <h5>{priority}</h5>
        <p className="card-text">
          {completed ? <del>{description}</del> : description}
        </p>
        <hr />
        {subTask.map((val) => {
          return (
            <li key={val.sid} className="list-group-item">
              <input
                type="checkbox"
                id="check"
                checked={val.completed}
                onChange={() => handleCheckBox(id, val.sid)}
              />
              <label htmlFor="check">{val.title}</label>
            </li>
          );
        })}
        <br />
        <Button
          type="button"
          handleButtonClick={() => handleTaskDelete(id)}
          name="delete"
          buttonType="DeleteButton"
        />
      </div>
    </div>
  );
}

export default Card;
