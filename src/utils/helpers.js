import {
  ShieldCheck,
  ArrowLeftRight,
  Smartphone,
  Zap,
  Globe,
  CreditCard,
  TrendingUp,
  Lock,
  Send,
  BarChart3,
  DollarSign,
  User,
  Stars,
} from "lucide-react";

const iconMap = {
  ShieldCheck,
  ArrowLeftRight,
  Smartphone,
  Zap,
  Globe,
  CreditCard,
  TrendingUp,
  Lock,
  Send,
  BarChart3,
  DollarSign,
  User,
  Stars,
};

// Get icon component by name
export const getIcon = (iconName, size = 24, className = "") => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon size={size} className={className} /> : null;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Animation variants
export const fadeInVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export const slideInLeftVariant = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export const slideInRightVariant = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export const scaleInVariant = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// Generate avatar color based on initials
export const getAvatarColor = (initials) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];
  return colors[initials.charCodeAt(0) % colors.length];
};
