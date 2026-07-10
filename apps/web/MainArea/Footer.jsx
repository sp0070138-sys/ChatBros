import send from '../assets/send.svg';
import attach from '../assets/attach.svg';
import { Send } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { useContext, useRef } from 'react';
import { ChatContext } from '@/context';
import { useState } from 'react';

function Footer() {
    const { socketRef,selectedGroup,setSelectedGroup } = useContext(ChatContext);

    const textRef = useRef(null);
    const [image,setImage] = useState(null);

    const send_message = (text, url = null,index) => {

        setSelectedGroup((prev)=>{
            return {...prev,messages:[...prev.messages,{group_name:selectedGroup?.name,message:{text:text,url:url,index:index}}]}
        })

        const cloudinary_upload = async (url) => {
            const formdata = new FormData();
            formdata.append('file', url);
            formdata.append('upload_preset', "f03pq7p8");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dqlv9g2p5/image/upload",formdata);
            const data = await response.data;
            url = data.secure_url;
        }

        if (url){
            cloudinary_upload(url);
        }

        socketRef.current.send(JSON.stringify({
            group_name:selectedGroup?.name,
            message:{text: text, url: url,index:index}
        }))
    }

    return (
        <>
            <div className="w-full h-full pb-2 flex justify-center z-10">
                <div className="w-[40rem] h-full px-4 gap-4 flex items-center">
                    <div className="bg-slate-800 shadow-sm w-full h-full gap-4 px-4 rounded-lg flex items-center">
                        <button className="w-fit h-fit py-3 rounded-lg text-sm bg-transparent text-white"><img src={attach} className=" rotate-[-30deg] opacity-50">
                        </img></button>
                        <input onKeyUp={(e)=>{
                            if (e.key==="Enter"){
                                send_message(textRef.current.value,image,selectedGroup?.index);
                                
                            }
                        }} ref = {textRef} className="outline-none text-sm w-full placeholder:text-white/80" placeholder="Send messages"></input>
                        <Button onClick={() => {send_message(textRef.current.value,image,selectedGroup?.index) }} className="text-white bg-blue-400 hover:bg-blue-500 cursor-pointer">
                            <Send />
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;