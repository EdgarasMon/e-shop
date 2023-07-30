"use client";
import "../../../styles/footer.css";
import { useEffect, useState } from "react";
import AppBar from "../../app/components/AppBar";
import ItemMenu from "../../app/components/ItemMenu";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import ImageCarousel from "./ImageCarousel";
import Footer from "../../app/components/Footer";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import IItem from "../../app/Interfaces/IItem";

const Home = () => {
  const [items, setItems] = useState<IItem[]>();
  const [itemsLenght, setItemsLenght] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allItemIds, setAllItemIds] = useState([""]);
  const [paginatedIds, setPaginatedIds] = useState(null);

  const [userCartItems, setUserCartItems] = useState([]);
  const [userWhishListItems, setUserWhishListItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get("http://localhost:3000/items/getItems").then((res) => {
      setItemsLenght(res.data.data.length);
      setAllItemIds(items?.map((el) => el._id));
      setPages(Math.ceil(itemsLenght / 5));
      setItems(res.data.data);
    });
  }, [itemsLenght]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    const lastIndexItem = newPage * 5 - 1;
    const firstIndexItem = lastIndexItem - 4;
    setPaginatedIds(allItemIds?.slice(firstIndexItem, lastIndexItem + 1));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getUserCartItems?userId=${userId}`)
      .then((res) => {
        setUserCartItems(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getUserWishListItems?userId=${userId}`)
      .then((res) => {
        setUserWhishListItems(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching user whish items:", error);
      });
  }, []);

  return (
    <>
      <AppBar />
      <Box sx={{ display: "flex", m: 1 }}>
        <ItemMenu />
        <ImageCarousel />
      </Box>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", m: 2 }}>
          {paginatedIds
            ? items?.map((item) =>
                paginatedIds.includes(item._id) ? (
                  <ItemCard
                    key={item._id}
                    itemData={item}
                    cartItem={
                      userCartItems.includes(item._id) ? "primary" : "none"
                    }
                    whishListItem={
                      userWhishListItems.includes(item._id) ? "error" : "none"
                    }
                  />
                ) : null
              )
            : items?.map((item) => (
                <ItemCard
                  key={item._id}
                  itemData={item}
                  cartItem={
                    userCartItems.includes(item._id) ? "primary" : "none"
                  }
                  whishListItem={
                    userWhishListItems.includes(item._id) ? "error" : "none"
                  }
                />
              ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
          <Pagination
            count={pages}
            color='primary'
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};
export default Home;
