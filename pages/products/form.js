import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"

export default function Form(props){
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState(props.description);
    const[price, setPrice] = useState(props.Price);
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState([]);
    const router = useRouter();

    async function uploadImages(ev){
        console.log(ev.target.files.length);
        const files = ev.target.files;
        
        if ( files?.length > 0 ){
        for ( const file of files ){
            const data = new FormData();
            data.append('file', file);
           const res = await axios.post('/api/upload', data);
           setImages(oldImages =>{
            return [...oldImages, ...res.data.links];
           });
           console.log('link:'+res.data.links);
        }}}
        async function createProduct(ev) {
            ev.preventDefault();
            const data = {title, description, price, images};
            await axios.post('/api/products', data);
            setGoToProducts(true);
            
        }
        if (goToProducts) {
            router.push('/Products');
             } 

    return(
        <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>product name</label>
        <input onChange={ev => setTitle(ev.target.value)}
         value={props.title} placeholder="product name" type="text"/>
         <div className="flex">
        {!!images?.length && images.map(link =>(
            <div key={link} className="rounded-md">
                <Image src={link} alt=""
                width={100}
                height={100}/>
            </div>
        ))}
    
        <label className="flex gap-2 bg-gray-300 h-24 w-24 items-center justify-center 
        text-gray-500 cursor-pointer p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
        class="w-5 h-5">
        <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-
        #4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018
        15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1
        .25v-2.5z" />
     </svg>
     Upload
     <input type="file" onChange={uploadImages} className="hidden"/>
        </label>
        </div>
        <label>description</label>
        <textarea onChange={ev => setDescription(ev.target.value)} value={description} placeholder="description"/>
        <label>price (in USD)</label>
        <input onChange={ev => setPrice(ev.target.value)} value={price} placeholder="Price"/>
        <button className="btn-primary" type="submit">Save</button>     
</form>
    )
}