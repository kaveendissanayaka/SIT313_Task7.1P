import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { Typography, Box, TextField, Button, Link, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebaseConfigs";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dark background color
    },
    text: {
      primary: "#ffffff", // White text color
    },
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // Compare the entered password with the hashed password stored in the database
        bcrypt.compare(password, userData.password, (err, isPasswordValid) => {
          if (err) {
            setError("Error logging in");
          } else if (isPasswordValid) {
            navigate("/home");
          } else {
            setError("Invalid email or password");
          }
        });
      } else {
        setError("Invalid email or password");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login to Dev @ Deakin
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Typography variant="body2">
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;