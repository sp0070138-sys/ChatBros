function Message({text = "Hi! there",url = null,time_stamp = "12:00 AM"}){

    return (
        <div className = "w-full flex justify-end h-fit bg-transparent px-4">
            <div className = "w-fit min-w-[9rem] h-fit px-4 py-2 rounded-[18px] leading-relaxed bg-blue-400 text-white text-sm shadow-sm">
                
                <div style = {{fontFamily:'sans-serif'}} className = "w-full h-fit flex flex-col">
                    <p className = " w-full h-fit justify-start">{text}</p>
                <p className = "text-xs opacity-70 w-full h-fit flex justify-end">{time_stamp}</p>
                
                </div>

            </div>

        </div>
    )
}

export default Message;