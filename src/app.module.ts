import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscogsClientModule } from './discogs-client/discogs-client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscogsClientModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
