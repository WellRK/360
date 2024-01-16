import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseModel } from "../../../shared/model/base.model";
import { UserClientModel } from "./user-client.model";

@Entity({ name: 'verification' })
export class VerificationModel extends BaseModel<VerificationModel> {

    @Column({ nullable: false })
    attempt: number;

    @Column({ nullable: false })
    deadline: Date;

    @Column({ nullable: false })
    code: number;

    @OneToOne(() => UserClientModel)
    @JoinColumn()
    user: UserClientModel;
}