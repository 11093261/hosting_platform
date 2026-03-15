import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: 'Basic',
        price: 5,
        storage: '10 GB',
        bandwidth: '100 GB',
        websites: 1,
        features: ['Free SSL'],
        isPopular: false,
        cta: 'Get Started',
      },
      {
        name: 'Pro',
        price: 15,
        storage: '50 GB',
        bandwidth: 'Unlimited',
        websites: 10,
        features: ['Free SSL', 'Daily Backups'],
        isPopular: true,
        cta: 'Get Started',
      },
      {
        name: 'Business',
        price: 30,
        storage: '200 GB',
        bandwidth: 'Unlimited',
        websites: -1,
        features: ['Free SSL', 'Daily Backups', 'Priority Support'],
        isPopular: false,
        cta: 'Contact Sales',
      },
    ],
    skipDuplicates: true, // avoids errors if already seeded
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });