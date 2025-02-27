import Link from "next/link";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response =>{
        setProducts(response?.data);
       })
    },[]);
    
    return(
        <Layout>
            <Link className="bg-blue-500 text-white rounded-md p-2" href={'/products/new'}>
                Add new Product
            </Link>
             <table className="basic">
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => 
                    <tr>
                        <td>{product.title}</td>
                        <td className="edit">
                            <Link href={'/products/edit/'+product._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-4 h-4">
                               <path stroke-linecap="round" 
                               stroke-linejoin="round"
                               d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652
                                2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 
                                18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0
                                0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75
                                21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 
                                015.25 6H10" />
                               </svg>

                            Edit
                            </Link>
                            </td>
                    </tr>
                    )
                    }
                </tbody>
                      
             </table>
        </Layout> 
    )
}