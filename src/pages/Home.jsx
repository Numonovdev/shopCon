import { useEffect, useState } from 'react';
import { http } from '../axios';
import img from '../img/img.webp';
import img2 from '../img/img2.webp';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  function handleCartID(id){
    navigate(`products/${id}`)
  }



  useEffect(() => {
    http.get("products?featured=true")
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
 
  console.log(data);
  
  return (
    <>
      <div className="hero min-h-screen bg-neutral text-neutral-content">
        <div className="hero-content flex-col lg:flex-row">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">
              We are changing the way people shop
            </h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempore
              repellat explicabo...
            </p>
            <button className="btn btn-secondary">Our Products</button>
          </div>
          <div className="flex max-w-[50%] space-x-4 p-5 bg-slate-600 rounded-xl">
            <img
              src={img}
              className="max-w-xs shadow-2xl rounded-xl"
              alt="Sofa"
            />
            <img
              src={img2}
              className="max-w-xs w-[40%] object-cover rounded-lg shadow-2xl"
              alt="Decor"
            />
          </div>
        </div>
      </div>

      <div className="bg-neutral text-white py-10">
        <div className="container mx-auto flex flex-col gap-5">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold">Featured products</h1>
          <div className="w-full h-1 bg-slate-600 mb-4"></div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((value, index) => (
                <div key={index} onClick={()=>{handleCartID(value.id)}} className="flex flex-col cursor-pointer rounded-2xl items-center gap-3 shadow-lg shadow-black p-4 ">
                  <img
                    src={value.attributes.image}
                    className="w-full h-48 object-cover rounded-xl"
                    alt={value.attributes.title}
                  />
                  <h1 className="text-lg md:text-xl xl:text-2xl font-semibold">{value.attributes.title}</h1>
                  <p className="text-purple-600 text-base md:text-lg xl:text-xl">$179.99</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
