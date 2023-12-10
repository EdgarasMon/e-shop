import { useEffect, useState } from "react";
import ItemCardInCart from "./ItemCardInCart";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Cart = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";
  const [userCartItemIds, setUserCartItemIds] = useState([]);
  const [modifiedCartItemIds, setModifiedCartItemIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [modifiedPrice, setModifiedPrice] = useState(0);

  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getUserCartItems?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userCartItemIds = res.data.items;
        setUserCartItemIds(userCartItemIds);

        axios
          .get(
            `http://localhost:3000/items/getSpecificItems?userCartItemIds=${userCartItemIds}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setCartItems(res.data.data);
            const totalPri = cartItems.reduce(
              (acc, el: any) => acc + el[0].price,
              0
            );
            setTotalPrice(totalPri);
            setRefetch(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
  }, [refetch]);

  useEffect(() => {
    userCartItemIds.map((id) =>
      axios
        .get(`http://localhost:3000/items/getImage?id=${id}`, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          const buffer = Buffer.from(res.data, "binary");
          const dataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`;
          setImage(dataUrl);
        })
        .catch((error) => {
          // console.error("Error fetching image:", error);
        })
    );
  }, [userCartItemIds]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const aaa = cartItems.map((el) => el[0]._id);
      console.log("////////////////////////////", aaa);
      // setQuantity();
    }
  }, [cartItems]);

  function removeFromCart(itemId: string) {
    console.log("remove id : ", itemId);
    setRefetch(true);
    axios
      .post(
        `http://localhost:3000/items/saveToCart?itemId=${itemId}`,
        {
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        console.error("Item was not saved:", error);
      });
  }

  function increaseQuantity(price: number, id: string) {
    // Create a new array with the added element using the spread operator
    // console.log("-----", userCartItemIds);
    const updatedCartItemIds = [...modifiedCartItemIds, id];

    // Set the state with the new array
    setModifiedCartItemIds(updatedCartItemIds);

    // Log the updated state
    console.log("modifiedCartItemIds", modifiedCartItemIds);
  }

  function decreaseQuantity(price: number, id: string) {
    // if (quantity > 1) {
    // }
  }

  return (
    <>
      <Box>
        <Tooltip title='back'>
          <IconButton href={"/"}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant='h4' m={2}>
        {`Shopping Cart (${userCartItemIds.length})`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "space-between",
          alignItems: "right",
          flexWrap: "wrap",
        }}
      >
        {cartItems &&
          cartItems.map((el: any, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ItemCardInCart cartItem={el} />
              <Box sx={{ m: "-40px" }}>
                <IconButton
                  onClick={() => {
                    decreaseQuantity(el[0].price, el[0]._id);
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                {/* {userCartItemIds.reduce(
                  (count: number, id: string) =>
                    id === el[0]._id ? count + 1 : count,
                  0
                )} */}

                <IconButton
                  onClick={() => {
                    increaseQuantity(el[0].price, el[0]._id);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Tooltip title='remove item'>
                  <IconButton onClick={() => removeFromCart(el[0]._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        {!cartItems && "no items in cart"}
      </Box>

      <Box
        sx={{
          m: 2,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Typography sx={{ fontSize: 20, m: 2 }}>
          total: {modifiedPrice || totalPrice} €
        </Typography>
        <Button variant='contained'>
          Continue to checkout <ArrowForwardIcon />
        </Button>
      </Box>
    </>
  );
};

export default Cart;
