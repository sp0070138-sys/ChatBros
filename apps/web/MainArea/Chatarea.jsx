import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Message from "./Message.jsx";
import Bg from '../assets/Bg.jpg';

function Chatarea(){
    return (
        <section className = "w-full h-screen grid grid-cols-1 grid-rows-[3.5rem_1fr_4rem] gap-2 bg-slate-100 relative" >

            

            <div className = "absolute top-0 left-0 opacity-30 w-full h-full" style = {{background:`url(${Bg})`}}>

            </div>
            
            <Header />

            <div className = "w-full h-full flex justify-center z-10">
                <div className = "w-[40rem] flex flex-col justify-end">
                <Message />
                </div>
            </div>

            <Footer />

        </section>
    )
}

export default Chatarea;