import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ItemCardInCart from "./ItemCardInCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as React from "react";
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

const Cart = () => {
  return (
    <>
      <ShoppingCartIcon />
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
            {/* TODO map items */}
            {/* {rows.map((row) => ( */}
            <TableRow
              //   key={name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                <ItemCardInCart />
              </TableCell>
              <TableCell align='right'>10 €</TableCell>

              <TableCell align='right'>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                  2{" "}
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>

        <Table>
          {" "}
          <TableRow>
            <TableCell align='right'>total: 20 €</TableCell>
          </TableRow>
        </Table>
        <Table>
          {" "}
          <TableRow>
            <Button variant='contained'>Continue to checkout</Button>
          </TableRow>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
