import { useContext,useState } from 'react';
import menu from '../assets/menu.svg';
import logo from '../assets/logo.png';
import more from '../assets/more.svg';
import search from '../assets/search.svg';
import GroupTile from './GroupTile';
import { ChatContext } from '../src/context.jsx';

function Sidbar() {
    const {groupList} = useContext(ChatContext);

    const create_group = ()=>{
        
    }

    return (
        <>
            <section className="w-full h-full grid grid-cols-1 grid-rows-[3rem_3.3rem_1fr] border border-solid border-slate-200 relative">

                <div className="w-full h-full px-4 py-4 gap-2 flex justify-start items-center bg-white">
                    <img src={logo} className="w-10 pt-1 cursor-pointer"></img>
                    <p className="text-base text-blue-500 w-full font-bold opacity-80">ChatBros</p>
                    
                </div>

                <div className="w-full h-full py-1 px-4">
                    <div className="rounded-full bg-slate-100 duration-[0.4s] focus:bg-transparent focus:border-2 focus:border-solid focus:border-blue-400 flex items-center justify-start gap-2 outline-none text-xs w-full px-4 h-full">
                        <img src={search} className="w-5 cursor-pointer invert opacity-40"></img>
                        <input className="outline-none" placeholder="Search messages..."></input>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col justify-start px-4 overflow-y-auto">
                    {
                        groupList.map((value,index)=>{
                            return (
                                <>
                                    <GroupTile name = {value.name} profile_photo = {value.profile_photo} index = {index} />
                                </>
                            )
                        })
                    }
                </div>
                <button className = "w-fit h-fit px-4 py-1 pb-2 shadow-sm text-2xl absolute bottom-5 right-5 rounded-lg bg-blue-400 text-white duration-[0.4s] hover:bg-blue-500 cursor-pointer">+</button>
            </section>
        </>
    )
}

export default Sidbar;