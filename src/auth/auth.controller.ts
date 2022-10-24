import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
