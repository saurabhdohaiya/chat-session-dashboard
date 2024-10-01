import { ChatSession } from '../types/chat';
import UserIcon from '../components/UserIcon'; 
import BotIcon from '../components/AiIcon';

interface ChatDetailsProps {
  session: ChatSession;
}

const ChatDetails = ({ session }: ChatDetailsProps) => {
  return (
    <div className="flex flex-col w-full p-0 overflow-hidden h-full">
      <h2 className="hidden md:flex text-xl p-4 font-semibold border-b-2 border-blue-200 sticky top-0 bg-white z-10">
        {session.name}
      </h2>
      <div className='flex flex-col overflow-auto md:m-2'>
      {session.messages.map((message) => (
        <div 
        key={message.id} 
        className={`flex ${message.action === 'USER' ? 'justify-end' : 'justify-start'} my-2 p-2`}
        >
          {message.action !== 'USER' && <BotIcon />} 
          <div className={`p-2 mx-1 rounded-lg ${message.action === 'USER' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            <p className='text-sm'>{message.content}</p>
            <span className={`text-xs ${message.action === 'USER' ? 'text-gray-200' : 'text-gray-500'}`}>{new Date(message.timestamp).toLocaleString()}</span>
          </div>
          {message.action === 'USER' && <UserIcon />}
        </div> 
      ))}
      </div>
    </div>
  );
};

export default ChatDetails;
