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
import Paper from "@mui/material/Paper";

const msg = {
  success: "succesfully loged in",
};

const loginStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  position: "absolute",
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("info");

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
        const { _id, name, surname, token, role } = res.data;
        localStorage.setItem("name", name);
        localStorage.setItem("surname", surname);
        localStorage.setItem("userId", _id);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
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
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <FormControl>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='E-mail'
          />
          <TextField
            value={password}
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
          <Button
            href={"/"}
            variant='contained'
            startIcon={<ArrowBackIcon />}
          />
          <Box></Box>
          <Box />
          {warningMessage && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={!!warningMessage}
            >
              <Alert
                severity={"error" === warningType ? "error" : "success"}
                onClose={closeWarningMessage}
              >
                {warningMessage}
              </Alert>
            </Snackbar>
          )}
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Login;
