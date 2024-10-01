import { ChatSession } from '../types/chat';
import { formatDate } from '../utils/formatDate';

interface ChatModalProps {
  session: ChatSession | null;
  onClose: () => void;
}

const ChatModal = ({ session, onClose }: ChatModalProps) => {
  if (!session) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">{session.name}</h2>
        <div className="space-y-2">
          {session.messages.map((message) => (
            <div key={message.id} className={`p-2 ${message.action === 'USER' ? 'text-blue-600' : 'text-green-600'}`}>
              <p className="font-bold">{message.action}</p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">{formatDate(message.timestamp)}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 p-2 bg-blue-600 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default ChatModal;
