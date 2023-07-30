import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

export default function ItemMenu() {
  const [showCategories, setShowCategories] = React.useState(false);
  return (
    <Paper sx={{ width: "10%", height: 400, mt: 1, boxShadow: "none" }}>
      <IconButton
        onClick={() => setShowCategories(true)}
        onMouseEnter={() => setShowCategories(true)}
      >
        <MenuItem>
          <MenuIcon />
        </MenuItem>
      </IconButton>
      {showCategories && (
        <MenuList
          dense
          onClick={() => setShowCategories(false)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <Divider />
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <Divider />
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
          <MenuItem>Item category</MenuItem>
        </MenuList>
      )}
      {/* jei daugiau bus dėti i scrola */}
    </Paper>
  );
}
