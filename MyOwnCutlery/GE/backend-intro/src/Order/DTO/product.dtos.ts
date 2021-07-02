
import { Num } from '../../Shared/Models/ValueObjects/Mobile.ValueObject';
import {State, STATE} from '../Model/OrderState.Models';
import {UserDTO} from '../../User/DTO/user.dtos';



export class ProductDTO {
  Name: String;
  Sum: Number;
  

  constructor(Name:String,Sum:Number){
      this.Name=Name;
      this.Sum=Sum;
  }
}


export function generateProductDTO(Name:String,Sum:Number) : ProductDTO{
    var n=Name;
    var s=Sum;

  return new ProductDTO(n,s);
}

