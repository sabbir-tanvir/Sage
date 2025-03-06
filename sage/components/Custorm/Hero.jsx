"use client";
import Lookup from "../../data/Lookup";
import { useContext, useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import { MessgaesContext } from "../../Contex/MessagesContex";
import React from "react";
import Colors from "../../data/Colors";
import { UserDetailsContext } from "../../Contex/UserDetailsContext";
import { DialogContext } from "../../app/providor";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from '../../convex/_generated/api';


function Hero() {
    const [userInput, setUserInput] = useState('');
    const {messages, setMessages} = useContext(MessgaesContext);
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);
    const {openDialog, setOpenDialog} = useContext(DialogContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router=useRouter();

    const onGenerate =async(input) => {
        if(!userDetails?.name){
            setOpenDialog(true);
            return;
        }
        setMessages({
            role: 'user',
            content: input
        })

        const workspaceId=await CreateWorkspace({
            user:userDetails._id,
            messages:[{
                role:'user',
                content:input
            }]

        })
        console.log(workspaceId);
        router.push(`/workspace/`+workspaceId);
    }

    return (
        <div className="flex flex-col items-center mt-30 xl:mt-42 gap-2">
            <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
            <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
            <div className="p-5 border rounded-xl max-w-2xl w-full mt-3"
                style={{backgroundColor:Colors.BACKGROUND}}
            >
                <div className="flex gap-2">
                    <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                    ></textarea>
                    {userInput.trim().length > 0 && <ArrowRight 
                    onClick={() => onGenerate(userInput)}
                    className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />}
                </div>
                <div>
                    <Link className="h-5 w-5" />
                </div>
            </div>

            <div className="flex mt-5 flex-wrap max-w-2xl items-center gap-3 justify-center">
                {Lookup.SUGGSTIONS.map((suggestion, index) => (
                    <h2 key={index}
                    onClick={() => onGenerate(suggestion)}
                    className="p-1 px-2 border rounded-full text-gray-400 hover:text-white cursor-pointer"
                    > {suggestion}</h2>
                ))}
            </div>
        </div>
    )
}

export default Hero;
