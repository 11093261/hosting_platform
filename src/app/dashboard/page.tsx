import { getCurrentUser } from '../actions/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name || user.email}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Server stats, quick actions, etc. */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Your Servers</h2>
          <p className="text-gray-600">0 active servers</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">New Server</button>
        </div>
        {/* More cards... */}
      </div>
    </div>
  );
}