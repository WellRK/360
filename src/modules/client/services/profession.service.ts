import { Injectable } from "@nestjs/common";
import { ProfessionRepository } from "../repositories/profession.repository";
import { ProfessionRegisterRequestDto } from "../dtos/place/profession.dto";
import { ProfessionRegisterResponseDto } from "../dtos/place/profession-register-response.dto";
import { ProfessionGetResponseDto } from "../dtos/place/profession-get-response.dto";

  
  @Injectable()
  export class ProfessionService {
  
      constructor(
          
          private readonly _professionRepository: ProfessionRepository,
  
      ) { }
  
  
    
    
  
      async register(dto: ProfessionRegisterRequestDto): Promise<ProfessionRegisterResponseDto> {
          
        const result = await this. _professionRepository.save(dto);
    
        return new ProfessionRegisterResponseDto(result._id, result.name);
      
      }
      
      async getById(_id: string): Promise<ProfessionGetResponseDto> {
        return this._professionRepository.getById(_id);
    }
  
    //   async delete(_id: string): Promise<boolean> {
    //       const place = await this._userRepository.getById(_id);
    //       if (!place) {
    //           throw new NotFoundException(`Place with ID ${_id} not found`);
    //       }
    //       await this._userRepository.delete(_id);
    //       return true;
    //   }
  
   
      
  }
  
  
