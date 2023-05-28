import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

export default function Item(props: { itemId: string | string[] }) {
  const { itemId } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 500, mr: 2 }}>
          this is item page {itemId}
          <CardMedia
            component='img'
            height='194'
            image='https://images.unsplash.com/photo-1522770179533-24471fcdba45'
            alt='image'
          />
          <CardContent>
            <Typography>
              Stacionarus kompiuteris Intop RM18236NS AMD Ryzen™ 5 3600, Nvidia
              GeForce RTX 3060, 32 GB, 1480 GB
            </Typography>
            <Typography>10 €</Typography>
          </CardContent>
        </Box>
        <Typography sx={{ width: 500 }}>
          Gaminio savybės Bendrosios charakteristikos Prekės tipas Stacionarūs
          kompiuteriai Prekės ženklas Intop Serija RM18236NS Kompiuterio tipas
          Žaidimams Įdiegta operacinė sistema DOS Procesorius ir pagrindinė
          plokštė Procesoriaus tipas AMD Procesoriaus klasė AMD Ryzen 5
          Procesoriaus modelis AMD Ryzen™ 5 3600 Procesoriaus branduoliai 6
          Procesoriaus dažnis 3.6 GHz Procesoriaus maksimalus dažnis 4.2 GHz
          Operatyvioji atmintis Operatyviosios atminties tipas DDR4 Operatyvioji
          atmintis (RAM) 32 GB Maksimalus operatyviosios atminties kiekis (RAM)
          64 GB Laisvų operatyviosios atminties lizdų kiekis 2
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant='contained' startIcon={<ShoppingCartIcon />}>
          Shop
        </Button>
        <Button variant='contained' startIcon={<FavoriteBorderIcon />}>
          Like
        </Button>
      </Box>
    </>
  );
}
