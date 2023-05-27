import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

export default function ItemMenu() {
  return (
    <Paper sx={{ width: 320, mt: 1 }}>
      <MenuList dense>
        <MenuItem>
          <ListItemText inset>Shop categories</ListItemText>
        </MenuItem>
        <MenuItem>Item category</MenuItem>
        <MenuItem>Item category</MenuItem>
        <MenuItem>Item category</MenuItem>
        <MenuItem>Item category</MenuItem>
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
        <MenuItem>Item category</MenuItem>
      </MenuList>
    </Paper>
  );
}
