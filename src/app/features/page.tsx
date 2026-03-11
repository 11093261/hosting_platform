import { Feature } from "@/types";
import FeatureCard from "@/components/FeatureCard";

const features: Feature[] = [
  {
    title: "Lightning Speed",
    description: "Our servers use NVMe SSD storage and LiteSpeed caching for optimal performance.",
    icon: "⚡",
  },
  {
    title: "Free SSL Certificate",
    description: "Secure your site with free Let's Encrypt SSL certificates on all plans.",
    icon: "🔒",
  },
  {
    title: "Daily Backups",
    description: "Automatic daily backups ensure your data is always safe and restorable.",
    icon: "💾",
  },
  {
    title: "99.9% Uptime Guarantee",
    description: "We guarantee your site stays online with our robust infrastructure.",
    icon: "⏱️",
  },
  {
    title: "24/7 Customer Support",
    description: "Our team is available around the clock via chat, email, or phone.",
    icon: "📞",
  },
  {
    title: "1-Click Installer",
    description: "Install WordPress, Joomla, and other apps with a single click.",
    icon: "🚀",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Everything You Need to Succeed</h1>
      <p className="text-center text-gray-600 mb-12">
        Our hosting platform comes packed with features to make your life easier.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} />
        ))}
      </div>
    </div>
  );
}