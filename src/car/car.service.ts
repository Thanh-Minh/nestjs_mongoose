import { Injectable ,HttpException} from '@nestjs/common';
import {CARS} from "./cars.mock";
import  {Model}from "mongoose"
import {from}from'rxjs';
import {InjectModel} from '@nestjs/mongoose'
import {ICar} from "./interfaces/car.interface";
import {CarDto} from "./car.dto";
import {CarDocument} from "./schemas/car.schema";

const carProjection={
  __v: false,
  __id: false
}


@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<CarDocument>) {
  }


   async getCars():Promise<CarDto[]> {
   const cars= await this.carModel.find({},carProjection).exec()
    if (!cars || !cars[0]){
      throw new HttpException('Not Found',404)
    }
    return cars
  }

   async postCar(nawCar: CarDto)  {
    const car = await new this.carModel(nawCar);
    return car.save();

  }
  async getCarById(id: number):Promise<CarDto> {
    const car= await this.carModel.findOne({id},carProjection).exec()
    if (!car){
      throw new HttpException('Not Found',404)
    }
    return car

  }
  async  deleteCarById(id:number):Promise<CarDto> {
    const car= await this.carModel.deleteOne({id}).exec()
    if (car.deleteCount ===0){
      throw new HttpException('Not Found',404)
    }
    return car

  }
  async  putCarById(id:number,propertyName:string,propertyValue:string):Promise<CarDto> {
    const car= await this.carModel.findOneAndUpdate({id},{[propertyName]:propertyValue}).exec()
    if (!car){
      throw new HttpException('Not Found',404)
    }
    return car
  }
}
