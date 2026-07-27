import {
  Refrigerator,
  WashingMachine,
  Flame,
  Wrench,
  Lightbulb,
  Cpu,
  House,
  Zap,
  ShieldCheck,
  Droplets,
  type LucideIcon,
} from 'lucide-react';

type Category =
  | 'Refrigerators'
  | 'Dishwashers'
  | 'Maintenance'
  | 'Tips & Advice'
  | 'Smart Home'
  | 'Technology'
  | 'Washers & Dryers'
  | 'Ovens & Ranges'
  | 'Energy Savings'
  | 'Safety';

interface Config {
  Icon: LucideIcon;
  accent: string;
}

const config: Record<string, Config> = {
  Refrigerators:    { Icon: Refrigerator,  accent: '#60a5fa' },
  Dishwashers:      { Icon: Droplets,      accent: '#a78bfa' },
  Maintenance:      { Icon: Wrench,        accent: '#2dd4bf' },
  'Tips & Advice':  { Icon: Lightbulb,     accent: '#ffb81c' },
  'Smart Home':     { Icon: House,         accent: '#818cf8' },
  Technology:       { Icon: Cpu,           accent: '#22d3ee' },
  'Washers & Dryers': { Icon: WashingMachine, accent: '#2dd4bf' },
  'Ovens & Ranges': { Icon: Flame,         accent: '#fb923c' },
  'Energy Savings': { Icon: Zap,           accent: '#4ade80' },
  Safety:           { Icon: ShieldCheck,   accent: '#f87171' },
};

const fallback: Config = { Icon: Wrench, accent: '#ffb81c' };

interface Props {
  category: string;
  className?: string;
}

export default function BlogCategoryCard({ category, className = '' }: Props) {
  const { Icon, accent } = config[category] ?? fallback;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ backgroundColor: '#172554' }}
      aria-hidden="true"
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 22px,
            rgba(255,255,255,0.03) 22px,
            rgba(255,255,255,0.03) 23px
          )`,
        }}
      />

      {/* Accent glow behind icon */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          style={{ color: accent, width: '38%', height: '38%', strokeWidth: 1.25 }}
          aria-hidden="true"
        />
      </div>

      {/* Category label — bottom left */}
      <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex items-center gap-2">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {category}
        </span>
        <span className="flex-1 h-px" style={{ backgroundColor: `${accent}40` }} />
      </div>
    </div>
  );
}
