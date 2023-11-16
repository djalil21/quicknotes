import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import { useDispatch } from "react-redux";

const Register = () => {
  const { register } = useNotes();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, { username, password });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Link to="/auth/login">If you have already an account, login</Link>
        </Box>
      </Container>
    </>
  );
};

export default Register;
