import { Button } from '@workspace/ui/components/button';
import { Bell, BellOff, Delete, DeleteIcon, LogOutIcon ,MoreVertical,PencilIcon, Plus, Trash} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { useContext } from 'react';
import { ChatContext } from '@/context';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Label } from '@workspace/ui/components/label';

function Header(){
    const {selectedGroup,setSelectedGroup} = useContext(ChatContext);
    return (
        <>
            <div className = "w-full h-full flex justify-center border-b-0 border-slate-200/30 border-solid z-10">
                <div className = "w-full h-full rounded-0 bg-slate-900 border-b-2 border-solid border-gray-800 flex justify-between items-center py-2 px-4">
                    <div className = "w-fit h-full items-center flex gap-2">
                        <Avatar size = "lg">
                        <AvatarImage src = {selectedGroup?.profile_photo || ""} alt = "Shadcn">

                        </AvatarImage>
                        <AvatarFallback>{selectedGroup?.name || ""}</AvatarFallback>
                    </Avatar>
                    <Label className = "text-sm">{selectedGroup?.name}</Label>
                    </div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className = "bg-transparent hover:bg-gray-800 rounded-full" render={<Button className = "hover:bg-gray-800 cursor-pointer" variant="ghost" />}><MoreVertical opacity = "70%" /></DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className ="bg-gray-800 w-48 text-xs cursor-pointer">

                            <DropdownMenuItem className= "text-xs cursor-pointer focus:bg-gray-700"><Bell className = "w-4" />Mute notifications</DropdownMenuItem>

                            <DropdownMenuSeparator></DropdownMenuSeparator>

                            <DropdownMenuItem className= "text-xs cursor-pointer" variant="destructive"><Trash className = "w-4" />Clear chats</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>s
                </div>
            </div>
        </>
    )
}

export default Header;