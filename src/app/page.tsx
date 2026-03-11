import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Fast, Secure, and Affordable Hosting
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get your website online in minutes with 99.9% uptime and 24/7 support.
        </p>
        <div className="space-x-4">
          <Link href="/pricing">
            <Button variant="primary">View Plans</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">Contact Sales</Button>
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Lightning Fast",
            desc: "SSD storage and optimized servers for blazing speed.",
          },
          {
            title: "99.9% Uptime",
            desc: "Your site stays online with our reliable infrastructure.",
          },
          {
            title: "24/7 Support",
            desc: "Our experts are here to help anytime, day or night.",
          },
        ].map((item, i) => (
          <div key={i} className="text-center p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6">
          Choose the perfect plan for your website and launch today.
        </p>
        <Link href="/pricing">
          <Button variant="primary">See Pricing</Button>
        </Link>
      </section>
    </div>
  );
}