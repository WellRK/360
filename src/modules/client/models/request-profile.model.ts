import { Column, Entity, Unique } from "typeorm";
import { BaseModel } from "../../../shared/model/base.model";
import { RequestProfileStatusEnum } from "../enums/request-profile-status.enum";

@Entity({ name: 'request_profile' })
@Unique('unique_user_profile', ['userId', 'profileId'])
export class RequestProfileClientModel extends BaseModel<RequestProfileClientModel> {

    @Column({ type: 'enum', enum: RequestProfileStatusEnum, nullable: false })
    status: string;

    @Column({ nullable: true, name: 'user_id' })
    userId: string;

    @Column({ nullable: true, name: 'profile_id' })
    profileId: string;

    @Column({ nullable: true })
    document: string;
}