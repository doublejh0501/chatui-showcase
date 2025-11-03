import { Home, Calculator, FileText, HelpCircle } from "lucide-react";
import { useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import UserMessage from "@/components/UserMessage";
import ChatInput from "@/components/ChatInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Message {
  type: "user" | "ai";
  content: string;
  time: string;
}

type ChatIntent = "informational" | "calculational";

type ChatRole = "assistant" | "system" | "user";

interface ChatMetadataMessage {
  role: ChatRole;
  content: string;
}

interface ChatMetadata {
  mock: boolean;
  generated_at: string;
  trace_id: string;
  messages: ChatMetadataMessage[];
}

interface ChatApiResponse {
  success: true;
  type: ChatIntent;
  category?: string | null;
  data: {
    answer?: string;
    content?: string;
    message?: string;
    result?: number;
    currency?: string;
    explanation?: string;
    params?: Record<string, unknown>;
    sources?: string[] | null;
    [key: string]: unknown;
  };
  metadata?: ChatMetadata | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

const buildChatEndpoint = () =>
  API_BASE_URL ? `${API_BASE_URL}/api/chat` : "/api/chat";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      content: "안녕하세요! 청년주택담보대출 AI 상담사입니다. 대출 한도, 금리, 필요 서류 등 궁금하신 점을 물어보세요.",
      time: "오후 05:05"
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  const formatKoreanTimestamp = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const getCurrentTime = () => formatKoreanTimestamp(new Date());

  const formatGeneratedAtTime = (isoTimestamp?: string | null) => {
    if (!isoTimestamp) {
      return getCurrentTime();
    }

    const parsed = new Date(isoTimestamp);
    if (Number.isNaN(parsed.getTime())) {
      return getCurrentTime();
    }

    return formatKoreanTimestamp(parsed);
  };

  const formatResponseMessage = (response: ChatApiResponse): string => {
    const { data, type, metadata } = response;
    const primaries = [
      data?.answer,
      data?.content,
      data?.message,
      data?.output,
      data?.text,
      data?.response,
    ].filter((part): part is string => typeof part === "string" && part.trim().length > 0);
    if (primaries.length > 0) {
      return primaries.join("\n\n");
    }

    const assistantMessage = metadata?.messages?.find(
      (message) => message.role === "assistant" && message.content.trim().length > 0
    )?.content;
    const sources =
      Array.isArray(data?.sources) && data.sources.every((source) => typeof source === "string")
        ? (data.sources as string[])
        : [];

    if (typeof data?.result !== "undefined") {
      const parts: string[] = [
        `계산 결과: ${data.result}${data.currency ? ` ${data.currency}` : ""}`,
      ];
      if (data.explanation) {
        parts.push(`설명: ${data.explanation}`);
      }
      if (data.params) {
        parts.push(`입력값: ${JSON.stringify(data.params)}`);
      }
      return parts.join(" ");
    }

    const fallbackSegments = [assistantMessage?.trim()].filter(
      (segment): segment is string => !!segment && segment.length > 0
    );
    if (sources.length > 0) {
      const serializedSources = sources
        .map((source, index) => `${index + 1}. ${source}`)
        .join("\n");
      fallbackSegments.push(`참고 자료:\n${serializedSources}`);
    }
    if (fallbackSegments.length > 0) {
      return fallbackSegments.join("\n\n");
    }

    if (type === "informational") {
      return "응답을 불러왔지만 표시할 수 있는 정보를 찾지 못했습니다.";
    }

    if (type === "calculational") {
      return "계산 결과를 해석하지 못했습니다.";
    }

    return "AI 응답을 해석하지 못했습니다.";
  };

  const handleSend = async (message: string) => {
    if (isSending) return;

    const currentTime = getCurrentTime();

    setMessages(prev => [
      ...prev,
      {
        type: "user",
        content: message,
        time: currentTime
      },
      {
        type: "ai",
        content: "답변을 준비중입니다. 곧 응답드리겠습니다.",
        time: getCurrentTime()
      }
    ]);

    setIsSending(true);

    try {
      const response = await fetch(buildChatEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          intent: "informational",
          category: null,
          params: null
        })
      });

      if (!response.ok) {
        throw new Error(`서버 응답이 올바르지 않습니다. (status: ${response.status})`);
      }

      const data: ChatApiResponse = await response.json();
      const aiMessage = formatResponseMessage(data);
      const assistantTime = formatGeneratedAtTime(data.metadata?.generated_at);

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "ai",
          content: aiMessage,
          time: assistantTime
        };
        return updated;
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "ai",
          content: errorMessage,
          time: getCurrentTime()
        };
        return updated;
      });
    } finally {
      setIsSending(false);
    }
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
          <div className="space-y-4">
            {messages.map((msg, index) => (
              msg.type === "user" ? (
                <UserMessage
                  key={index}
                  message={msg.content}
                  time={msg.time}
                />
              ) : (
                <ChatMessage
                  key={index}
                  message={msg.content}
                  time={msg.time}
                />
              )
            ))}
          </div>

          {messages.length === 1 && (
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
                  <AccordionContent className="px-5 pb-5">
                    <div className="pl-[4.5rem] pr-4 pt-2">
                      <p className="text-foreground leading-relaxed">{action.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          )}
        </div>
      </main>

      <ChatInput onSend={handleSend} isSending={isSending} />
    </div>
  );
};

export default Index;
