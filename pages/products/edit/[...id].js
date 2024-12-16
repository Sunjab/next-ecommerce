import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "../form";

export default function EditProduct(){
    
    const [title, setTitle] = useState('title');
    const [description, setDescription] = useState('description');
    const [price, setPrice] = useState('');
    const[editedProduct, setEditedProduct] = useState();   
    
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
            return
        }
        axios.get('/api/products?id='+id).then(Response => { 
            setEditedProduct(Response.data);
        })
        
    },[]);
    

    return(
        <Layout>
        <Form title={editedProduct?.title} 
        description={editedProduct?.description}
         price={editedProduct?.price}/>
        
        </Layout>
        
        
    )
}      