import { useEffect, useState, useRef } from 'react';
import { fetchChatSessions } from '../api/chatSessionApi';
import { ChatSession } from '../types/chat';
import ChatCard from '../components/ChatCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ShimmerChatCard from '../components/ShimmerChatCard';
import ShimmerPlaceholder from '../components/ShimmerPlacehorder';
import { FaSearch } from "react-icons/fa";

import { DEFAULT_CHAT_SHIMMER } from '../config/config';

interface ChatListProps {
  onSelectChat: (session: ChatSession) => void;
}

const ChatList = ({ onSelectChat }: ChatListProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const chatListRef = useRef<HTMLDivElement>(null); 
  const loadMoreChats = async () => {
    if (page > totalPages || loading) return;

    setLoading(true);
    setFetchError(null);
    try {
        const data = await fetchChatSessions(page);
        setChatSessions((prev) => [...prev, ...data.chat_sessions]);
        setPage(data.current_page + 1);
        setTotalPages(data.pages);
    } catch (error) {
        if (error instanceof Error) {
            setFetchError(`Error fetching chat sessions: ${error.message}`);
            console.error("Error fetching chat sessions:", error);
        } else {
            setFetchError("An unknown error occurred.");
            console.error("Unknown error:", error);
        }
    } finally {
        setLoading(false);
    }
  };

  const filteredChatSessions = chatSessions.filter((session) => {
    const matchesTitle = session.name.toLowerCase().includes(searchTerm.toLowerCase());
    const firstMessageTimestamp = session.messages[0]?.timestamp;
    const matchesDateRange =
      (!startDate || (firstMessageTimestamp && new Date(firstMessageTimestamp) >= new Date(startDate))) &&
      (!endDate || (firstMessageTimestamp && new Date(firstMessageTimestamp) <= new Date(endDate)));
    
    return matchesTitle && matchesDateRange;
  });

  useInfiniteScroll(loadMoreChats, chatListRef);

  useEffect(() => {
    loadMoreChats(); 
  }, []); 

  return (
    <div className="flex flex-col w-full overflow-auto h-full">
      {loading ? (
        <div className='flex flex-col gap-2 md:gap-4 p-2 md:p-4 overflow-hidden'>
          <ShimmerPlaceholder className="h-8 w-full md:w-1/2 mx-2 my-2" />
          <div className="flex flex-col p-2 md:p-4 pb-4 space-y-4 border-b border-blue-200">
            <div className="flex items-center space-x-2">
              <ShimmerPlaceholder className="h-10 w-full rounded" />
              <ShimmerPlaceholder className="h-10 w-20 rounded" />
            </div>
            <div className="flex justify-start items-center space-x-2">
              <ShimmerPlaceholder className="h-10 w-1/3 rounded" />
              <ShimmerPlaceholder className="h-10 w-1/3 rounded" />
            </div>
          </div>
          {Array.from({ length: DEFAULT_CHAT_SHIMMER }, (_, index) => (
            <ShimmerChatCard key={index} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col overflow-hidden'>
          <p className="text-base md:text-lg font-bold p-4 border-b border-blue-200">Available Chat Session</p>
          
          <div className='flex flex-col border-b border-blue-200 p-2 md:p-4 space-y-4'>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by chat title"
                className="border p-2 rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-3 rounded" onClick={loadMoreChats}>
                <FaSearch className='md:hidden'/>
                <p className='hidden md:flex'>Search</p>
              </button>
            </div>
            <div className="flex justify-start items-center space-x-2">
              <div>
                <p className='text-xs md:text-sm'>Start Date</p>
                <input
                  type="date"
                  className="border p-2 text-xs md:text-sm rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <p className='text-xs md:text-sm'>End Date: </p>
                <input
                  type="date"
                  className="border p-2 rounded text-xs md:text-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div ref={chatListRef} className='pr-2 md:p-2 flex flex-col gap-2 md:gap-4 overflow-auto m-2'>
            {fetchError ? (
              <div className='flex justify-center items-center'>
                <p className='font-semibold text-red-600'>{fetchError}</p>
              </div>
            ) : filteredChatSessions.length > 0 ? (
              filteredChatSessions.map((session, index) => (
                <ChatCard 
                  key={`${session.id}-${index}`} 
                  session={session} 
                  onClick={() => onSelectChat(session)} 
                />
              ))
            ) : (
              <div className='flex justify-center items-center'>
                <p className='font-semibold text-red-600'>No Chats found for the applied Search!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
