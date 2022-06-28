import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginFormik() {
  const initialCredentials = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div>
      <h4>Login </h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email"></Field>
            {errors.email && touched.email && (
              <div>
                <ErrorMessage name="email" />
              </div>
            )}
            <label htmlFor="password">Password</label>
            <Field id="password" type="password" name="password"></Field>
            {errors.password && touched.password && (
              <div>
                <ErrorMessage name="password" />
              </div>
            )}
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginFormik;
