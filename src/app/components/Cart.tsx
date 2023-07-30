import { useEffect, useState } from "react";
import ItemCardInCart from "./ItemCardInCart";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userCartItems, setUserCartItems] = useState([]);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getUserCartItems?userId=${userId}`)
      .then((res) => {
        setUserCartItems(res.data.items);
        console.log("userCartItems: ", userCartItems);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
  }, []);

  useEffect(() => {
    userCartItems.map((el) =>
      axios.get(`http://localhost:3000/items/getItem?id=${el}`).then((res) => {
        setCartItem(res.data.data);
        console.log("///", res.data.data);
      })
    );
  }, [cartItem]);

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
          <TableBody>
            <TableRow>
              <TableCell align='right'>
                <ItemCardInCart cartItem={cartItem} />
              </TableCell>
              <TableCell align='right'>price</TableCell>
              <TableCell align='right'>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                2
                <IconButton>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableCell align='right'>
            <Typography>total: 20 €</Typography>
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
