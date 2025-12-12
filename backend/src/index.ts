import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { loadProducts, writeFile } from "./dataService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const SECRET_KEY = process.env.JWT_SECRET || "tel-p";

app.use(cors({
  origin: "*",
}));
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




app.post("/apis/save-product", async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const products = await writeFile("./products.json", product);
    res.json({ message: "Product saved successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to load products", error });
  }
});





app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
