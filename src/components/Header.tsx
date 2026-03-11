import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          HostingCo
        </Link>
        <div className="space-x-6 hidden md:block">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Mobile menu button – you can expand later */}
      </nav>
    </header>
  );
}