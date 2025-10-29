import { MessageSquare } from "lucide-react";

interface ChatMessageProps {
  message: string;
  time: string;
}

const ChatMessage = ({ message, time }: ChatMessageProps) => {
  return (
    <div className="flex gap-3 items-start">
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md flex-shrink-0">
        <MessageSquare className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex-1 bg-card rounded-2xl p-4 shadow-sm">
        <p className="text-foreground leading-relaxed">{message}</p>
        <p className="text-xs text-muted-foreground mt-2">{time}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
