import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Task } from "../models/task.class";

function TaskForm({ add, length }) {
  const initialValues = {
    name: "",
    description: "",
  };

  const taskSchema = Yup.object().shape({
    name: Yup.string()
      .min(10, "task name too short")
      .max(15, "task name too long")
      .required("task name is required"),
    description: Yup.string()
      .min(10, "task description too short")
      .required("task description is required"),
  });

  function addTask(values) {
    const newTask = new Task(values.name, values.description, false);
    add(newTask);
  }
  return (
    <Formik
      validationSchema={taskSchema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        addTask(values);
      }}
      className="d-flex justify-content-center align-items-center mb-4"
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="form-outline flex-fill">
            <Field
              id="name"
              name="name"
              type="text"
              className="form-control form-control-lg"
              required
              autoFocus
              placeholder="Task Name"
            />
          </div>
          {errors.name && touched.name && (
            <div>
              <ErrorMessage name="name" />
            </div>
          )}
          <div className="form-outline flex-fill">
            <Field
              name="description"
              id="description"
              type="text"
              className="form-control form-control-lg"
              required
              placeholder="Task description"
            />
          </div>
          {errors.description && touched.description && (
            <div>
              <ErrorMessage name="description" />
            </div>
          )}
          <button type="submit" className="btn btn-success btn-lg ms-2">
            {length > 0 ? "Add new task" : "Create your first task"}
          </button>
          {isSubmitting ? <p>Seending ...</p> : null}
        </Form>
      )}
    </Formik>
  );
}

TaskForm.Prototypes = {
  add: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default TaskForm;
