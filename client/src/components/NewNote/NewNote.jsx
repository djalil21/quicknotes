import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useNotes from "../../hooks/useNotes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "90%",
  bgcolor: "white",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: 20,
  p: 4,
};

const NewNote = ({ open, handleClose }) => {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(dispatch, { title, description });
    setTitle("");
    setDescription("");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "100%", marginBottom: "15px" }}
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={4}
          sx={{ width: "100%" }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
            gap: "10px",
          }}
        >
          <Button variant="contained" type="submit">
            Add
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewNote;
