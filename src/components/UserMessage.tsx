import { User } from "lucide-react";

interface UserMessageProps {
  message: string;
  time: string;
}

const UserMessage = ({ message, time }: UserMessageProps) => {
  return (
    <div className="flex gap-3 items-start justify-end">
      <div className="flex-1 bg-primary text-primary-foreground rounded-2xl p-4 shadow-sm max-w-[80%] ml-auto">
        <p className="leading-relaxed">{message}</p>
        <p className="text-xs opacity-80 mt-2">{time}</p>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md flex-shrink-0">
        <User className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
  );
};

export default UserMessage;
