import axios from 'axios';
import { ChatSessionsResponse } from '../types/chat';

const BASE_URL = "https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions";

export const fetchChatSessions = async (page: number, perPage: number = 10): Promise<ChatSessionsResponse> => {
  const response = await axios.get(`${BASE_URL}?page=${page}&per_page=${perPage}`);
  return response.data;
};
