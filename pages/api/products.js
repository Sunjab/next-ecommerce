import { MongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handle(req, res){
    const {method} = req;
    console.log(req.query);    
    await MongooseConnect();
    if (method === 'GET'){
      if (req.query?.id){
      res.json(await Product.findOne({_id:req.query.id}));
     
      }
      else{
      res.json(await Product.find());
      } 
    } 
    if (method === 'POST'){     
        const {title,description,price,images} = req.body;
        const productDoc = await 
        Product.create({title,description,price,images});
        res.json(productDoc);
    }
}