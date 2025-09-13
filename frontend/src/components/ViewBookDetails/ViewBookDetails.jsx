import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Fetch book details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Common headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  // Handlers for user
  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error adding to favourites:", err);
      alert("Failed to add to favourites");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    }
  };

  // Handlers for admin
  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/delete-book/${id}`,
        { headers }
      );
      alert(response.data.message);
      navigate("/books"); // redirect to books list after delete
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Loading book details...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        Book not found.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
      {/* Book Image & Buttons */}
      <div className="w-full lg:w-3/6">
        <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-6 rounded">
          <img
            src={data.url}
            alt={data.title}
            className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded object-contain mx-auto"
          />

          {/* User buttons */}
          {isLoggedIn && role === "user" && (
            <div className="flex flex-col md:flex-row lg:flex-col items-center gap-4 mt-4 lg:mt-0">
              <button
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-red-500 hover:bg-red-100 transition"
                onClick={handleFavourite}
              >
                <FaHeart className="text-xl" />
                <span className="text-sm sm:text-base">Favourites</span>
              </button>

              <button
                className="flex items-center gap-2 bg-blue-500 rounded-full px-4 py-2 text-white hover:bg-blue-600 transition"
                onClick={handleCart}
              >
                <FaShoppingCart className="text-xl" />
                <span className="text-sm sm:text-base">Add to Cart</span>
              </button>
            </div>
          )}

          {/* Admin buttons */}
          {isLoggedIn && role === "admin" && (
            <div className="flex flex-col md:flex-row lg:flex-col items-center gap-4 mt-4 lg:mt-0">
              <button
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 hover:bg-red-100 transition"
                onClick={handleEdit}
              >
                <FaEdit className="text-xl" />
                <span className="text-sm sm:text-base">Edit</span>
              </button>

              <button
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-red-500 hover:bg-blue-600 transition"
                onClick={handleDelete}
              >
                <MdOutlineDelete className="text-xl" />
                <span className="text-sm sm:text-base">Delete Book</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4 w-full lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
        <p className="text-zinc-400 mt-1">by {data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
        <p className="flex mt-4 items-center text-zinc-400">
          <GrLanguage className="me-3" /> {data.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price: ₹{data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
