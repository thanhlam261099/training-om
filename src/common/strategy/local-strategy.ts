// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from 'src/modules/auth/auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(username: string, password: string) {
//     console.log(username, password);
//     const user = await this.authService.signIn(username, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     return user;
//   }
// }
