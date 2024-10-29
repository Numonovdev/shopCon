import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [prices, setPrices] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const shippingFee = 5.0;
  const taxFee = 34.0;

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [setCart]);

  function handleAmount(e, index) {
    const newCart = [...cart];
    newCart[index].count = parseInt(e.target.value);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, value) => acc + value.data.attributes.price * value.count,
      0
    );
    setPrices(totalPrice);
  }, [cart]);

  function handleRemove(id, color) {
    const copied = cart.filter(
      (value) => value.id !== id || value.color !== color
    );
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  function handleCheckout(e) {
    e.preventDefault();
    if (!token) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div className="w-full bg-neutral pt-20">
      <div className="w-full container min-h-[95vh] gap-10 mx-auto flex flex-col bg-neutral">
        <h1 className="text font-bold text-4xl">Shopping Cart</h1>
        <div className="w-full border h-1 bg-black"></div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-5 flex-1">
            {cart.length > 0 ? (
              cart.map((value, index) => (
                <div key={index} className="flex w-full justify-between">
                  <img
                    src={value.data.attributes.image}
                    className="w-52 h-52 rounded-lg"
                    alt="Product Image"
                  />
                  <div className="flex flex-col">
                    <h1>{value.data.attributes.category || "Chic Chain"}</h1>
                    <p>{value.data.attributes.company || "Luxora"}</p>
                    <p className="flex items-center gap-2">
                      Color:{" "}
                      <div
                        style={{ backgroundColor: value.color }}
                        className="w-5 h-5 rounded-full"
                      ></div>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1>Amount</h1>
                    <select
                      className="bg-transparent"
                      value={value.count}
                      onChange={(e) => handleAmount(e, index)}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option className="bg-transparent" value={n} key={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span
                      onClick={() => handleRemove(value.id, value.color)}
                      className="text-pink-500 cursor-pointer"
                    >
                      Remove
                    </span>
                  </div>
                  <span>${value.data.attributes.price || 0}</span>
                </div>
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-black p-10 rounded-xl">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${prices.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${taxFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Order Total</span>
                <span>${(prices + shippingFee + taxFee).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center h-8 btn px-5 rounded-xl bg-pink-600"
            >
              {token ? "PROCEED TO CHECKOUT" : "LOGIN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
