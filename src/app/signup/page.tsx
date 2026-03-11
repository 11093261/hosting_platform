"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signup, null);

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      event.preventDefault();
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>

      {state && 'error' in state && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {state.error}
        </div>
      )}

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="terms" name="terms" className="mr-2" required />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </label>
        </div>
        <Button variant="primary" className="w-full" disabled={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}