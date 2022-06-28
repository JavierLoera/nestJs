import React, { useState, useEffect } from "react";
import TaskForm from "./taskForm";
import TaskComponent from "./task";

function TaskListComponent(props) {
  //cargar tasks aqui
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //llamada a api
    setLoading(false);
  }, [tasks]);

  function completeTask(task) {
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks[index].completed = !tempTasks[index].completed;
    setTasks(tempTasks);
  }

  function deleteTask(task) {
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }

  function addTask(task) {
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
  }

  const loadingStyle = {
    color: "gray",
    fontSize: "30px",
    fontWeight: "bold",
  };

  const Table = () => {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Nommbre</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <TaskComponent
                key={index}
                task={task}
                complete={completeTask}
                remove={deleteTask}
              ></TaskComponent>
            );
          })}
        </tbody>
      </table>
    );
  };

  let tasksTable;
  if (tasks.length > 0) {
    tasksTable = <Table></Table>;
  } else {
    tasksTable = (
      <div>
        <h3>There are no tasks</h3>
        <h4>Create one</h4>
      </div>
    );
  }
  return (
    <div>
      <div className="col-12">
        <div className="card">
          <div className="card-header text-center">
            <h5>Your tasks:</h5>
          </div>
          <div
            className="card-body"
            data-mdb-perfect-scrollbar="true"
            style={{ position: "relative", height: "400px" }}
          >
            {loading ? <p style={loadingStyle}>Loading tasks</p> : tasksTable}
          </div>
          <TaskForm add={addTask} length={tasks.length}></TaskForm>
        </div>
      </div>
    </div>
  );
}

export default TaskListComponent;
