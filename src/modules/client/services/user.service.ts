import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PaginateResultDto } from "../../../shared/dtos/paginate-result.dto";
import { EnviromentVariablesEnum } from "../../../shared/enums/enviroment.variables.enum";
import { JwtPayloadClientInterface } from "../../../shared/interfaces/jwt-payload-client.interface";
import { S3Repository } from "../../../shared/repositories/s3.repository";
import MaskUtil from "../../../shared/utils/mask.util";
import { UserGetResponseDto } from "../dtos/user/user-get-response.dto";
import { UserRegisterRequestDto } from "../dtos/user/user-register-request.dto";
import { UserRegisterResponseDto } from "../dtos/user/user-register-response";
import { UserUpdateRequestDto } from "../dtos/user/user-update-request.dto";
import { UserUpdateResponseDto } from "../dtos/user/user-update-response";
import { ProfileClientRepository } from "../repositories/profile.repository";
import { UserClientRepository } from "../repositories/user-client.repository";
import { UserDeletedLogicRequestDto } from "../dtos/user/user-deleted-logic-request.dto";
import { UserStatusEnum } from "../enums/user-status.enum";
import { UserUpdateProfileRequestDto } from "../dtos/user/user-update-profile-request.dto";
import { RequestProfileRepository } from "../repositories/request-profile.repository";
import { SendgridRepository } from "../../../shared/repositories/sendgrid.repository";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(
        private readonly _profileRepository: ProfileClientRepository,
        private readonly _userRepository: UserClientRepository,
        private readonly _s3Repository: S3Repository,
        private readonly _configService: ConfigService,
        private readonly _requestProfileRepository: RequestProfileRepository,
        private readonly _sendgridRepository: SendgridRepository
    ) { }

    async getById(payload: JwtPayloadClientInterface): Promise<UserGetResponseDto> {

        const result = await this._userRepository.getById(payload.userId);
        return result as UserGetResponseDto;
    }

    async list(): Promise<UserGetResponseDto[]> {
        const result = await this._userRepository.list();
        return result;
    }
    async listAll(): Promise<PaginateResultDto> {

        const result = await this._userRepository.listAll(
            //status,
            //query.take,
            //query.skip
        );
        return result

    }


    async register(dto: UserRegisterRequestDto): Promise<UserRegisterResponseDto> {

        dto.password = await bcrypt.hash(dto.password, 13);
        const result = await this._userRepository.save(dto);

        return new UserRegisterResponseDto(result._id, result.phone);
    }

   
    async update(payload: JwtPayloadClientInterface, dto: UserUpdateRequestDto): Promise<UserUpdateResponseDto> {

        const user = await this._userRepository.getById(payload.userId);

        dto.phone = MaskUtil.remove(dto.phone);
        dto.cpf = MaskUtil.remove(dto.cpf);

        user.name = dto.name;
        user.phone = dto.phone;
        user.cpf = dto.cpf;

        await this._userRepository.update(user._id, user);
        return new UserUpdateResponseDto(user._id, user.phone);
    }

    async delete(_id: string): Promise<boolean> {
        
        //const user = await this._userRepository.getById(_id);
        await this._userRepository.delete(_id);

        return true;
    }
 
    
}