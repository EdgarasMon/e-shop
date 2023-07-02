"use client";
import { useEffect, useState } from "react";
import AppBar from "../../app/components/AppBar";
import ItemMenu from "../../app/components/ItemMenu";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import ImageCarousel from "../../app/components/ImageCarousel";
import ImageCarousel2 from "../../app/components/ImageCarousel2";
import Footer from "../../app/components/Footer";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/items/getItems").then((res) => {
      console.log("res.data", res.data.data);
      setItems(res.data.data);
    });
  }, []);

  console.log("items", items);

  return (
    <>
      <AppBar />
      <Box
        sx={{
          width: 1500,
          justifyItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <ItemMenu />
          <Box>
            <Box>
              <ImageCarousel />
              {/* <ImageCarousel2 /> */}
              {/* problems with carousell nr */}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
              {" "}
              <Pagination count={10} color='primary' />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", m: 1 }}>
              {items &&
                items.map((item) => (
                  <ItemCard key={item._id || "undefined"} itemData={item} />
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
              {" "}
              <Pagination count={10} color='primary' />
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
export default Home;
