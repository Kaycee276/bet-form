import 'dotenv/config';
import { PrismaService } from './src/prisma/prisma.service';

async function main() {
  const service = new PrismaService();
  await service.onModuleInit();
  const count = await service.user.count();
  console.log('User count:', count);
  await service.onModuleDestroy();
  process.exit(0);
}
main().catch(e => {
  console.error(e);
  process.exit(1);
});
