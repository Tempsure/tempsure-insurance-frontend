import {
  Settings,
  Zap,
  Wrench,
  ShieldCheck,
} from 'lucide-react';

interface IconProps {
  className?: string;
  color?: string;
}

export function GearIcon({ className = 'w-8 h-8', color = '#FF6B35' }: IconProps) {
  return <Settings className={className} color={color} strokeWidth={2} aria-hidden />;
}

export function LightningIcon({ className = 'w-8 h-8', color = '#FFD23F' }: IconProps) {
  return <Zap className={className} color={color} strokeWidth={2} aria-hidden />;
}

export function WrenchIcon({ className = 'w-8 h-8', color = '#06D6A0' }: IconProps) {
  return <Wrench className={className} color={color} strokeWidth={2} aria-hidden />;
}

export function ShieldIcon({ className = 'w-8 h-8', color = '#EF476F' }: IconProps) {
  return <ShieldCheck className={className} color={color} strokeWidth={2} aria-hidden />;
}
