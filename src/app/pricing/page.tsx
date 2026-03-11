// app/pricing/page.tsx
export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      features: ['1 Website', '10 GB Storage', '100 GB Bandwidth', 'Free SSL'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$15',
      features: ['10 Websites', '50 GB Storage', 'Unlimited Bandwidth', 'Free SSL', 'Daily Backups'],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$30',
      features: ['Unlimited Websites', '200 GB Storage', 'Unlimited Bandwidth', 'Free SSL', 'Daily Backups', 'Priority Support'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan for your hosting needs.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.highlighted
                  ? 'border-2 border-blue-500 bg-white'
                  : 'border border-gray-200 bg-white'
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <button
                  className={`mt-8 w-full py-2 px-4 border rounded-md text-sm font-medium ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 border-transparent'
                      : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}