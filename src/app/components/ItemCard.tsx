import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import IItem from "../Interfaces/IItem";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

export default function ItemCard(props: {
  itemData: IItem;
  image?: any;
  cartItem: string;
  whishListItem: string;
}) {
  const itemData = props.itemData;
  const { cartItem, whishListItem } = props;
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState(itemData._id);
  const [savedToCart, setSavedToCart] = useState(cartItem);
  const [savedToWhishList, setSavedToWhishList] = useState(whishListItem);
  const userId = localStorage.getItem("userId");
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getImage?id=${imageId}`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        const buffer = Buffer.from(res.data, "binary");
        const dataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`;
        setImage(dataUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [imageId]);

  function saveToCart(itemId: string) {
    axios
      .post(
        `http://localhost:3000/items/saveToCart?itemId=${itemId}`,
        {
          userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.message === "Item saved") {
          setSavedToCart("primary");
        } else if (res.data.message === "Item deleted") {
          setSavedToCart("none");
        }
      })
      .catch((error) => {
        console.error("Item was not saved:", error);
      });
  }

  function saveToWhishList(itemId: string) {
    axios
      .post(
        `http://localhost:3000/items/saveToWhishList?itemId=${itemId}`,
        {
          userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.message === "Item saved") {
          setSavedToWhishList("error");
        } else if (res.data.message === "Item deleted") {
          setSavedToWhishList("none");
        }
      })
      .catch((error) => {
        console.error("Item was not saved:", error);
      });
  }

  return (
    <Card sx={{ width: 150, mr: 1 }}>
      <Link href={`/item?itemId=${itemData._id}`}>
        <Image
          key={itemData._id}
          src={image}
          alt='image'
          width={"150"}
          height={"150"}
          style={{ objectFit: "contain" }}
          loading='lazy'
          quality={80}
        />
      </Link>
      <CardContent>
        <Link href={`/item?itemId=${itemData._id}`}>
          <Typography>{itemData.name}</Typography>
        </Link>
        <Typography>{itemData.price} eur</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => saveToWhishList(itemData._id)}>
          <FavoriteIcon
            color={"error" === savedToWhishList ? "error" : "inherit"}
          />
        </IconButton>

        <IconButton onClick={() => saveToCart(itemData._id)}>
          <ShoppingCartIcon
            color={"primary" === savedToCart ? "primary" : "inherit"}
          />
        </IconButton>

        <IconButton>
          <Tooltip title={itemData.description}>
            <InfoIcon />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  );
}
