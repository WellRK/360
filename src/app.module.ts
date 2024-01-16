import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/env/configuration';

import { ClientModule } from './modules/client/client.module';
import { DatabaseSeedModule } from './modules/_database-seed/database-seed.module';
import { DatabaseModule } from './modules/_database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration]
    }),

    DatabaseModule,
    DatabaseSeedModule,
    
    ClientModule,
    
  ],
})
export class AppModule { }
