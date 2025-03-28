import { useEffect, useState, useContext } from "react"
import { CartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { ProductProps } from "../../pages/home";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'



export function Detail(){
    const { id } = useParams(); 
    const [product, setProduct] = useState<ProductProps>();
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate();


    function handleAddCartItem(product: ProductProps){
        toast.success("Produto adicionado no carrinho!", {
          style:{
            borderRadius: 10,
            backgroundColor: "#121212",
            color: "#FFF"
          }
        })
        addItemCart(product);

        navigate("/cart")
      }


    useEffect(() => {
      async function getProducts(){
        const response = await api.get(`/products/${id}`)
        setProduct(response.data)
      }
    
      getProducts();
    }, [id])

      if (!product) return <p>Carregando...</p>;

    return(
        <main className="w-full flex flex-col lg:flex-row max-w-7xl px-4 my-6 mx-auto ">

            <img 
              className="flex-1 w-full max-h-72 object-contain"
              src={product.cover}
              alt={product.title}
              />


            <div className="flex-1">
                <p className="font-bold text-2xl mt-4 mb-2">{product.title}</p>
                <p className="my-4">{product.description}</p>
                
                <div className="flex gap-3">
                    <strong className="text-zinc-700/90">
                    {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                    </strong>

                    <button className="bg-zinc-900 p-1 rounded cursor-pointer" onClick={ () => handleAddCartItem(product) }>
                    <BsCartPlus size={22} color="#FFF"/>
                    </button>
                </div>
            </div>

        </main>
    )
}