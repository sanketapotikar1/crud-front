import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const { updata, setUPdata } = useContext(updatedata);

  const Navigate = useNavigate("");

  const { id } = useParams("");
  console.log(id);

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

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getdata = async () => {
    const res = await fetch(
      `https://crud-backend-fct5.onrender.com/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("data recived");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, age } = inpval;

    const res2 = await fetch(
      `https://crud-backend-fct5.onrender.com/updateuser/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          work,
          add,
          mobile,
          desc,
          age,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      Navigate("/");
      setUPdata(data2);
    }
  };

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
        updateuser(newdata);
      },
    });

  return (
    <form className="Add-data-form">
      <TextField
        label="Name"
        name="name"
        variant="filled"
        value={inpval.name}
        onChange={setdata}
      />

      <TextField
        label="Email"
        name="email"
        variant="filled"
        value={inpval.email}
        onChange={setdata}
      />

      <TextField
        label="Age"
        name="age"
        variant="filled"
        value={inpval.age}
        onChange={setdata}
      />

      <TextField
        label="Mobile"
        name="mobile"
        variant="filled"
        value={inpval.mobile}
        onChange={setdata}
      />

      <TextField
        label="Work details"
        name="work"
        variant="filled"
        value={inpval.work}
        onChange={setdata}
      />

      <TextField
        label="Address"
        name="add"
        variant="filled"
        value={inpval.add}
        onChange={setdata}
      />

      <TextField
        multiline
        rows={4}
        label="Description"
        name="desc"
        variant="filled"
        value={inpval.desc}
        onChange={setdata}
      />

      <Button
        onClick={updateuser}
        type="submit"
        variant="contained"
        color="success"
      >
        Upadte
      </Button>
    </form>
  );
};

export default Edit;
