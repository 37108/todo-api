import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/users.entity';

import { DefaultErrorResponse } from '../errors/error.decorator';

import { LoginDto } from './auth.dto';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class CreatedResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  jwt_token: string;
}

@ApiTags('auth')
@DefaultErrorResponse()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
  })
  @ApiCreatedResponse({
    type: CreatedResponse,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
