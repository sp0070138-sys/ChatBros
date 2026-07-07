import { useContext } from "react";
import { ChatContext } from "../src/context.jsx";

function GroupTile({name = "",profile_photo = "",index}){
    const {selectedGroup,setSelectedGroup} = useContext(ChatContext);
    return (
        <>
            <div onClick={()=>{setSelectedGroup({name : name,profile_photo:profile_photo,index:index})}} className = " flex justify-between px-4 py-2 w-full h-[3rem] cursor-pointer duration-[0.4s] hover:bg-slate-100 rounded-lg">
                <div className = "w-5 h-fit rounded-full overflow-auto">
                    <img src = {profile_photo} className = "w-5 h-5 rounded-full"></img>
                </div>
            </div>
        </>
    )
}

export default GroupTile;