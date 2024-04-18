import { Injectable,Render } from '@nestjs/common';

@Injectable()
export class AppService {

  @Render('index')
  getHello(): object {
    return { title: 'Title', subtitle: 'Subtitle' };
  }
}
