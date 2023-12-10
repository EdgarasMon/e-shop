import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import brands from "../../../data/brands.json";
import shoppingTypes from "../../../data/shoppingTypes.json";
import colors from "../../../data/colors.json";
import { Box, IconButton, InputLabel, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddItem() {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("");

  // const uploadFile = async (e: any) => {
  //   try {
  //     setSelectedFile(e.target.files[0]);
  //     console.log("selectedFile", selectedFile);
  //     const formData = new FormData();
  //     formData.append("image", selectedFile);

  //     const response = await axios.post(
  //       "http://localhost:3000/items/addImage",
  //       formData
  //     );
  //     console.log("File uploaded successfully:", response.data);
  //   } catch (error) {
  //     console.error("Failed to upload file:", error);
  //   }
  // };

  const selectImage = (e: any) => {
    setSelectedFile(e.target.files[0]); // TODO not always sets image at first try find out why and fix
    console.log("selected file: ", selectedFile);
  };

  const closeWarningMessage = () => {
    setWarningMessage("");
  };

  const resetUserStates = (): void => {
    setSelectedFile(null);
    setName("");
    setDescription("");
    setSpecification("");
    setPrice(0);
    setBrand("");
    setModel("");
    setColor("");
  };

  const addItem = async () => {
    const formData = new FormData();
    if (typeof price !== "number") return alert("price should be number");
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("specification", specification);
    formData.append("price", String(price));
    formData.append("type", type);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("color", color);

    axios
      .post("http://localhost:3000/items/addItem", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { message, type } = res.data;
        setWarningMessage(message ?? "Unknown error");
        setWarningType(type);
        type === "success" && resetUserStates();
      })
      .catch((error) => {
        console.error(error);
        setWarningMessage(error);
        setWarningType("error");
      });
  };

  const selectStyle = { m: 1, width: 300 };
  // TODO add json with models
  const models = ["S12", "S14", "X10 pro"];

  return (
    <>
      <Box>
        <Tooltip title='back'>
          <IconButton href={"/"}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Box>
          <TextField sx={selectStyle} type='file' onChange={selectImage} />
          <TextField
            sx={selectStyle}
            label='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            sx={selectStyle}
            label='description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextField
            sx={selectStyle}
            label='specification'
            onChange={(e) => setSpecification(e.target.value)}
            value={specification}
          />
          <TextField
            sx={selectStyle}
            label='price'
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            value={price}
          />
        </Box>

        <Box>
          <FormControl sx={selectStyle}>
            <InputLabel>type</InputLabel>
            <Select onChange={(e) => setType(e.target.value)} value={type}>
              {shoppingTypes.shoppingTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={selectStyle}>
            <InputLabel>brand</InputLabel>
            <Select onChange={(e) => setBrand(e.target.value)} value={brand}>
              {brands.brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={selectStyle}>
            <InputLabel>model</InputLabel>
            <Select onChange={(e) => setModel(e.target.value)} value={model}>
              {models.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={selectStyle}>
            <InputLabel>color</InputLabel>
            <Select onChange={(e) => setColor(e.target.value)} value={color}>
              {Object.entries(colors).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <Paper
                    elevation={2}
                    sx={{ width: 70, height: 70, backgroundColor: value }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={selectStyle} onClick={addItem} variant='contained'>
            Add item
          </Button>
        </Box>

        {warningMessage && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!warningMessage}
          >
            <Alert
              severity={"success" === warningType ? "success" : "error"}
              onClose={closeWarningMessage}
            >
              {warningMessage}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
}

export default AddItem;
