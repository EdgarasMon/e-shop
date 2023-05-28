"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Box from "@mui/material/Box";
import Warning from "../components/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const loginStyle = {
  display: "flex",
  justifyContent: "center",
  // html: { height: "100%" },
  // body: {
  //   minHeight: "100%",
  // },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("");

  const closeWarningMessage = () => {
    setWarningMessage("");
  };

  const loginUser = () => {
    if (!email || !password) {
      setWarningMessage("please provide email and password");
      setWarningType("error");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST",
        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Max-Age": 86400,
      },
    };

    axios
      .post("http://localhost:3000/users/login", { email, password }, config)
      .then((res) => {
        const { message, type } = res.data;
        setWarningMessage(message ?? "Unknown error");
        setWarningType(type);
        resetUserStates();
      })
      .catch((error) => {
        console.error(error);
        setWarningMessage(error);
        setWarningType("error");
      });
  };

  const resetUserStates = (): void => {
    setEmail("");
    setPassword("");
  };

  return (
    <Box sx={loginStyle}>
      <FormControl>
        <TextField onChange={(e) => setEmail(e.target.value)} label='E-mail' />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          type='password'
        />
        <Box sx={{ mb: 1 }}></Box>

        <Button onClick={loginUser} variant='contained'>
          Login
        </Button>
        <Box sx={{ mb: 1 }}></Box>
        <Button href={"register"} variant='contained'>
          Register
        </Button>
        <Box sx={{ mb: 1 }}></Box>
        <Button href={"home"} variant='contained' startIcon={<ArrowBackIcon />}>
          Back
        </Button>
        <Box sx={{ mb: 1 }}></Box>
        <Box sx={{ p: 1 }} />
        {warningMessage && (
          <Warning
            warningMessage={warningMessage}
            warningType={warningType}
            closeWarning={closeWarningMessage}
          />
        )}
      </FormControl>
    </Box>
  );
};

export default Login;
