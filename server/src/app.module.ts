import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesModule } from './phones/phones.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pazer:x-qJFktQ.ht28MT@cluster0.c3e1q.mongodb.net',
    ),
    PhonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
