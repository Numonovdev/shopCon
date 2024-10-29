import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function Products(){
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
  
    function handleCartID(id){
      navigate(`/products/${id}`)
    }
  
  
  
    useEffect(() => {
      http.get("products")
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
  



    return(
        <div className="w-full bg-neutral ">
           <div className="container mx-auto py-20">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 w-full px-10 py-8 rounded-lg bg-black">
              <div className="w-full flex-col flex gap-6">
                 <div className="flex flex-col gap-2">
                    <span>Search Product</span>
                    <input type="text" className="px-2 py-1 border border-white rounded-md  bg-neutral w-full outline-none" />
                 </div>
                 <div className="flex flex-col gap-2">
                     <div className="flex justify-between"> <span>Select Price</span> <span>$1.000.00</span></div>
                     <input type="range"  className="range range-primary" />
                     <div className="flex justify-between"> <span>0</span> <span>Max: $1.000.00</span></div>
                 </div>
              </div>
              <div className="w-full flex-col flex gap-6">
                 <div className="flex flex-col gap-2">
                    <span>Search Category</span>
                    <select className="w-full bg-neutral border border-white rounded-md mx-4 py-1" >
                        <option value="all">all</option>
                        <option value="tables">Tables</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Kids">Kids</option>
                        <option value="sofas">Sofas</option>
                        <option value="bads">Bads</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-2">
                     <div className="flex justify-center"> <span>Free Shipping</span></div>
                     <input type="radio"  className="radio radio-secondary mx-auto" />
                 </div>
                 
              </div>
              <div className="w-full flex-col flex gap-6">
                 <div className="flex flex-col gap-2">
                    <span>Search Category</span>
                    <select className="w-full bg-neutral border border-white rounded-md mx-4 py-1" >
                        <option value="all">all</option>
                        <option value="tables">Tables</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Kids">Kids</option>
                        <option value="sofas">Sofas</option>
                        <option value="bads">Bads</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-2">
                    <button className="w-full flex items-center justify-center py-2 rounded-lg bg-pink-500">SEARCH</button>
                 </div>
                 
              </div>
              
              <div className="w-full flex-col flex gap-6">
                 <div className="flex flex-col gap-2">
                    <span>Search Category</span>
                    <select className="w-full bg-neutral border border-white rounded-md mx-4 py-1" >
                        <option value="all">all</option>
                        <option value="tables">Tables</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Kids">Kids</option>
                        <option value="sofas">Sofas</option>
                        <option value="bads">Bads</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-2">
                    <button className="w-full flex items-center justify-center py-2 rounded-lg bg-yellow-500">RESET</button>
                 </div>
                 
              </div>
            </div>
            <div>

            </div>
           </div>        
           
        <div className="container mx-auto flex flex-col gap-5">
            <div className="flex justify-between items-center">
               <h1 className="text-lg md:text-xl xl:text-xl font-semibold">22 products</h1>
               <div className="flex gap-4 items-center text-xl md:text-2xl xl:text-3xl font-semibold">
               <i class="fa-solid fa-table-cells-large  hover:text-pink-600 cursor-pointer"></i>
               <i class="fa-solid fa-bars hover:text-pink-600 cursor-pointer"></i>
               </div>
            </div>
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
    )
}

export default Products