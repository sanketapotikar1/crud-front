import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { adddata } from "./context/ContextProvider";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const Navigate = useNavigate();

  const addinpdata = async (newdata) => {
    const res = await fetch("https://crud-backend-fct5.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      Navigate("/");
      setUdata(data);
      console.log("data added");
    }
  };

  const formvalidationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter the your name")
      .min(3, " Please give bigger name"),
    email: yup
      .string()
      .min(8, "email is too short")
      .max(25, "too long")
      .required("Required"),
    age: yup
      .number()
      .required("Please enter your name")
      .min(18, "Age should be above 18")
      .max(150, "please enter valid age"),
    mobile: yup
      .string()
      .required("Please enter your mobile number")
      .min(10, "Please enter 10 digit phone number")
      .max(10, "Please enter 10 digit phone number"),
    work: yup
      .string()
      .required("Please fill about your work")
      .min(5, "please enter this info with more details"),
    add: yup
      .string()
      .required("Please enter your address")
      .min(3, "please enter your address in more detail")
      .max(50, "please keep your address short"),
    desc: yup
      .string()
      .required("please enter this decription")
      .min(15, "Please enter this description with more details")
      .max(250, "Please keep your description short"),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (newdata) => {
        console.log("onSubmit", newdata);
        addinpdata(newdata);
      },
    });

  return (
    <form onSubmit={handleSubmit} className="Add-data-form">
      <TextField
        label="Name"
        variant="filled"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.name && errors.name ? errors.name : ""}
        error={touched.name && errors.name ? true : false}
      />

      <TextField
        label="Email"
        variant="filled"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.email && errors.email ? errors.email : ""}
        error={touched.email && errors.email ? true : false}
      />

      <TextField
        label="Age"
        variant="filled"
        name="age"
        value={values.age}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.age && errors.age ? errors.age : ""}
        error={touched.age && errors.age ? true : false}
      />

      <TextField
        label="Mobile"
        variant="filled"
        name="mobile"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.mobile && errors.mobile ? errors.mobile : ""}
        error={touched.mobile && errors.mobile ? true : false}
      />

      <TextField
        label="Work details"
        variant="filled"
        name="work"
        value={values.work}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.work && errors.work ? errors.work : ""}
        error={touched.work && errors.work ? true : false}
      />

      <TextField
        label="Address"
        variant="filled"
        name="add"
        value={values.add}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.add && errors.add ? errors.add : ""}
        error={touched.add && errors.add ? true : false}
      />

      <TextField
        multiline
        rows={4}
        label="Description"
        variant="filled"
        name="desc"
        value={values.desc}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.desc && errors.desc ? errors.desc : ""}
        error={touched.desc && errors.desc ? true : false}
      />

      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};
export default Register;
