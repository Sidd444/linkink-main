"use client"


import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import Order from '@/models/orderModel'; 
import Product from '@/models/productsModel'; 
import User from '@/models/userModel'; 
import React from 'react';
import Head from 'next/head';

interface OrderType {
  _id: string;
  elementId: ProductType;
  status: string;
  linkedTo?: string;
  address?: string;
  pincode?: number;
  phoneNo?: number;
}

interface ProductType {
  _id: string;
  image: string;
  description: string;
  title: string;
}

interface MePageProps {
  orders: OrderType[];
}

const fetchUserOrders = async (email: string) => {
  await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = await User.findOne({ email }).populate({
    path: 'itemsOwned',
    populate: { path: 'elementId', model: Product },
  }).exec();

  const orders = user ? user.itemsOwned : [];
  return JSON.parse(JSON.stringify(orders));
};

const MePage: React.FC<MePageProps> = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const orders = await fetchUserOrders(session.user.email);

  const renderOrders = () => {
    if (orders.length === 0) {
      return <p>No orders found.</p>;
    }

    return orders.map((order) => (
      <div key={order._id} className="border p-4 mb-4 rounded-lg shadow">
        <h3 className="text-xl font-bold">{order.elementId.title}</h3>
        <p>{order.elementId.description}</p>
        <p>Status: {order.status}</p>
        {order.linkedTo && <p>Linked To: {order.linkedTo}</p>}
        {order.address && <p>Address: {order.address}</p>}
        {order.pincode && <p>Pincode: {order.pincode}</p>}
        {order.phoneNo && <p>Phone No: {order.phoneNo}</p>}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>My Orders</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {renderOrders()}
    </div>
  );
};

export default MePage;
