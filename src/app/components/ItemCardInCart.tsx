import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import IItem from "../Interfaces/IItem";
import axios from "axios";

export default function ItemCard(props: { cartItem: IItem[] }) {
  const { cartItem } = props;
  const [item, setItem] = useState(cartItem);
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/getImage?id=${item[0]._id}`, {
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
  }, [cartItem, item]);

  return (
    <Box sx={{ display: "flex" }}>
      <Card sx={{ width: 150, m: 1 }}>
        <Link href={`/item?itemId=${item[0]._id}`}>
          <CardMedia
            component='img'
            height='194'
            image={image}
            src='/images/not-found.webp'
            alt='image'
          />
        </Link>
        {item.map((el: IItem) => (
          <CardContent key={el._id} sx={{ m: 0, p: 0 }}>
            <Link href={`/item?itemId=${el._id}`}>
              <Typography>{el.name}</Typography>
            </Link>
            <Typography>{el.price} €</Typography>
          </CardContent>
        ))}
      </Card>
    </Box>
  );
}
