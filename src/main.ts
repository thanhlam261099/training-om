import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
// import { JwtGuard } from './common/guard/jwt-auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   session({
  //     secret: process.env.JWT_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.useGlobalGuards(new JwtGuard());
  dotenv.config();
  await app.listen(3000);
}
bootstrap();
