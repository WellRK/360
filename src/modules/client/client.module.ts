import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtFactory } from "../../shared/factories/jwt-factory";
import { ZenviaRepository } from "../../shared/repositories/zenvia.repository";
import { S3Repository } from "../../shared/repositories/s3.repository";
import { JwtStrategyClient } from "../../shared/strategies/jwt-strategy-client";
import { DatabaseModule } from "../_database/database.module";
import { AuthenticationController } from "./controllers/authentication.controller";
import { UserController } from "./controllers/user.controller";
import { ProfileClientRepository } from "./repositories/profile.repository";
import { RequestProfileRepository } from "./repositories/request-profile.repository";
import { UserClientRepository } from "./repositories/user-client.repository";
import { VerificationRepository } from "./repositories/verification.repository";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { VerificationService } from "./services/verification.service";
import { CepRepository } from "../../shared/repositories/cep-repository";
import { SendgridRepository } from "../../shared/repositories/sendgrid.repository";
import { SendGridModule } from "@ntegral/nestjs-sendgrid";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnviromentVariablesEnum } from "../../shared/enums/enviroment.variables.enum";
import { PlaceRepository } from "./repositories/place.repository";
import { PlaceController } from "./controllers/place.controller";
import { PlaceService } from "./services/place.service";
import { ProfessionRepository } from "./repositories/profession.repository";
import { ProfessionService } from "./services/profession.service";


@Module({
    imports: [
        HttpModule,

        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync(jwtFactory),


        SendGridModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: async (
                configService: ConfigService,
            ) => ({
                apiKey: configService.get(EnviromentVariablesEnum.SENDGRID_API_KEY),
            }),
            inject: [
                ConfigService,
            ]
        }),

        DatabaseModule,
    ],
    controllers: [
        AuthenticationController,
        UserController,
        PlaceController,

    ],
    providers: [
        JwtStrategyClient,
        UserClientRepository,
        VerificationRepository,
        ProfileClientRepository,
        PlaceRepository,
        ProfessionRepository,
    
        S3Repository,
      
        AuthenticationService,
        VerificationService,
        UserService,
        PlaceService,
        ProfessionService,
        ZenviaRepository,
        RequestProfileRepository,
        CepRepository,
        SendgridRepository,
    ],
    exports: [
        UserClientRepository,
        ProfileClientRepository,
        RequestProfileRepository,
    ]
})
export class ClientModule { }