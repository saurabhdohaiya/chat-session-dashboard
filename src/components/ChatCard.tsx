import { ChatSession } from '../types/chat';
import { formatDate } from '../utils/formatDate';

interface ChatCardProps {
  session: ChatSession;
  onClick: () => void;
}

const ChatCard = ({ session, onClick }: ChatCardProps) => {
  return (
    <div onClick={onClick} className="border border-blue-200 p-2 md:p-4 rounded-lg shadow-sm hover:bg-blue-200 cursor-pointer">
      <h3 className="text-base font-semibold ">{session.name}</h3>
      <p className="text-xs md:text-sm text-gray-500">
        Last message: {formatDate(session.messages[session.messages.length - 1].timestamp)}
      </p>
    </div>
  );
};

export default ChatCard;
