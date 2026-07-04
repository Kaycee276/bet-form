import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['info'] });
prisma.$connect().then(() => {
  console.log('Connected successfully!');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
