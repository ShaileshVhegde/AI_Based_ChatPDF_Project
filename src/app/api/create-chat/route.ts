import { NextResponse } from "next/server"

//api/create chat/route.ts
export async function POST(req: Request, res: Response) {
    try{
        const body = await req.json()
        const {file_key,file_name} =body;
        console.log('Received file_key:',file_key);
        console.log('Received file_name:',file_name);
        return NextResponse.json(
            {message:'Chat created successfully'}
        )

    }catch(error){
        console.error(error)
        return NextResponse.json(
            {error:'Internal Server Error'},
            {status:500} 
        )
    }
}