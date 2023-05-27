"use client";
import AppBar from "../../app/components/AppBar";
import ItemMenu from "../../app/components/ItemMenu";
import Item from "../../app/components/Item";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <>
      <AppBar />
      <Box sx={{ display: "flex" }}>
        <ItemMenu />
        <Box sx={{ display: "flex", flexWrap: "wrap", m: 1 }}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Box>
      </Box>
    </>
  );
};
export default Home;
