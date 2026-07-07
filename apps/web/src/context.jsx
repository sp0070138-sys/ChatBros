import { createContext,useRef,useState ,useEffect} from "react";
import axios from 'axios';

export const ChatContext = createContext();

export function ChatProvider({children}){

    const [selectedGroup,setSelectedGroup] = useState(null);
    const [groupList,setGroupList] = useState([]);

    const groupListRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(()=>{const connection = ()=>{
        const socket = new WebSocket('ws://localhost:8000/ws/Chat/');
        socketRef.current = socket;
        socketRef.current.onopen = (event)=>{
            console.log('Is open');
        }
        socketRef.current.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            setGroupList(()=>{
                groupListRef?.current[selectedGroup.index].messages.push(data.message)

                return groupListRef.current;
            })
        }
        return ()=>{socketRef.current.close()}}

        if (groupList && socketRef.current===null){
            connection();
        }

    },[groupList])

    useEffect(()=>{
        const get_chat_groups = async ()=>{
            const response = await axios.get('http://localhost:8000/get_create_group/')

            const data = await response.data;

            setGroupList(data.group_list);
        }
        get_chat_groups();
    },[])

    useEffect(()=>{
        if (groupList){
        groupListRef.current = [...groupList];
        }
    },[groupList])

    const value = {selectedGroup,setSelectedGroup,groupList,setGroupList};
    return (
        <>
            <ChatContext.Provider value = {value}>
                {children}
            </ChatContext.Provider>
        </>
    )
}