import { MessageSquare } from "lucide-react";

interface ChatMessageProps {
  message: string;
  time: string;
  followUps?: string[];
  followUpPrompt?: string;
  onFollowUpClick?: (question: string) => void;
  disableFollowUps?: boolean;
}

const ChatMessage = ({
  message,
  time,
  followUps,
  followUpPrompt,
  onFollowUpClick,
  disableFollowUps = false,
}: ChatMessageProps) => {
  return (
    <div className="flex gap-3 items-start">
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md flex-shrink-0">
        <MessageSquare className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex-1 bg-card rounded-2xl p-4 shadow-sm">
        <p className="text-foreground leading-relaxed">{message}</p>
        {followUps && followUps.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {followUpPrompt && (
              <p className="w-full text-sm text-muted-foreground mb-1">
                {followUpPrompt}
              </p>
            )}
            {followUps.map((followUp) => (
              <button
                key={followUp}
                type="button"
                className="rounded-full border border-primary/40 bg-background px-4 py-2 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => onFollowUpClick?.(followUp)}
                disabled={disableFollowUps || !onFollowUpClick}
              >
                {followUp}
              </button>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">{time}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
