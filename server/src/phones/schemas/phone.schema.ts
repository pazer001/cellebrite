import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Metadata {}

@Schema({ minimize: false, timestamps: true })
export class Phone {
  @Prop()
  _id: string;

  @Prop()
  number: string;

  @Prop()
  type: string;

  @Prop()
  serial: string;

  @Prop()
  color: string;

  @Prop({ type: {} })
  metadata: Metadata;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
