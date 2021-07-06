import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { Phone, PhoneSchema } from './schemas/phone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
  ],
  providers: [PhonesService],
  controllers: [PhonesController],
})
export class PhonesModule {}
