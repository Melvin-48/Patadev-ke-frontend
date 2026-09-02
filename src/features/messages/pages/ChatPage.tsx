import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Message } from '../../../types';
// TODO: load history via messagesService.history(bidId), subscribe via
// messagesService.subscribeToThread for live updates, send via
// messagesService.send. Remember to unsubscribe on unmount.

export default function ChatPage() {
  const { bidId } = useParams();
  const [messages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col h-[70vh]">
      <h1 className="text-lg font-display font-semibold mb-4">Conversation</h1>
      <div className="flex-1 border border-line rounded p-4 space-y-3 overflow-y-auto">
        {messages.length === 0 && <p className="text-slate text-sm">No messages yet for bid {bidId}.</p>}
      </div>
      <form className="flex gap-2 mt-4" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Write a message" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

