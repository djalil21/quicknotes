import { Logout } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useNotes from "../../hooks/useNotes";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { logout } = useNotes();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          QuickNotes
        </Typography>
        <Typography variant="h6" component="div">
          {user.username}
        </Typography>
        <IconButton
          size="large"
          aria-label="logout"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleLogout}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
