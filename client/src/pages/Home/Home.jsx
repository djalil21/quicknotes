import { Box, Button, Container } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "../../components/NotesList/NotesList";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import NewNote from "../../components/NewNote/NewNote";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <Button variant="contained" endIcon={<Add />} onClick={handleOpen}>
            Add note
          </Button>
        </Box>
        <NewNote open={open} handleClose={handleClose} />

        <NotesList />
      </Container>
    </>
  );
};

export default Home;
