import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/GetToken";
import { useEffect } from "react";
import { tokenRoleProperty } from "../../utils/TokenProperties";
import { Alert, Snackbar } from "@mui/material";
import { Cookies } from "react-cookie";
import { useService } from "../../hooks";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()} Developed by Musa Mahmudov
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      return navigate("/ErrorPage");
    }
  }, []);
  const { authServices } = useService();
  const [token, setToken] = useState();
  const [expireDate, setExpireDate] = useState();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [open, setOpen] = useState(false);
  const tokenCookie = new Cookies();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  var mutate = useMutation(() => authServices.Login(user), {
    onError: () => handleClick(),
    onSuccess: (res) => (
      setToken(res.data?.token), setExpireDate(res.data?._expireDate)
    ),
  });
  useEffect(() => {
    if (mutate.isSuccess) {
      var decodedToken = jwtDecode(token);
      if (
        decodedToken[tokenRoleProperty] === "Admin" ||
        decodedToken[tokenRoleProperty] === "Moderator"
      ) {
        handleClick();
      } else {
        if (decodedToken[tokenRoleProperty].includes("Student")) {
          tokenCookie.set("tokenStudent", token);
          tokenCookie.set("expireDateStudent", expireDate);
          navigate("/StudentSchedule");
        } else if (decodedToken[tokenRoleProperty].includes("Teacher")) {
          tokenCookie.set("tokenTeacher", token);
          tokenCookie.set("expireDateTeacher", expireDate);
          navigate("/TeacherSchedule");
        }
      }
    }
  }, [mutate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password && user.userName) {
      mutate.mutate();
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }));
              }}
              error={user.userName ? "" : "error"}
              helperText={user.userName ? "" : "User name is required"}
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
                setUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              error={user.password ? "" : "error"}
              helperText={user.password ? "" : "Password  is required"}
            />
            {/* <div className="errorMessage"> */}
            {/* <h1>{error}</h1> */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Username or Password is wrong!
              </Alert>
            </Snackbar>
            {/* </div> */}
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  rememberMe: !prev.rememberMe,
                }))
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/ForgotPassword")}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
