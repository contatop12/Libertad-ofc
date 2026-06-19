import {
  Activity,
  ArrowUpRight,
  Award,
  BarChart,
  BarChart2,
  Briefcase,
  CheckCircle,
  Globe,
  Home,
  Layers,
  Map,
  Search,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  award: Award,
  home: Home,
  "bar-chart-2": BarChart2,
  shield: Shield,
  "shield-check": ShieldCheck,
  globe: Globe,
  users: Users,
  "bar-chart": BarChart,
  layers: Layers,
  search: Search,
  map: Map,
  "check-circle": CheckCircle,
  activity: Activity,
  "arrow-up-right": ArrowUpRight,
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}
