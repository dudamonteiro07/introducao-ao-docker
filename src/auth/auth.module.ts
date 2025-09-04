import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratgy';

@Module({
    imports: [
        JwtModule.register({
            secret: 'meu segredo',
            signOptions: {expiresIn: '1d'}
        })
    ],
    providers: [ AuthService, PrismaService, JwtStrategy],
    controllers: [ AuthController]
})
export class authModule {}