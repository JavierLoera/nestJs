import React,{useState,useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {apis} from '../apis/fetch'
import {login} from "../store/userslice"
import {useDispatch} from "react-redux"


function LoginFormik() {
  const [returnlogin,setReturnLogin]=useState({})
  const initialCredentials = {
    email: "",
    password: "",
  };
const dispatch= useDispatch()
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleclick=()=>{
    dispatch(login(returnlogin))
  }

  return (
  
    <div>
      <h4>Login </h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          apis.login(values).then((values)=>setReturnLogin(values)).catch(setReturnLogin(values))
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
      <button onClick={handleclick()}></button>
    </div>
  );
}

export default LoginFormik;
