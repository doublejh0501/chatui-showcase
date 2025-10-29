import { Home, Calculator, FileText, HelpCircle } from "lucide-react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const handleSend = (message: string) => {
    console.log("Message sent:", message);
  };

  const quickActions = [
    {
      icon: Home,
      title: "대출 한도",
      description: "청년주택담보대출 한도가 얼마인가요?",
      answer: "청년주택담보대출의 한도는 최대 4억원까지 가능합니다. 다만, 주택가격의 70% 이내에서 결정되며, 신청자의 소득 및 신용도에 따라 달라질 수 있습니다.",
    },
    {
      icon: Calculator,
      title: "금리 정보",
      description: "현재 금리는 어떻게 되나요?",
      answer: "청년주택담보대출의 금리는 연 3.0%~4.5% 수준입니다. 고정금리와 변동금리 중 선택 가능하며, 소득 수준과 대출 기간에 따라 금리 우대가 적용될 수 있습니다.",
    },
    {
      icon: FileText,
      title: "필요 서류",
      description: "대출 신청에 필요한 서류는 무엇인가요?",
      answer: "주민등록등본, 재직증명서, 소득금액증명원, 건강보험자격득실확인서, 매매계약서 사본, 등기부등본이 필요합니다. 추가로 은행에서 요구하는 서류가 있을 수 있습니다.",
    },
    {
      icon: HelpCircle,
      title: "자격 조건",
      description: "대출 신청 자격 조건이 어떻게 되나요?",
      answer: "만 19세~34세 이하의 청년이며, 연 소득 5천만원 이하, 순자산 3.45억원 이하여야 합니다. 무주택자 또는 1주택자(생애최초 주택구입자)가 대상입니다.",
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
            <Accordion type="single" collapsible className="space-y-3">
              {quickActions.map((action, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/50">
                    <div className="flex items-start gap-4 text-left">
                      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md flex-shrink-0">
                        <action.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    <div className="pl-[4.5rem] pr-4">
                      <p className="text-foreground leading-relaxed">{action.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Index;
