import { ProfessionModel } from "../../models/profession.model";

export class PlaceGetResponseDto {
    name: string;
    date_birth: string;
    cpf: string;
    telefone: string;
    obs: string;
    profession: string;
    professionName: ProfessionModel;

}