import { useContext, useState ,useRef} from 'react';
import logo from '../assets/logo.png';
import more from '../assets/more.svg';
import menu from '../assets/menu.svg';
import axios from 'axios';
import { CameraIcon, LogOutIcon, PencilIcon, Plus, SearchIcon, UserIcon } from 'lucide-react';
import GroupTile from './GroupTile';
import { ChatContext } from '../src/context.jsx';
import { Button } from '@workspace/ui/components/button';
import { Input} from '@workspace/ui/components/input';
import {Label} from "@workspace/ui/components/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from '@workspace/ui/components/input-group';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
import { Textarea } from '@workspace/ui/components/textarea';
import {Separator} from '@workspace/ui/components/separator';

function Sidbar() {
    const { groupList } = useContext(ChatContext);

    const create_group = async (name, profile_photo = null, about_group) => {

        const formdata = new FormData();
        formdata.append('file',profile_photo);
        formdata.append('upload_preset','f03pq7p8');

        if (profile_photo) {
            const cloudinary_response = await axios.post("https://api.cloudinary.com/v1_1/dqlv9g2p5/image/upload", formdata);
            const data = await cloudinary_response.data;
            profile_photo = data.secure_url;
        }

        const response = await axios.post("http://localhost:8000/get_create_group/", {
            name: name, profile_photo: profile_photo, about_group: about_group
        }, { withCredentials: true }
        )

        const data = await response.data;

        console.log(data);

    }
    const [Isopen, setIsOpen] = useState(false);
    const [profile_photo,setProfile_photo] = useState(null);

    const nameRef = useRef(null);
    const about_groupRef = useRef(null);

    return (
        <>
            <section className="w-full h-full grid grid-cols-1 grid-rows-[3.3rem_1fr] relative bg-gray-900 border-gray-800 border-r-2 border-solid">

                <div className="w-full h-full py-1 px-2 flex items-center">

                    <DropdownMenu >
                        <DropdownMenuTrigger className="bg-transparent" render={<Button variant="ghost" />}><img src={menu} className="w-5 cursor-pointer opacity-60"></img></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 text-xs cursor-pointer">
                            <DropdownMenuItem onClick={() => { setIsOpen(true) }} className="text-xs cursor-pointer focus:bg-gray-700/70"><Plus className="w-4" />Add Group</DropdownMenuItem>

                            <DropdownMenuSeparator></DropdownMenuSeparator>
                            <DropdownMenuItem className="text-xs cursor-pointer focus:bg-gray-700/70"><PencilIcon className="w-4" />Edit Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer" variant="destructive"><LogOutIcon className="w-4" />Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Search messages Input */}

                    <InputGroup className="h-10 border-0 rounded-full">
                        <InputGroupInput className="text-xs placeholder:text-xs" placeholder="Search messages..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Group create sheet */}

                    <Sheet open={Isopen} onOpenChange={setIsOpen}>
                        <SheetTrigger></SheetTrigger>

                        <SheetContent className="bg-gray-900" side="left">
                            <SheetHeader><SheetTitle className="flex gap-2 items-center">Create Group</SheetTitle></SheetHeader>
                            <label htmlFor = "profile_photo" className = "w-full flex justify-center">
                            <Avatar className="w-48 h-48 cursor-pointer ">
                                <AvatarImage src = {profile_photo!==null?URL.createObjectURL(profile_photo):""} alt = "shadcn"></AvatarImage>
                                <AvatarFallback className = "bg-gray-800/50 cursor-pointer"><CameraIcon /></AvatarFallback>
                            </Avatar>
                            </label>
                            <input onChange = {(e)=>{setProfile_photo(e.target.files[0])}} type = "file" accept = "images" className = "hidden" id = "profile_photo"></input>
                            
                            <div className = "w-full flex flex-col justify-around px-4 gap-2">
                                
                                <Input ref = {nameRef} placeholder='ex-Avengers' className = "text-xs" />
                                <Textarea ref = {about_groupRef} className = "h-44" placeholder='eg-give a summary about group'></Textarea>
                                
                            </div>
                            <SheetFooter><Button onClick={()=>{create_group(nameRef.current.value,profile_photo,about_groupRef.current.value)}} className = "cursor-pointer bg-blue-400 hover:bg-blue-500 text-white"><Plus />Create</Button></SheetFooter>
                        </SheetContent>
                    </Sheet>

                </div>

                {/* chat group list */}

                <div className="w-full h-full flex flex-col justify-start overflow-y-auto">
                    {
                        groupList?.map((value, index) => {
                            console.log(value?.messages);
                            return (
                                <>
                                    <GroupTile messages = {value?.messages} name={value?.name} index = {index} profile_photo={value?.profile_photo} last_message = {value?.messages?.at(-1)?.message?.text || "No messages"} />
                                </>
                            )
                        })
                    }
                </div>

            </section>
        </>
    )
}

export default Sidbar;