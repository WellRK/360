import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
import { JwtPayloadClientInterface } from "../../../shared/interfaces/jwt-payload-client.interface";
import { AuthenticateRequestDto } from "../dtos/authentication/authenticate-request.dto";
import { AuthenticateResponseDto } from "../dtos/authentication/authenticate-responsedto";
import { UserStatusEnum } from "../enums/user-status.enum";
import { UserClientRepository } from "../repositories/user-client.repository";
import { VerificationService } from "./verification.service";
import { UserRegisterRequestDto } from "../dtos/user/user-register-request.dto";
import * as bcrypt from 'bcryptjs';
import { UserClientModel } from "../models/user-client.model";

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly _userRepositry: UserClientRepository,
        private readonly _verificationService: VerificationService,
        private readonly _configService: ConfigService,
        private readonly _jwtService: JwtService,
    ) { }

    
    
    private async validate(email: string, password: string): Promise<UserClientModel> {

        const client = await this._userRepositry.getByEmail(email);

        if (client) {
            // if (client.status === ClientStatusEnum.inactive)
            //     throw new UnauthorizedException('Authenticate error!');

            if (await bcrypt.compare(password, client.password))
                return client;
        }

        return null;
    }

      
 
    async authenticate(dto: AuthenticateRequestDto): Promise<AuthenticateResponseDto> {

        const client = await this.validate(dto.email, dto.password);

        if (!client)
            throw new NotFoundException('Invalid email and password!');

        const token = this._createToken(
            client._id,
            client.email,
        );

        return new AuthenticateResponseDto(
            client.email,
            token.accessToken,
        );
    }

   
    private _createToken(userId: string, email: string) {
        const client: JwtPayloadClientInterface = { userId, email };
        const expiresIn = this._configService.get(EnviromentVariablesEnum.JWT_EXPIRATION);
        const accessToken = this._jwtService.sign(client, { expiresIn });
        return { accessToken, expiresIn };
    }
}