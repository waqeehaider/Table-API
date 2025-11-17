import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userServices";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BasicTable() {
  const [rows, setRows] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Fetch users from service
  useEffect(() => {
    getUsers().then((response) => {
      setRows(response.data);
    });
  }, []);

  // ✅ Open Edit Modal
  const handleEditOpen = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  // ✅ Save updated user
  const handleSaveChanges = async (updatedData) => {
    try {
      await updateUser(updatedData.id, updatedData);

      setRows((prevRows) =>
        prevRows.map((r) => (r.id === updatedData.id ? updatedData : r))
      );

      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user data!");
    }
  };

  // ✅ Add new user
  const handleAddUser = async (newUser) => {
    try {
      const maxId =
        rows.length > 0 ? Math.max(...rows.map((user) => user.id)) : 189;

      const userWithNewId = { ...newUser, id: maxId + 1 };

      await addUser(userWithNewId);

      setRows((prevRows) => [...prevRows, userWithNewId]);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user!");
    }
  };

  // ✅ Open Delete Modal
  const handleDeleteOpen = (row) => {
    setDeleteRow(row);
    setOpenDelete(true);
  };

  // ✅ Confirm delete
  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(deleteRow.id);

      setRows((prevRows) => prevRows.filter((r) => r.id !== deleteRow.id));

      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
  };

  const getNextId = () => {
    if (rows.length === 0) return 190;
    return Math.max(...rows.map((u) => u.id)) + 1;
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          width: "80%",
          maxWidth: 800,
          height: "44vh",
          margin: "auto",
          marginTop: 30,
          padding: isMobile ? 2 : 4,
          boxShadow: "0 0 10px rgba(224, 224, 224, 1)",
        }}
      >
        {/* ✅ Add Modal */}
        <Modal onSave={handleAddUser} nextId={getNextId()} />

        {/* ✅ Edit Modal */}
        {openEdit && (
          <Modal
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            editData={selectedRow}
            onSave={handleSaveChanges}
          />
        )}

        {/* ✅ Delete Modal */}
        <DeleteModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleDeleteConfirm}
        />

        <Table
          aria-label="user info table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Age
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Employee ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                City
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => handleEditOpen(row)}
                    className="editBtn"
                  >
                    <EditIcon />
                  </button>

                  <button
                    className="DelBtn"
                    onClick={() => handleDeleteOpen(row)}
                  >
                    <DeleteIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
