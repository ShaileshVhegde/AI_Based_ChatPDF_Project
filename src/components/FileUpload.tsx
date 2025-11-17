'use client'
import React from 'react'
import { uploadToS3 } from "@/lib/s3";
import { useDropzone } from 'react-dropzone'
import { Inbox, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const FileUpload=() => {
    const[uploading, setUploading] =React.useState(false);
     const {mutate,isPending} =useMutation({
        mutationFn:async({file_key, file_name}:{file_key:string; file_name:string}) => {
            const responce = await axios.post('/api/create-chat',{file_key, file_name});
            return responce.data;
        }

            

     });
     const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': [".pdf"]
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            
            const file =acceptedFiles[0];
            if(file.size>10*1024*1024){ 
                //file is larger than 10MB
                toast.error("File too Large")
             
                return;
            }
            try{
                setUploading(true);
                const data = await uploadToS3(file)
                if(!data?.file_key || !data?.file_name){
                  toast.error('Failed to upload file to S3');
                    return;
                }
                mutate(data,{
                   onSuccess: (data) => {
                    toast.success('File uploaded and chat created successfully!');
                   },
                     onError: (error) => {
                    toast.error('Error creating chat with uploaded file');
                     }
                })
                
            }catch(error){
                console.error('Error uploading file:',error);
            }
            finally{
                setUploading(false);}
        }
     });
return (
    <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
     <div  {...getRootProps({
        className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'

     })}>
        <input {...getInputProps()} />
        { uploading|| isPending ? (
            <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Spilling tea to GPT..</p>
            </>
        ):(
             <>
        <Inbox className="w-10 h-10 rext-blue-500" />
        <p className='mt-2 text-8m text-slate-400'>Drop PDF here</p>
        </>
            
        )}

        
       
       
     </div>
      
    </div>
  )
    }

export default FileUpload


