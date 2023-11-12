import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  GetTokenFromCookie,
  getDecodedToken,
  getToken,
  getTokenFromLocal,
} from "../../utils/GetToken";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { tokenIdProperty } from "../../utils/TokenProperties";
import { useNavigate } from "react-router-dom";
import { useService } from "../../hooks";

export const ChangePassword = () => {
  const token = getToken();
  const decodedToken = getDecodedToken();
  const navigate = useNavigate();
  const { authServices } = useService();
  const [error, setError] = useState([]);
  const [result, setResult] = useState("");

  const [inputState, setInputState] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const mutate = useMutation(
    () =>
      authServices.changePassword(
        decodedToken[tokenIdProperty],
        inputState,
        token
      ),
    {
      onSuccess: () => {
        setResult("Password changed successefully");
        setError("");
      },
    }
  );
  const enteredValueisValid = useState({
    oldPasswordIsValid: true,
    passwordIsValid: true,
    confirmPasswordIsValid: true,
  });
  const defaultTheme = createTheme();

  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError([mutate.error.response.data.message]);
      setResult("");
    }

    console.log("error");
  }, [mutate.isError]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputState.password !== inputState.confirmPassword) {
      if (error?.length > 0) {
        if (!error.includes("Passwords do not match")) {
          setError((prev) => [...prev, "Passwords do not match"]);
        }
      }
      setResult("");
    } else if (error?.includes("Passwords do not match")) {
      setError((prev) =>
        prev.filter((error) => error !== "Passwords do not match")
      );
    }
    if (
      inputState.password === inputState.oldPassword &&
      !error?.includes("Password are same")
    ) {
      setError(["Password are same"]);
      setResult("");
    }

    if (
      inputState.password === inputState.confirmPassword &&
      inputState.password !== inputState.oldPassword &&
      inputState.password.length > 7
    ) {
      mutate.mutate();
    }
  };
  console.log(inputState);
  if (!token) {
    return <h1>Error</h1>;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              autoComplete="old-password"
              onChange={(e) => {
                setInputState((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }));
              }}
              error={inputState?.oldPassword ? "" : "error"}
              helperText={
                inputState?.oldPassword ? "" : "Old Password  is required"
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setInputState((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              error={inputState?.password ? "" : "error"}
              helperText={inputState?.password ? "" : "Password  is required"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={(e) => {
                setInputState((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
              error={inputState?.password ? "" : "error"}
              helperText={inputState?.password ? "" : "Password  is required"}
            />
            <div className="errorMessage">
              {error ? error.map((err) => <h1>{err}</h1>) : ""}
            </div>
            <div className="successMessage">
              {result ? <h1>{result}</h1> : ""}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
