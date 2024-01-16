import { ApiProperty } from "@nestjs/swagger";
import { ProfessionModel } from "../../models/profession.model";

export abstract class PlaceRegisterRequestDto {

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    date_birth: string;

    @ApiProperty({ type: String })
    cpf: string;

    @ApiProperty({ type: String })
    telefone: string;
    
    @ApiProperty({ type: String })
    obs: string;

    @ApiProperty({ type: String })
    professionId: string;

    @ApiProperty({ type: String })
    professionName: ProfessionModel;

}