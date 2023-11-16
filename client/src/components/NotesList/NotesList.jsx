import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditNote from "../EditNote/EditNote";
import { useDispatch, useSelector } from "react-redux";
import useNotes from "../../hooks/useNotes";

const NotesList = () => {
  const { getNotes, deleteNote } = useNotes();
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const [deletedItem, setDeletedItem] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getNotes(dispatch);
  }, [dispatch]);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  const handleOpenDelete = (e, item) => {
    e.stopPropagation();
    setDeletedItem(item);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedItem(null);
  };

  const handleDelete = () => {
    deleteNote(dispatch, deletedItem.id);
    handleCloseDelete();
  };

  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {loading && <div>Loading...</div>}
      {notes.map((value) => {
        return (
          <ListItem
            key={value.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
            disablePadding
          >
            <ListItemButton onClick={() => handleOpen(value)} dense>
              <ListItemText
                id={value.id}
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{value.title}</Typography>
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={(e) => handleOpenDelete(e, value)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                }
                secondary={
                  value.description?.length > 140
                    ? value.description.slice(0, 140) + " ..."
                    : value.description
                }
              />
            </ListItemButton>
            <EditNote
              open={open}
              handleClose={handleClose}
              value={selectedItem}
            />
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              slotProps={{
                backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.2)" } },
              }}
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to delete this note?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {deletedItem?.title}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDelete} color="error">
                  Delete
                </Button>
                <Button onClick={handleCloseDelete} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NotesList;
