import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import FileUpload from "@/components/FileUpload";


export default async function Home() {
  const user = await currentUser();
  const isAuth = !!user;


  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">

          {/* Heading + User Button */}
          <div className="flex items-center">
            {/* Fixed typo: front-semibold → font-semibold */}
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>

            {/* Fixed prop: afterSignOutUrl */}
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Authenticated: Show Chats Button */}
          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>

          {/* Description */}
          <p className="max-w-xl mt-2 text-lg text-gray-600">
            Upload your PDF and start a conversation with it using
            state-of-the-art AI technology.
          </p>

          {/* Sign-in or File Upload Section */}
          <div className="w-full mt-4">
            {isAuth ? (
             
              <FileUpload/>
            ) : (
              <Link href="/sign-in">
                {/* Better button structure using icon inside */}
                <Button>
                  LogIn to get started
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
