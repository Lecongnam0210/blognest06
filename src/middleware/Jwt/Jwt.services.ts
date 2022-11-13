import { Next, UnauthorizedException } from '@nestjs/common';
import * as Jwt from 'jsonwebtoken';
import { SecretKey, ExpiredTime } from '../../lib/enum/enum';

class JwtService {
  async validateToken({ authorization }): Promise<any> {
    try {
      if (!authorization) throw new UnauthorizedException();
      const bearerToken = authorization.split(' ')[1];
      const isValid = Jwt.verify(bearerToken, SecretKey[SecretKey.key]);
      if (!isValid) {
        throw new UnauthorizedException();
      }
      return Next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  async JwtGenerateToken(userId: string, expiresIn = '30 days') {
    try {
      const token = Jwt.sign(
        {
          userId,
        },
        SecretKey[SecretKey.key],
        {
          algorithm: 'HS256',
          expiresIn: expiresIn,
        },
      );
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateToken(userId: string): Promise<any> {
    try {
      const accessToken = await this.JwtGenerateToken(
        userId,
        ExpiredTime[ExpiredTime.ACCESS_TOKEN],
      );
      const refreshToken = await this.JwtGenerateToken(
        userId,
        ExpiredTime[ExpiredTime.ACCESS_TOKEN],
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

const jwtServices = new JwtService();

export default jwtServices;
