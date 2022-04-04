import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtDecode {
  constructor(private jwtService: JwtService) {}

  async decodeJwtToken(req: Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    return await this.jwtService.verify(token);
  }
}
