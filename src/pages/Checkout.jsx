import { useContext, useState, useEffect } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, value) => acc + value.data.attributes.price * value.count,
      0
    );
    setSubtotal(totalPrice);
  }, [cart]);

  function handleOrders(e) {
    e.preventDefault();

    if (firstName && address) {
      const orderData = {
        firstName,
        address,
        items: cart,
        total: subtotal + 5 + 34, 
        date: new Date().toLocaleString(),
      };

      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      savedOrders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(savedOrders));

      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      navigate("/orders");
    } else {
      alert("Iltimos, ism va manzilni to'ldiring!");
    }
  }

  return (
    <div className="w-full bg-neutral pt-10">
      <div className="w-full container min-h-[95vh] gap-10 mx-auto flex flex-col bg-neutral">
        <h1 className="text font-bold text-4xl">Buyurtmangizni joylashtiring</h1>
        <div className="w-full border border-black h-1 bg-black"></div>
        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-base lg:text-xl">Yetkazib berish ma'lumotlari</p>

            <div className="form-control mb-4">
              <label className="label">
                <span className="">Ism</span>
              </label>
              <input
                type="text"
                placeholder="Ismingizni kiriting"
                className="input input-bordered w-full border border-white bg-neutral"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="">Manzil</span>
              </label>
              <input
                type="text"
                placeholder="Manzilingizni kiriting"
                className="input input-bordered w-full border border-white bg-neutral"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={handleOrders}
              className="btn btn-primary w-full mb-2"
            >
              Buyurtmani joylashtirish
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-black p-10 rounded-xl">
              <div className="flex justify-between">
                <span>Yakuniy narx</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib berish</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Solik</span>
                <span>$34.00</span>
              </div>
              <div className="flex justify-between">
                <span>Buyurtma umumiy narxi</span>
                <span>${(subtotal + 5 + 34).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
