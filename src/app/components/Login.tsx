"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

const msg = {
  success: "succesfully loged in",
};

const loginStyle = {
  display: "flex",
  justifyContent: "center",
};

const Login = () => {
  const router = useRouter();
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

    axios
      .post("http://localhost:3000/users/login", { email, password })
      .then((res) => {
        const { message, type } = res.data;
        setWarningMessage(message ?? "Unknown error");
        setWarningType(type);
        resetUserStates();
        if (message === msg.success) {
          router.push("/");
        }
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={!!warningMessage}
          >
            <Alert
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              severity={warningType}
              warningMessage={warningMessage}
              warningType={warningType}
              onClose={closeWarningMessage}
            >
              {warningMessage}
            </Alert>
          </Snackbar>
        )}
      </FormControl>
    </Box>
  );
};

export default Login;
