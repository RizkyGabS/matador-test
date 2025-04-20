import { Router } from "express";
import { db } from "../config/db.ts";
import { orders, products } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (_req, res) => {
    const result = await db.select().from(orders);
    res.json(result);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product to order
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
            error: "Product ID and a positive quantity are required"
        });
        }

        // Find the product
        const product = await db.query.products.findFirst({
        where: eq(products.id, productId),
        });

        if (!product) {
        return res.status(404).json({ error: "Product not found" });
        }

        // Total price
        const price = typeof product.price === 'string'
        ? parseFloat(product.price)
        : Number(product.price);

        const totalPrice = price * quantity;

        const result = await db
        .insert(orders)
        .values({
            productId,
            quantity,
            totalPrice: totalPrice.toFixed(2),
        })
        .returning();

        res.status(201).json(result[0]);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

export default router;
