import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllSellers from "../Dashboard/Admin/AllSellers/AllSellers";
import AllBuyers from "../Dashboard/Admin/AllBuyers/AllBuyers";
import ReportedItem from "../Dashboard/Admin/ReportedItem/ReportedItem";
import MyProduct from "../Dashboard/Seller/MyProduct/MyProduct";
import AddProduct from "../Dashboard/Seller/AddProduct/AddProduct";
import MyOrders from "../Dashboard/User/MyOrders/MyOrders";
import Product from "../Pages/Home/AllCategory/Product/Product";
import Payment from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
        element: (
          <PrivateRoute>
            <Product></Product>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/allsellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/allbuyers",
        element: <AllBuyers></AllBuyers>,
      },
      {
        path: "/dashboard/reporteditem",
        element: <ReportedItem></ReportedItem>,
      },
      {
        path: "/dashboard/myproduct",
        element: <MyProduct></MyProduct>,
      },
      {
        path: "/dashboard/addproduct/:email",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.email}`),
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/myorder",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/orders/${params.id}`),
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
