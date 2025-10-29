import { Home, Calculator, FileText, HelpCircle } from "lucide-react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import QuickActionCard from "@/components/QuickActionCard";
import ChatInput from "@/components/ChatInput";

const Index = () => {
  const handleSend = (message: string) => {
    console.log("Message sent:", message);
  };

  const quickActions = [
    {
      icon: Home,
      title: "대출 한도",
      description: "청년주택담보대출 한도가 얼마인가요?",
    },
    {
      icon: Calculator,
      title: "금리 정보",
      description: "현재 금리는 어떻게 되나요?",
    },
    {
      icon: FileText,
      title: "필요 서류",
      description: "대출 신청에 필요한 서류는 무엇인가요?",
    },
    {
      icon: HelpCircle,
      title: "자격 조건",
      description: "대출 신청 자격 조건이 어떻게 되나요?",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatHeader />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          <ChatMessage
            message="안녕하세요! 청년주택담보대출 AI 상담사입니다. 대출 한도, 금리, 필요 서류 등 궁금하신 점을 물어보세요."
            time="오후 05:05"
          />

          <div className="space-y-4">
            <h2 className="text-center text-muted-foreground font-medium">자주 묻는 질문</h2>
            <div className="grid gap-4">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={() => handleSend(action.description)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Index;
