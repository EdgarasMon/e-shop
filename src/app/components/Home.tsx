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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [items, setItems] = useState([]);
  const [itemsLenght, setItemsLenght] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allItemIds, setAllItemIds] = useState("");
  const [paginatedIds, setPaginatedIds] = useState("");
  const [userCartItems, setUserCartItems] = useState("");
  const [userWhishListItems, setUserWhishListItems] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/items/getItems", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const newItems = res.data.data;
        setItems(newItems);
        setItemsLenght(newItems.length);
        setAllItemIds(newItems.map((el: any) => el._id));
        setPages(Math.ceil(newItems.length / 5));
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [token]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);

    // Calculate the range of items to be displayed
    const itemsPerPage = 5;
    const lastIndexItem = newPage * itemsPerPage - 1;
    const firstIndexItem = lastIndexItem - (itemsPerPage - 1);

    // Use slice to get the IDs of the items to display
    const paginatedItemIds = allItemIds.slice(
      firstIndexItem,
      lastIndexItem + 1
    );

    setPaginatedIds(paginatedItemIds);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getUserCartItems?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserCartItems(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
  }, [token, userId]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/items/getUserWishListItems?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setUserWhishListItems(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching user whish items:", error);
      });
  }, [token, userId]);

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
            ? items.map((item: IItem) =>
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
            : items?.map((item: IItem) => (
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
