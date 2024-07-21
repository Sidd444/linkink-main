import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { image, title, description } = req.body;

    if (!image || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      image,
      title,
      description,
      user: session.user.id,
    });

    await product.save();

    return res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
