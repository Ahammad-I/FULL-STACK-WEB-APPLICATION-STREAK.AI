const express = require("express");
const cors = require("cors");
const pathRoutes = require("./routes/pathRoutes");

const app = express();
app.use(cors());  // Enable CORS to allow frontend to access API
app.use(express.json());  // Parse incoming JSON requests

// Use the path routes
app.use("/api", pathRoutes);

// Start the server on port 5000
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
