import { useEffect, useState } from "react";
import ItemCardInCart from "./ItemCardInCart";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";

const Cart = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";
  const [userCartItemIds, setUserCartItemIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
          });
      })
      // .then(() => {
      //   const totalPri = cartItems.reduce((acc, el) => acc + el[0].price);
      //   console.log("-------------------------", totalPri);
      //   setTotalPrice(totalPri);
      // })

      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
  }, [token, userId]);

  function removeFromCart(itemId: string) {
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
      .then((res) => {
        if (res.data.message === "Item deleted") {
          // need to refect items
        }
      })
      .catch((error) => {
        console.error("Item was not saved:", error);
      });
  }

  function increaseQuantity(price: number) {
    setQuantity(quantity + 1);
    setTotalPrice(quantity * price + totalPrice);
  }

  function decreaseQuantity(price: number) {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // setTotalPrice((quantity * price) + totalPrice)
    }
  }

  useEffect(() => {
    if (cartItems) {
      const totalPri = cartItems.reduce((acc, el: any) => acc + el[0].price, 0);
      console.log("totalPri", totalPri);
      setTotalPrice(totalPri);
    }
  }, [cartItems, totalPrice]);

  return (
    <>
      <Button href={"/"} variant='contained' startIcon={<ArrowBackIcon />}>
        Back
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ height: 200 }}>
          <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell align='right'>price</TableCell>
              <TableCell align='right'>quantity</TableCell>
            </TableRow>
          </TableHead>

          {cartItems &&
            cartItems.map((el: any, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell key={index} align='right'>
                    <ItemCardInCart cartItem={el} />
                  </TableCell>
                  <TableCell align='right'>{el[0].price * quantity}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      onClick={() => {
                        decreaseQuantity(el[0].price);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {quantity}
                    <IconButton
                      onClick={() => {
                        increaseQuantity(el[0].price);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <Tooltip title='remove item'>
                      <IconButton onClick={() => removeFromCart(el[0]._id)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>

        <Table>
          <TableCell align='right'>
            <Typography>total: {totalPrice} €</Typography>
          </TableCell>
          <TableRow>
            <TableCell align='right'>
              <Button variant='contained'>Continue to checkout</Button>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
