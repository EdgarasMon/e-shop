import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import brands from "../../../data/brands.json";
import shoppingTypes from "../../../data/shoppingTypes.json";
import colors from "../../../data/colors.json";

function AddItem() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");
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
    console.log("selectedFile", selectedFile);
  };

  const closeWarningMessage = () => {
    setWarningMessage("");
  };

  const resetUserStates = (): void => {
    setSelectedFile(null);
    setName("");
    setDescription("");
    setSpecification("");
    setPrice("");
    setBrand("");
    setModel("");
    setColor("");
  };

  const addItem = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("specification", specification);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("color", color);

    axios
      .post("http://localhost:3000/items/addItem", formData)
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

  const selectStyle = { m: 1, width: 300 };
  const models = ["S12", "S14", "X10 pro"]; // TODO add json with models

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>photo</TableCell>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>specification</TableCell>
              <TableCell>price</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell sx={{ m: 1, width: 300, height: 300 }}>
              <div>
                <input type='file' onChange={selectImage} />
              </div>
            </TableCell>
            <TableCell>
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </TableCell>
            <TableCell>
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </TableCell>
            <TableCell>
              <TextField
                onChange={(e) => setSpecification(e.target.value)}
                value={specification}
              />
            </TableCell>
            <TableCell>
              <TextField
                sx={{ m: 1, width: 80 }}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </TableCell>
          </TableRow>
        </Table>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>type</TableCell>
              <TableCell>brand</TableCell>
              <TableCell>model</TableCell>
              <TableCell>color</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>
              <FormControl sx={selectStyle}>
                <Select onChange={(e) => setType(e.target.value)} value={type}>
                  {shoppingTypes.shoppingTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl sx={selectStyle}>
                <Select
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                >
                  {brands.brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl sx={selectStyle}>
                <Select
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                >
                  {models.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl sx={{ m: 1, width: 130 }}>
                <Select
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                >
                  {Object.entries(colors).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <Paper
                        elevation={2}
                        sx={{ width: 70, height: 70, backgroundColor: value }}
                      />
                    </MenuItem>
                  ))}
                </Select>{" "}
              </FormControl>
            </TableCell>
          </TableRow>
        </Table>
        <Table>
          <TableCell align='right'>
            <Button onClick={addItem} variant='contained'>
              Add item
            </Button>
          </TableCell>
        </Table>
      </TableContainer>
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
    </>
  );
}

export default AddItem;
