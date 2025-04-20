import { Router } from "express";
import { db } from "../config/db.ts";
import { products } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
    const { name, description, price } = req.body;
    const result = await db.insert(products).values({ name, description, price }).returning();
    res.status(201).json(result[0]);
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", async (_req, res) => {
    const result = await db.select().from(products);
    res.json(result);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const result = await db
        .update(products)
        .set({ name, description, price })
        .where(eq(products.id, (Number(id))))
        .returning();

    res.json(result[0]);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await db.delete(products).where(eq(products.id, (Number(id))));
    res.status(204).end();
});

export default router;
