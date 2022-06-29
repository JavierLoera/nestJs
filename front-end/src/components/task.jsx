import React from "react";
import PropTypes from "prop-types";
import { Task } from "../models/task.class";
import "../styles/task.css";

const TaskComponent = ({ task, complete, remove }) => {
  const taskCompleted = {
    color: "gray",
    fontWeight: "bold",
    textDecoration: "line-through",
  };
  const taskPending = {
    fontWeight: "bold",
    color: "tomato",
  };

  return (
    <tr
      className="fw-normal task-pending "
      style={task.state === "ACTIVE" ? taskPending : taskCompleted}
    >
      <th>
        <span className="ms-2">{task.name}</span>
      </th>
      <td>
        <span className="align-middle">{task.description}</span>
      </td>
      <td>
        <span className="align-middle">
          {task.state ? (
            <i
              onClick={() => complete(task)}
              className="bi-toggle-on task-action"
              style={{ color: "green", fontWeight: "bold" }}
            ></i>
          ) : (
            <i
              onClick={() => complete(task)}
              className="bi-toggle-off task-action"
              style={{ color: "gray65", fontWeight: "bold" }}
            ></i>
          )}
        </span>
        <i
          onClick={() => {
            remove(task);
          }}
          className="bi-trash task-action"
          style={{ color: "tomato" }}
        ></i>
      </td>
    </tr>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default TaskComponent;
