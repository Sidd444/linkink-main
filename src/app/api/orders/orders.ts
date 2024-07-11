import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/dbConfig/dbConfig';
import Order from '@/models/orderModel';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await connect();

  const { productId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const order = new Order({
      ownedBy: user._id,
      elementId: productId,
      status: 'pending',
    });

    await order.save();

    user.itemsOwned.push(order._id);
    await user.save();

    res.status(201).json({ message: 'Product added to inventory' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
