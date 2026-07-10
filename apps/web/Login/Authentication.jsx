import axios from "axios";
import { ChatContext } from '../src/context'
import { useContext, useState, useRef } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from '@workspace/ui/components/dialog';
import { LogInIcon, CameraIcon } from 'lucide-react'
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

function Authentication() {

    const create_account = async (name, photo, about_me = null) => {
        if (photo!==null){
            const formdata = new FormData();
            formdata.append("file",photo)
            formdata.append("upload_preset","f03pq7p8");
            const cloudinary_repsonse = await axios.post("https://api.cloudinary.com/v1_1/dqlv9g2p5/image/upload",formdata);
            const data = await cloudinary_repsonse.data;

            photo = data.secure_url;
        }
        const response = await axios.post('http://localhost:8000/Auth/', JSON.stringify({ name: name, profile_photo: photo, about_me: about_me }),{withCredentials:true});
        const data = await response.data;
        setIsAuthenticated(data.Login);
    }

    const { is_authenticated, setIsAuthenticated } = useContext(ChatContext);
    const [profile_photo, setProfile_photo] = useState(null);
    const nameRef = useRef(null);
    const about_meRef = useRef(null);

    return (
        <div className="absolute">
            <Dialog open={!is_authenticated} onOpenChange={setIsAuthenticated}>

                <DialogContent className=" flex flex-col items-start bg-slate-950">
                    <DialogHeader><DialogTitle className="text-lg">Login</DialogTitle></DialogHeader>
                    <div className="flex flex-col w-full ">
                        <label htmlFor="profile_photo" className="w-full flex justify-center">
                            <Avatar className="w-44 h-44 cursor-pointer">
                                <AvatarImage src={profile_photo!==null?URL.createObjectURL(profile_photo):""}alt="shadcn"></AvatarImage>
                                <AvatarFallback className="bg-slate-800/50"><CameraIcon /></AvatarFallback>
                            </Avatar>
                        </label>
                        <input onChange={(e) => { setProfile_photo(e.target.files[0])}} className="hidden" type="file" accept="images" id="profile_photo"></input>
                        <div className="flex flex-col justify-start gap-4 w-full">
                            <div className="flex flex-col h-fit w-full gap-1">
                                <Label className="opacity-50 text-sm">Name</Label>
                                <Input ref={nameRef} className="focus-visible:ring-blue-400" placeholder="eg-Shivansh"></Input>
                            </div>
                            <div className="flex flex-col h-fit w-full gap-1">
                                <Label className="opacity-50 text-sm">Summary</Label>
                                <Textarea ref={about_meRef} className="h-24"
                                    placeholder="eg-describe your self"></Textarea>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="w-full">

                        <Button onClick={() => { create_account(name = nameRef.current.value, profile_photo, about_meRef.current.value) }} className="w-full bg-blue-600 hover:bg-blue-400 cursor-pointer text-white">Login<LogInIcon /></Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Authentication;