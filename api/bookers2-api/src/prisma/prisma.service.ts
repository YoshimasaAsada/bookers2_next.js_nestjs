import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // PrismaClientをここのprismaserviceに継承させる
  constructor(private readonly config: ConfigService) {
    // DBとの接続確立。.envにあるやつを採用
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
