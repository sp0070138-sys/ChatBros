import { useContext } from "react";
import { ChatContext } from "../src/context.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Label } from "@workspace/ui/components/label";

function GroupTile({name = "",profile_photo = null,index,last_message ,messages}){
    const {selectedGroup,gruopList,setSelectedGroup} = useContext(ChatContext);
    return (
        <>
            <div onClick={()=>{setSelectedGroup({name : name,profile_photo:profile_photo,about_group:"",messages:messages,index:index})}} className = {` flex justify-start items-center gap-2 px-3 py-2 w-full h-fit cursor-pointer duration-[0.4s] hover:bg-gray-800 rounded-0 ${selectedGroup?.index===index?`bg-gray-800`:`bg-gray-0`}`}>
                <Avatar className = "w-12 h-12">
                    <AvatarImage src = {profile_photo} alt = "Shadcn"></AvatarImage>
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className = "flex flex-col gap-1 h-full w-full justify-center ">
                   <Label className = "cursor-pointer opacity-80 w-full h-fit flex justify-between "><span>{name}</span><span className = "text-xs font-normal opacity-70">12:00 AM</span></Label>
                   <Label className = "cursor-pointer font-normal text-xs opacity-70">{last_message}</Label>
                </div>
            </div>
        </>
    )
}

export default GroupTile;