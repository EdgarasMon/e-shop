"use client";
import AppBar from "../../app/components/AppBar";
import ItemMenu from "../../app/components/ItemMenu";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import ImageCarousel from "../../app/components/ImageCarousel";

const Home = () => {
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
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", m: 1 }}>
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Home;
