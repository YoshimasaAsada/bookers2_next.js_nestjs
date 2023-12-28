import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  // 他のサービスで使う時、moduleでインポートするだけで使えるようにする
})
export class PrismaModule {}
