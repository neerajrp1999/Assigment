import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { loadProducts} from "./dataService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const SECRET_KEY = process.env.JWT_SECRET || "tel-p";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/apis/get-all-products", async (req: Request, res: Response) => {
  try {
    const products = await loadProducts("./products.json");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to load products", error });
  }
});






app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
