import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// @ts-ignore
import { v4 } from 'uuid-mongodb';
import {
  CANT_CREATE,
  CANT_DELETE,
  CANT_GET,
  CANT_UPDATE,
} from './phone.errors';
import { Phone } from './schemas/phone.schema';

const phones: Array<Phone> = [];

@Injectable()
export class PhonesService {
  private readonly logger = new Logger(PhonesService.name);
  constructor(
    @InjectModel(Phone.name) private phoneModel: Model<Phone & Document>,
  ) {}

  async getPhones(): Promise<Array<Phone>> {
    try {
      return await this.phoneModel.find().exec();
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(CANT_GET);
    }
  }

  async updatePhone(phone: Phone) {
    try {
      await this.phoneModel.updateOne({ _id: phone._id }, { ...phone });
      return phone;
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(CANT_UPDATE);
    }
  }

  addPhone(
    number: string,
    type: string,
    serial: string,
    color: string,
    metadata: object,
  ) {
    try {
      const createPhone = new this.phoneModel({
        _id: v4(),
        number,
        type,
        serial,
        color,
        metadata,
      });

      return createPhone.save();
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(CANT_CREATE);
    }
  }

  async deletePhone(_id: string) {
    try {
      await this.phoneModel.deleteOne({ _id });
      return await this.getPhones();
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(CANT_DELETE);
    }
  }
}
