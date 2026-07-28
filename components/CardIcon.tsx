import {
  Calendar,
  CalendarDays,
  CalendarRange,
  Clock,
  type LucideIcon,
} from 'lucide-react';

const EMOJI_ICON_MAP: Record<string, LucideIcon> = {
  '🕐': Clock,
  '📅': Calendar,
  '📆': CalendarDays,
  '🗓️': CalendarRange,
};

interface CardIconProps {
  emoji: string;
  className?: string;
}

export default function CardIcon({ emoji, className = 'w-9 h-9' }: CardIconProps) {
  const Icon = EMOJI_ICON_MAP[emoji] ?? Calendar;

  return (
    <div className="icon-box icon-box-blue">
      <Icon className={className} strokeWidth={2} aria-hidden />
    </div>
  );
}
