import { FormEvent } from 'react';
import { Send } from 'lucide-react';
import Avatar from '../../../components/dashboard/Avatar';
import { mockChatMessages } from '../../../data/mock';

// Real-time chat lives here once Socket.IO is wired up. For now it replays
// the mock thread; the compose box just confirms the message locally.
// TODO: join a Socket.IO room for the bid, send via emit('sendMessage'),
// append messages from the 'message' event, and load history via
// messagesService.getByBid(bidId).
export default function ChatPanel({ notify }: { notify: (message: string) => void }) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    notify('Message sent');
  }

  return (
    <section className="panel full-chat">
      <div className="chat-heading">
        <Avatar initials="AM" color="blue" small />
        <div>
          <strong>Alex Morgan</strong>
          <span>Senior full-stack engineer Â· Shared workspace</span>
        </div>
        <span className="online-dot" /> Online
      </div>
      <div className="chat-messages">
        {mockChatMessages.map((message) => (
          <div className={`message ${message.sent ? 'sent' : ''}`} key={message.id}>
            {!message.sent && <Avatar initials={message.initials} color={message.color} small />}
            <div>
              <p>{message.text}</p>
              <time>{message.time}</time>
            </div>
          </div>
        ))}
      </div>
      <form className="full-compose" onSubmit={handleSubmit}>
        <input placeholder="Type a message..." />
        <button className="button button-primary send-button" type="submit">
          <Send size={15} />
        </button>
      </form>
    </section>
  );
}
