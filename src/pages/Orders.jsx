import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="w-full bg-neutral pt-10">
      <div className="w-full container min-h-[95vh] gap-10 mx-auto flex flex-col bg-neutral">
        <h1 className="text font-bold text-4xl">Sizning Buyurtmalaringiz</h1>
        <div className="w-full border border-black h-1 bg-black"></div>
        <div className="gap-10 grid grid-cols-1">
          <div className="flex flex-col gap-5">
            <p className="text-base lg:text-xl">
              Jami buyurtmalar: <span>{orders.length}</span>
            </p>
            <div className="flex gap-5 py-5 flex-col w-full">
              <div className="flex w-full flex-col gap-3">
                {/* Sarlavha qatori */}
                <div className="flex w-full justify-between border-b border-b-black py-3">
                  <span className="flex">Ism</span>
                  <div className="grid w-[70%] grid-cols-4 gap-5">
                    <span>Manzil</span>
                    <span>Mahsulotlar</span>
                    <span>Narx</span>
                    <span>Sana</span>
                  </div>
                </div>
                 {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex w-full justify-between border-b border-b-black py-3"
                  >
                    <span className="flex">{order.firstName}</span>
                    <div className="grid w-[70%] grid-cols-4 gap-5">
                      <span>{order.address}</span>
                      <span>{order.items.length}</span>
                      <span>${order.total.toFixed(2)}</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
