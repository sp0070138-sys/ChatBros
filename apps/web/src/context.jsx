import { createContext,useRef,useState ,useEffect} from "react";
import axios from 'axios';

export const ChatContext = createContext();

export function ChatProvider({children}){

    const [selectedGroup,setSelectedGroup] = useState({});
    const [groupList,setGroupList] = useState(null);

    const [is_authenticated,setIsAuthenticated] = useState(false);

    const groupListRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(()=>{
        const check_authentication = async ()=>{
            const response = await axios.get("http://localhost:8000/Auth/",{withCredentials:true})
            const data = await response.data;
            setIsAuthenticated(data.Login);
        }
        check_authentication();
    },[])

    useEffect(()=>{const connection = ()=>{
        const socket = new WebSocket('ws://localhost:8000/ws/Chat/');
        socketRef.current = socket;
        socketRef.current.onopen = (event)=>{
            console.log('Is open');
        }
        socketRef.current.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            
            setGroupList((prev)=>{
                const array =  prev?.map((value,index)=>{
                   
                    if (data.message?.index===index){
                        return {...value,messages:[...value.messages,{group_name:data.group_name,message:data.message}]};
                        
                    }
                    return value;
                })

                return array;
            })
            
        }
        return ()=>{if(socketRef.current && socketRef.current.readyState === WebSocket.OPEN){socketRef.current.close()}}}

        if (is_authenticated && socketRef.current===null){
            connection();
        }

    },[is_authenticated])

    useEffect(()=>{
        const get_chat_groups = async ()=>{
            const response = await axios.get('http://localhost:8000/get_create_group/',{withCredentials:true})

            const data = await response.data;

            setGroupList(data.group_list);
        }
        if (is_authenticated){
            get_chat_groups();
        }
    },[is_authenticated])

    useEffect(()=>{
        console.log(groupList);
    },[groupList])

    const value = {selectedGroup,setSelectedGroup,groupList,setGroupList,is_authenticated,setIsAuthenticated,socketRef};
    return (
        <>
            <ChatContext.Provider value = {value}>
                {children}
            </ChatContext.Provider>
        </>
    )
}