import { apiClient } from '../../../lib/api/client';
import { supabase } from '../../../lib/supabase/client';
import { Message } from '../../../types';

export const messagesService = {
  send: (bidId: string, content: string) => apiClient.post<Message>('/messages', { bidId, content }),
  history: (bidId: string) => apiClient.get<Message[]>(`/messages/bid/${bidId}`),

  // Realtime subscription - direct to Supabase, bypassing the NestJS API
  // for this one thing, per the decision made when scaffolding this project.
  subscribeToThread(bidId: string, onMessage: (msg: Message) => void) {
    const channel = supabase
      .channel(`bid:${bidId}:messages`)
      .on('broadcast', { event: 'new_message' }, (payload) => onMessage(payload.payload as Message))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  },
};

