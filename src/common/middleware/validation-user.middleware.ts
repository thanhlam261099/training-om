import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NestMiddleware,
// } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class Middleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('this is Middleware');
//     console.log(req.headers.authorization);
//     const { authorization } = req.headers;
//     if (!authorization)
//       throw new HttpException('no authorize', HttpStatus.FORBIDDEN);
//     if (authorization === 'asfsgdfshdfjfgkhfdhsgdasf') next();
//     else throw new HttpException('invalid authorize', HttpStatus.FORBIDDEN);
//   }
// }
@Injectable()
export class ValidationUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No authorization token provided!' });
    }
    if (authorization === '123') {
      next();
    } else {
      return res.status(403).send({ error: 'Invalid authorization token!' });
    }
  }
}
