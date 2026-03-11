import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About HostingCo</h1>
      <div className="max-w-3xl mx-auto prose prose-lg">
        <p>
          Founded in 2025, HostingCo has been dedicated to providing reliable and
          affordable web hosting solutions to individuals and businesses worldwide.
        </p>
        <p>
          Our mission is to empower everyone to build and grow their online presence
          without technical headaches. We combine cutting-edge technology with
          exceptional customer support to deliver an unmatched hosting experience.
        </p>
        <p>
          We believe in transparency, performance, and putting our customers first.
          Whether you're launching your first blog or running a high-traffic e-commerce
          site, we have the tools and expertise to help you succeed.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Our Values</h2>
        <ul>
          <li>Reliability – We ensure your site is always online.</li>
          <li>Performance – Speed is our priority.</li>
          <li>Support – We're here when you need us.</li>
          <li>Innovation – We stay ahead of the curve.</li>
        </ul>
      </div>
    </div>
  );
}