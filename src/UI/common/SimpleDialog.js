import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

const info = ["No Info", "Present", "Absent"];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {info.map((option) => (
          <ListItem
            value={option}
            sx={{
              background:
                option === "No Info"
                  ? "gray"
                  : option === "Absent"
                  ? "red"
                  : "rgb(72, 169, 227)",
              borderRadius: 2,
              width: "90px",
              height: "40px",
              color: "white",
            }}
            disableGutters
            key={option}
          >
            <ListItemButton onClick={() => handleListItemClick(option)}>
              <ListItemText primary={option} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
