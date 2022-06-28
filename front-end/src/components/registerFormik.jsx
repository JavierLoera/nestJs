import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function RegisterFormik() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username too short")
      .max(12, "Username too long")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password too short"),
    confirm: Yup.string()
      .when("password", {
        is: (value) => (value && value.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
      })
      .required("You must confirm the password"),
  });

  const submit = (values) => {
    alert(`Register User`);
  };

  return (
    <div>
      <h4>Register form</h4>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
            />
            {errors.username && touched.username && (
              <div>
                <ErrorMessage name="username" />
              </div>
            )}
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Example@email.com"
            />
            {errors.email && touched.email && (
              <div>
                <ErrorMessage name="email" />
              </div>
            )}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
            ></Field>
            {errors.password && touched.password && (
              <div>
                <ErrorMessage name="password" />
              </div>
            )}

            <label htmlFor="confirm">Confirm</label>
            <Field
              id="confirm"
              type="password"
              name="confirm"
              placeholder="Confirm password"
            ></Field>
            {errors.confirm && touched.confirm && (
              <div>
                <ErrorMessage name="confirm" />
              </div>
            )}
            <button type="submit">Register</button>
            {isSubmitting ? <p>Seending your credentials...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterFormik;
