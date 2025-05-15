import MessageInteraction from "./MessageInteraction";
import MessagesComponent from "./MessageComponent";

const Main =  ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  return (
    <div className="  bg-cover bg-center relative h-full">
      <div className="flex flex-col h-[85%] ">
        <MessagesComponent senderId={senderId} receiverId={receiverId} />
      </div>
      <MessageInteraction receiverId={receiverId} senderId={senderId}/>
    </div>
  );
};
export default Main;
