import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//como o controller nao tem argumentos serve para a base do controlers exemplo login
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
