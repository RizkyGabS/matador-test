import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.ts";
import orderRoutes from "./routes/order.routes.ts"
import { setupSwagger } from "./swagger/swagger.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes)

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
