import { Sparkles } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="bg-card border-b border-border p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-4 shadow-lg">
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">청년주택담보대출 AI</h1>
          <p className="text-sm text-muted-foreground mt-1">스마트한 주택 대출 상담</p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
