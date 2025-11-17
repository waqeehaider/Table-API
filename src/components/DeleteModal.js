import * as React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function DeleteModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Are you sure you want to delete this record?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
