import { Feature } from "@/types";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
}