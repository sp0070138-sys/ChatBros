import { Message ,MessageHeader,MessageContent,MessageFooter} from "@workspace/ui/components/message";
import { Bubble,BubbleContent, BubbleReactions } from "@workspace/ui/components/bubble";

function MessageComponent({text = "Deploying to prod real quick.",url = null,index,time_stamp = "12:00 AM"}){

    console.log(text);

    return (
        <Message align = "end">
            <MessageContent>
                <Bubble variant="blue" align = "end">
                    {
                        url && <img className = "rounded-lg w-100" src = {url} alt = "shadcn"></img>
                    }
                    <BubbleContent>{text}</BubbleContent>
                    
                </Bubble>
                <MessageFooter>{time_stamp}</MessageFooter>
            </MessageContent>
        </Message>
    )
}

export default MessageComponent;