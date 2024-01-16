import { ApiProperty } from "@nestjs/swagger";
import { ProfileClientModel } from "../../models/profile-client.model";

export abstract class UserRegisterRequestDto {

    @ApiProperty({ type: String })
    phone: string;

    @ApiProperty({ type: String })
    password: string;

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    cpf: string;

}