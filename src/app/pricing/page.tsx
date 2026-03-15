import { prisma } from '../lib/prisma';
import PricingCard from '@/components/PricingCard';
import { Plan } from '@/types';

export default async function PricingPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { price: 'asc' },
  });
  console.log('Fetched plans:', plans);

  // Transform Prisma result to match the Plan interface
  const transformedPlans: Plan[] = plans.map((plan) => ({
    ...plan,
    features: Array.isArray(plan.features) ? (plan.features as string[]) : [],
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan for your hosting needs.
          </p>
        </div>

        {transformedPlans.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {transformedPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12">
            No pricing plans available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}