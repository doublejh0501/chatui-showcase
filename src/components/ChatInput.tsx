import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
  isSending?: boolean;
}

const ChatInput = ({ onSend, isSending = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      const messageToSend = message;
      setMessage("");
      await onSend(messageToSend);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border-t border-border p-4 shrink-0">
      <div className="flex gap-3 items-center max-w-4xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="궁금한 점을 물어보세요..."
          className="flex-1 px-6 py-4 bg-input rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="rounded-full bg-gradient-to-br from-primary to-primary/80 p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="h-6 w-6 text-primary-foreground" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
