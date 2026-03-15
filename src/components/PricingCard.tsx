import { Plan } from "@/types";
import Button from "./Button";

interface PricingCardProps {
  plan: Plan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`border rounded-lg p-6 shadow-sm ${
        plan.isPopular ? "border-blue-500 shadow-lg" : ""
      }`}
    >
      {plan.isPopular && (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Most Popular
        </span>
      )}
      <h2 className="text-2xl font-bold mt-2">{plan.name}</h2>
      <p className="text-4xl font-bold my-4">
        ${plan.price}
        <span className="text-lg font-normal text-gray-600">/mo</span>
      </p>
      <ul className="mb-6 space-y-2">
        <li>✓ {plan.storage} Storage</li>
        <li>✓ {plan.bandwidth} Bandwidth</li>
        <li>✓ {plan.websites} Website{plan.websites > 1 ? "s" : ""}</li>
        {plan.features.map((feature, i) => (
          <li key={i}>✓ {feature}</li>
        ))}
      </ul>
      <Button variant={plan.isPopular ? "primary" : "secondary"} className="w-full">
        {plan.cta || "Choose Plan"}
      </Button>
    </div>
  );
}