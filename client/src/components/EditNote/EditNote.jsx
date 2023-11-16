import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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
  boxShadow: 20,
  borderRadius: "5px",
  p: 4,
};

const EditNote = ({ open, handleClose, value }) => {
  const { updateNote } = useNotes();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(value?.title);
    setDescription(value?.description);
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote(dispatch, { title, description, id: value.id });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.2)" } },
      }}
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
          sx={{ width: "100%", marginBottom: "15px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={value && value.title}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          minRows={4}
          sx={{ width: "100%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={value && value.description}
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
            Edit
          </Button>

          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditNote;
