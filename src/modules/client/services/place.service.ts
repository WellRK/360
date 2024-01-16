import { Injectable, NotFoundException } from "@nestjs/common";
import { PlaceRepository } from "../repositories/place.repository";
import { PlaceRegisterRequestDto } from "../dtos/place/place.dto";
import { PlaceRegisterResponseDto } from "../dtos/place/place-register-response.dto";
import { UserGetResponseDto } from "../dtos/user/user-get-response.dto";
import { PlaceGetResponseDto } from "../dtos/place/place-get-responde.dto";
import { JwtPayloadClientInterface } from "../../../shared/interfaces/jwt-payload-client.interface";
import { PlaceUpdateRequestDto } from "../dtos/place/place-update-request.dto";
import { PlaceUpdateResponseDto } from "../dtos/place/place-update-response.dto";
import { JwtPayloadPlaceInterface } from "../../../shared/interfaces/jwt-payload-place.interface";
import { ProfessionRepository } from "../repositories/profession.repository";
import { ProfessionModel } from "../models/profession.model";
import { PlaceModel } from "../models/place.model";

@Injectable()
export class PlaceService {

    constructor(
        private readonly _userRepository: PlaceRepository,
        private readonly _professionRepository: ProfessionRepository,

    ) { }

    // async getById(payload: JwtPayloadClientInterface): Promise<PlaceGetResponseDto> {

    //     const result = await this._userRepository.getById(payload.userId);
    //     return result as PlaceGetResponseDto;
    // }

   

    async list(): Promise<PlaceGetResponseDto[]> {
        const result = await this._userRepository.list();
        return result;
    }

    
    async register(dto: PlaceRegisterRequestDto): Promise<PlaceRegisterResponseDto> {
        
        const profession = await this._professionRepository.getById(dto.professionId);
        
        const place = new PlaceModel();
        place.name = dto.name;
        place.date_birth = dto.date_birth;
        place.cpf = dto.cpf;
        place.telefone = dto.telefone;
        place.obs = dto.obs;
        place.professionId = dto.professionId;
        place.profession = profession.name;
        place.professionName = profession;
        
        console.log(place.professionName);
        const result = await this._userRepository.save(place);
    
        return new PlaceRegisterResponseDto(result._id, result.name);
    }

    
    async delete(_id: string): Promise<boolean> {
        
        //const user = await this._userRepository.getById(_id);
        await this._userRepository.delete(_id);

        return true;
    }


    // async update(dto: PlaceUpdateRequestDto): Promise<PlaceUpdateResponseDto> {

    //     //payload: JwtPayloadPlaceInterface, 
    //     const user = await this._userRepository.getById(dto._id);
        
    //     const profession = await this._professionRepository.getById(dto.professionId);
        

    //     const place = new PlaceModel();
    //     place.name = dto.name;
    //     place.date_birth = dto.date_birth;
    //     place.cpf = dto.cpf;
    //     place.telefone = dto.telefone;
    //     place.obs = dto.obs;
    //     place.professionId = dto.professionId;
    //     place.profession = profession.name;
    //     place.professionName = profession;
        
    //     console.log(place.professionName);
    //     const result = await this._userRepository.update(dto._id,place);
    
    //     return new PlaceRegisterResponseDto(dto._id, place.name);
    // }

    async update(dto: PlaceUpdateRequestDto): Promise<PlaceUpdateResponseDto> {
        // Buscar a entidade existente
        const place = await this._userRepository.getById(dto._id);
        if (!place) {
            throw new Error("Place not found");
        }
    
        place.name = dto.name;
        place.date_birth = dto.date_birth;
        place.cpf = dto.cpf;
        place.telefone = dto.telefone;
        place.obs = dto.obs;
       
        if (dto.professionId) {
            const profession1 = await this._professionRepository.getById(dto.professionId);
            if (!profession1) {
                throw new Error("Profession not found");
            }
            place.professionName = profession1;
            place.profession = profession1.name;
            place.professionId = dto.professionId;
        }
    
        await this._userRepository.update(place._id, place);
    
        return new PlaceUpdateResponseDto(place._id, place.name);
    }


    
    
}