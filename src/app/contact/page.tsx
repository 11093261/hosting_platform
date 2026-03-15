import Button from "@/components/Button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-4">Get in Touch</h1>
      <p className="text-center text-gray-600 mb-8">
        Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <Button variant="primary" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}