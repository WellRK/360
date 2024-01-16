import { UserClientModel } from "../../models/user-client.model";

export class VerificationRegisterRequestDto {
    constructor(
        public attempt: number,
        public deadline: Date,
        public user: UserClientModel,
        public code: number,
    ) { }
}