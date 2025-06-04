import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface UserService {
  getUser(data: { id: string }): Observable<{ id: string; name: string }>;
}

@Controller()
export class ProductController {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), 'proto/user.proto'),
    },
  })
  private client: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  constructor(private readonly productService: ProductService) {}

  @Get()
  getUserFromUserService() {
    return this.userService.getUser({ id: '1' });
  }

  @Get('hello')
  getHello(): string {
    return this.productService.getHello();
  }
}
//
