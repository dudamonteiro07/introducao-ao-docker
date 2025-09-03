import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { jwtModule } from '@nestejs/jwt';
import { jwtStrategy } from '@nest.strategy';

@Module({
    imports: [
        jwtModule.register({
            secret: 'meu segredo',
            signOptions: {expiresin: }
        })
    ]
})