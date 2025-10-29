import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const QuickActionCard = ({ icon: Icon, title, description, onClick }: QuickActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 p-5 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] text-left"
    >
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md flex-shrink-0">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default QuickActionCard;
