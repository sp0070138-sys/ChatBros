import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Message from "./Message.jsx";
import Bg from '../assets/Bg.jpg';
import MessageComponent from "./Message.jsx";
import { useContext } from "react";
import { ChatContext } from "@/context.jsx";

function Chatarea(){
    const {selectedGroup} = useContext(ChatContext);
    return (
        <section className = "lg:w-full h-screen lg:grid lg:grid-cols-1 lg:grid-rows-[3.7rem_27.5rem_4rem] gap-2 bg-gray-900 relative" >

            <div className = "absolute top-0 left-0 opacity-40 w-full h-full invert" style = {{background:`url(${Bg})`}}>

            </div>

            <Header />

            <div className = "w-full h-full flex justify-center z-10  ">
                <div className = "w-[40rem] h-full overflow-y-auto no-scrollbar flex flex-col gap-2">
                {
                    selectedGroup.messages?.map((value,i)=>{
                        return (
                            
                                <MessageComponent key = {i} text = {value.message?.text} url = {value.message?.url} index = {value.message?.index} />
                            
                        )
                    })
                }
                </div>
            </div>

            <Footer />

        </section>
    )
}

export default Chatarea;