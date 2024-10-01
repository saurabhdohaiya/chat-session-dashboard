export interface Message {
    id: number;
    action: 'USER' | 'AI';
    content: string;
    timestamp: string;
  }
  
  export interface ChatSession {
    id: number;
    name: string;
    messages: Message[];
    message_count: number;
  }
  
  export interface ChatSessionsResponse {
    chat_sessions: ChatSession[];
    total: number;
    pages: number;
    current_page: number;
  }
  