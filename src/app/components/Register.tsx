"use client";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Warning from "../components/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface IUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatedPassword: string;
  dateOfBirth: Date;
  gender: string;
}

const registerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  position: "absolute",
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("2000-01-01");
  const [gender, setGender] = useState("male");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("");

  const closeWarningMessage = () => {
    setWarningMessage("");
  };

  const resetUserStates = (): void => {
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setdateOfBirth("2000-01-01");
    setGender("male");
  };

  const registerUser = () => {
    try {
      checkUserData(
        name,
        surname,
        email,
        password,
        repeatedPassword,
        dateOfBirth,
        gender
      );

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          "http://localhost:3000/users/addUser",
          { name, surname, email, password, dateOfBirth, gender },
          config
        )
        .then((res) => {
          setWarningMessage(res.data.message);
          setWarningType(res.data.type);
          resetUserStates();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserData = (
    name: string,
    surname: string,
    email: string,
    password: string,
    repeatedPassword: string,
    dateOfBirth: string,
    gender: string
  ) => {
    const SpecialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character -
    // TODO not working try diff regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setWarningType("error");

    if (
      !name &&
      !surname &&
      !email &&
      !password &&
      !repeatedPassword &&
      !dateOfBirth &&
      !gender
    ) {
      setWarningMessage("input all fields");
      throw new Error("input all fields");
    }
    if (SpecialCharacters.test(name) || SpecialCharacters.test(surname)) {
      setWarningMessage(
        "special characters are not allowed in name and surname"
      );
      throw new Error("special characters are not allowed in name and surname");
    }
    if (password !== repeatedPassword) {
      setWarningMessage("passwords mismatch");
      throw new Error("passwords mismatch");
    }
    if (!emailRegex.test(email)) {
      setWarningMessage("invalid email address");
      throw new Error("invalid email address");
    }
    // if (!passwordRegex.test(password)) {
    //   setWarningMessage(
    //     "password must consist of at lest 8 characters, including a lowercase letter, an uppercase letter, and a number"
    //   );
    //   throw new Error(
    //     "password must consist of at lest 8 characters, including a lowercase letter, an uppercase letter, and a number"
    //   );
    // }
  };

  return (
    <Box sx={registerStyle}>
      <Box
        sx={{
          height: "auto",
          width: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <Typography sx={{ p: 1 }}>Register</Typography>
            <TextField
              label='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label='Surname'
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
            />
            <TextField
              label='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              label='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              label='Repeat Password'
              type='password'
              onChange={(e) => setRepeatedPassword(e.target.value)}
              value={repeatedPassword}
            />

            <TextField
              onChange={(e) => setdateOfBirth(e.target.value)}
              label='date of birth'
              type='date'
              defaultValue={dateOfBirth}
              sx={{ width: "auto" }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Typography sx={{ p: 1 }}>Gender</Typography>
            <RadioGroup
              sx={{ p: 1 }}
              row
              defaultValue={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {" "}
              <FormControlLabel value='male' control={<Radio />} label='male' />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='female'
              />
            </RadioGroup>

            <Button variant='contained' onClick={registerUser}>
              Signup
            </Button>
            <Box sx={{ mb: 1 }} />
            <Button
              href={"/login"}
              variant='contained'
              startIcon={<ArrowBackIcon />}
            />
            <Box sx={{ mb: 1 }} />
            <Button href={"/"} variant='contained' startIcon={<HomeIcon />}>
              Home
            </Button>
            <Box sx={{ mb: 1 }}></Box>
            {warningMessage && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={!!warningMessage}
              >
                <Alert
                  severity={warningType === "error" ? "error" : "success"}
                  onClose={closeWarningMessage}
                >
                  {warningMessage}
                </Alert>
              </Snackbar>
            )}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
