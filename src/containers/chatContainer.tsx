import { useState } from 'react';
import ChatList from './chatList';
import ChatDetails from './chatDetail';
import { ChatSession } from '../types/chat';
import Header from '../components/Header';
import { IoIosArrowBack } from "react-icons/io";



const ChatContainer = () => {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

  const handleSelectChat = (session: ChatSession) => {
    setSelectedChat(session);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)]">
      <Header />
      <div className="hidden md:flex w-full h-full">
        <div className="w-2/5 border-2 border-indigo-200 m-2 rounded-lg overflow-auto">
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className="w-3/5 border-2 border-indigo-200 m-2 rounded-lg overflow-auto bg-blue-50">
          {selectedChat ? (
            <ChatDetails key={selectedChat.id} session={selectedChat} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>Select a chat session to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:hidden p-2 w-full h-full ">
        {selectedChat ? (
          <div className="w-full flex flex-col border-2 border-indigo-200 rounded-lg sticky top-2 overflow-hidden">
            <div className="flex items-center gap-4 border-b-2 border-blue-200 p-2 bg-white z-10">
              <button onClick={handleBackToList} className="text-blue-500">
                <IoIosArrowBack />
              </button>
              <h2 className="text-base font-semibold">{selectedChat.name}</h2>
            </div>
            <div className="flex-grow p-2 overflow-auto bg-blue-50">
              <ChatDetails session={selectedChat} /> 
            </div>
          </div>
        ) : (
          <div className="w-full border-2 border-indigo-200 md:m-2 rounded-lg overflow-auto">
            <ChatList onSelectChat={handleSelectChat} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
