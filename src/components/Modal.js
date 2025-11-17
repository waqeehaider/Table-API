import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function BasicModal({
  open,
  onClose,
  editData,
  onSave,
  nextId,
}) {
  const [openInternal, setOpenInternal] = useState(false);
  console.log("openInternal:", openInternal);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // If modal is being controlled externally (for edit)
  const isControlled = open !== undefined;
  console.log("isControlled:", isControlled);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    id: nextId || "",
    city: "",
  });

  // Prefill for edit or initialize with nextId for add
  React.useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else if (nextId) {
      setFormData({
        name: "",
        age: "",
        id: nextId,
        city: "",
      });
    }
  }, [editData, nextId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    // ✅ Convert age to string before trimming
    if (!String(formData.age).trim()) newErrors.age = "Age is required";

    if (!formData.city.trim()) newErrors.city = "City is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSave) {
      await onSave(formData);
    }

    // Reset form and close modal
    setFormData({
      name: "",
      age: "",
      id: nextId || "",
      city: "",
    });
    setErrors({});
    setIsSaving(false);

    if (isControlled) {
      if (onClose) onClose();
    } else {
      setOpenInternal(false);
    }
  };

  // Internal modal control
  const handleOpen = () => setOpenInternal(true);
  const handleCloseInternal = () => setOpenInternal(false);
  const isOpen = isControlled ? open : openInternal;
  console.log("isOpen:", isOpen);
  const handleCloseFinal = isControlled ? onClose : handleCloseInternal;

  return (
    <div className="add-button">
      {!isControlled && (
        <>
          <h1>Add Employees Here</h1>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              height: "40px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddIcon />
          </Button>
        </>
      )}

      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleCloseFinal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <div className="text-field-modal">
            <h2>Name:</h2>
            <TextField
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              sx={{ width: "260px" }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>

          <hr />
          <div className="text-field-modal">
            <h2>Age:</h2>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              sx={{ width: "260px" }}
              error={!!errors.age}
              helperText={errors.age}
            />
          </div>

          <div className="text-field-modal">
            <h2>City:</h2>
            <TextField
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              sx={{ width: "260px" }}
              error={!!errors.city}
              helperText={errors.city}
            />
          </div>

          <hr />
          <div className="modal-button-div">
            <button
              className="modal-addBtn"
              onClick={handleSubmit}
              disabled={isSaving}
              style={{
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
            >
              {editData ? "Save Changes" : "Add"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
