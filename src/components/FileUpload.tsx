'use client'
import React from 'react'
import { uploadToS3 } from "@/lib/s3";
import { useDropzone } from 'react-dropzone'
import { Inbox } from 'lucide-react'
const FileUpload=() => {
     const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': [".pdf"]
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file =acceptedFiles[0];
            if(file.size>10*1024*1024){
                //file is larger than 10MB
                alert('File size exceeds 10MB limit');
                return;
            }
            try{
                const data = await uploadToS3(file)
                console.log('File uploaded successfully:',data);
            }catch(error){
                console.error('Error uploading file:',error);
            }
        }
     });
return (
    <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
     <div  {...getRootProps({
        className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'

     })}>
        <input {...getInputProps()} />

        
        <>
        <Inbox className="w-10 h-10 rext-blue-500" />
        <p className='mt-2 text-8m text-slate-400'>Drop PDF here</p>
        </>
       
     </div>
      
    </div>
  )
    }

export default FileUpload


