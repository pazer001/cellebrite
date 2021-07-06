import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddPhoneDto, UpdatePhoneDto } from './dto/phone.dto';
import { PhonesService } from './phones.service';
import { Phone } from './schemas/phone.schema';

@Controller('phones')
export class PhonesController {
  private readonly logger = new Logger(PhonesController.name);
  constructor(private phonesService: PhonesService) {}
  @Get()
  async getPhones(): Promise<Array<Phone>> {
    try {
      return await this.phonesService.getPhones();
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Put(`:_id`)
  async updatePhone(
    @Param(`_id`) _id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ): Promise<Phone> {
    const phone = new Phone();
    phone._id = _id;
    phone.number = updatePhoneDto.number;
    phone.type = updatePhoneDto.type;
    phone.serial = updatePhoneDto.serial;
    phone.color = updatePhoneDto.color;
    phone.metadata = updatePhoneDto.metadata;

    try {
      return await this.phonesService.updatePhone(phone);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post()
  async addPhone(@Body() addPhoneDto: AddPhoneDto): Promise<Phone> {
    try {
      return await this.phonesService.addPhone(
        addPhoneDto.number,
        addPhoneDto.type,
        addPhoneDto.serial,
        addPhoneDto.color,
        addPhoneDto.metadata,
      );
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete(`:_id`)
  async deletePhone(@Param(`_id`) _id: string): Promise<Array<Phone>> {
    try {
      return await this.phonesService.deletePhone(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
