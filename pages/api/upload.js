import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multiparty from 'multiparty';
import fs from 'fs';
import mime from 'mime-types';
const bucketName = 'suntech-next-ecommerce'; 

export default async function handle(req, res){
    //console.log(req.body);
    const links = [];
    const form = new multiparty.Form();
    const {fields, files} = 
    await new Promise((resolve, reject) => { 
    form.parse(req,  (err, fields, files) =>{
    if (err) reject(err);
    resolve({fields, files});
    })});

        const client = new S3Client({
            region: 'us-west-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });
        for(const file of files.file){
            console.log(files);
            const ext = file.originalFilename.split('.').pop();
            console.log(ext);
            const newFilename = Date.now() + '.' + ext;
            console.log(newFilename);
        
         client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
            
        }));
        console.log(mime.lookup(file.path));

        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`
        links.push(link);
    }
        console.log({links});
        res.json({links});
    }



export const config = {
    api: {bodyParser: false},
};  