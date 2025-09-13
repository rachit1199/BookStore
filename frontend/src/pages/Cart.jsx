import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch user cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", {
          headers,
        });
        setCart(res.data.data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // Calculate total whenever cart updates
  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [cart]);

  // Delete item from cart
  const deleteItem = async (bookId) => {
    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        { bookid: bookId },
        { headers }
      );
      alert(res.data.message);
      // Refresh cart after deletion
      setCart((prev) => prev.filter((item) => item._id !== bookId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart");
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {/* Empty Cart */}
      {cart.length === 0 && (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
        </div>
      )}

      {/* Cart with items */}
      {cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />

              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
              </div>

              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 hover:bg-red-200 transition"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-8 flex justify-end">
            <h2 className="text-3xl font-bold text-green-400">
              Total: ₹ {total}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
