import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./home/NavBar";
import HeaderImg from "./home/HeaderImg";
import FeaturedArticles from "./home/Articles";
import FeaturedTutorials from "./home/Tutorials";
import SubscribeForm from "./home/subsEmail";
import Footer from "./home/Footer";

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

const HomePage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <HeaderImg />
        <FeaturedArticles />
        <FeaturedTutorials />
        <SubscribeForm />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;