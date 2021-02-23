import * as mongoose from "mongoose";
import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";

// export const CarSchema = new mongoose.Schema({
//   id: Number,
//   brand: String,
//   color: String,
//   model: String
// });
export  type CarDocument = Car & mongoose.Document;

@Schema()
export class Car {

  @Prop({required:true})
  brand: string;

  @Prop({required:true})
  color: string;

  @Prop({required:true})
  model: string;

}
export const CarSchema = SchemaFactory.createForClass(Car)
