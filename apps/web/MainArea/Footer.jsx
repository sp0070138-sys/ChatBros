import send from '../assets/send.svg';
import attach from '../assets/attach.svg';

function Footer() {
    return (
        <>
            <div className="w-full h-full pb-2 flex justify-center z-10">
                <div className="w-[40rem] h-full px-4 gap-4 flex items-center">
                    <div className="bg-white shadow-sm w-full h-full gap-4 px-4 rounded-full flex items-center">
                        <button className="w-fit h-fit py-3 rounded-lg text-sm bg-transparent text-white"><img src={attach} className="invert rotate-[-30deg] opacity-50">
                        </img></button>
                        <input className="outline-none text-sm w-full" placeholder="Send messages"></input>
                       <button className="w-fit h-fit py-3 px-2 rounded-lg text-sm bg-transparent text-white"><img src={send} className=" opacity-70 w-5">
                        </img></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;