import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../App";

function Detail() {
  const [color, setColor] = useState();
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  function handleAddCart(e) {
    e.preventDefault();

    const dataData = {
      data: data,
      color: color,
      count: Number(count),
      id: data.id,
    };

    let copied = [...cart];

    let isExist = copied.find(function (c) {
      return c.id === dataData.id && c.color === dataData.color;
    });

    if (!isExist) {
      copied = [...cart, dataData];
    } else {
      copied = copied.map((value) => {
        if (value.id === dataData.id && value.color === dataData.color) {
          value.count = Number(value.count);
          value.count += Number(dataData.count);
        }
        return value;
      });
    }

    setCart(copied);
    localStorage.setItem('cart', JSON.stringify(copied));
  }

  useEffect(() => {
    http.get(`products/${id}`)
      .then(response => {
        const productData = response.data.data;
        setData(productData);
        setColor(productData.attributes.colors[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  function handleHome() {
    navigate('/');
  }

  function handleProducts() {
    navigate('/products');
  }

  return (
    <div className="w-full bg-neutral">
      <div className="container mx-auto py-20 flex flex-col">
        <div>
          <span className="cursor-pointer" onClick={handleHome}>Home</span> / <span className="cursor-pointer" onClick={handleProducts}>Products</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-10">
                    <div>
            {data.attributes && data.attributes.image ? (
              <img
                src={data.attributes.image}
                alt={data.attributes.title || "Product"}
                className="w-full lg:w-[50%] xl:w-[100%] h-[60%] rounded-2xl"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>

          
          <div className="font-bold flex flex-col gap-8">
            <h1 className="text-xl lg:text-2xl xl:text-3xl">{data.attributes?.title || "Product Title"}</h1>
            <h2 className="text-lg lg:text-xl xl:text-2xl">{data.attributes?.brand || "Brand Name"}</h2>
            <span className="text-base lg:text-lg xl:text-xl">${data.attributes?.price || "Price"}</span>
            <p className="text-sm lg:text-base xl:text-base">{data.attributes?.description || "Product description"}</p>

            
            <div className="flex flex-col">
              <h1 className="text-sm lg:text-lg xl:text-lg">Colors</h1>
              <div className="flex gap-2">
                {data.attributes?.colors?.map((clr, index) => (
                  <span
                    key={index}
                    onClick={() => setColor(clr)}
                    style={{ backgroundColor: clr }}
                    className={`w-5 h-5 rounded-full border-2 ${color === clr ? 'border-gray-600' : 'border-gray-400'} cursor-pointer`}
                  ></span>
                ))}
              </div>
            </div>

            
            <div className="flex flex-col">
              <span className="text-sm lg:text-base xl:text-lg">Amount</span>
              <select
                className="select text-neutral w-full lg:max-w-[50%]"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              >
                {[...Array(5).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>

            
            <button onClick={handleAddCart} className="btn max-w-[50%] lg:max-w-[30%] btn-warning">ADD TO BAG</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
