import { ApiProperty } from "@nestjs/swagger";

export abstract class ProfessionRegisterRequestDto {

    @ApiProperty({ type: String })
    name: string;
}