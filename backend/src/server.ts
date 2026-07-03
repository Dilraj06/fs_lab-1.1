import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/roles", roleRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});