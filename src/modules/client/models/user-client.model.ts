import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../shared/model/base.model';

@Entity({ name: 'user_client' })
//@Unique('unique_phone_cpf', ['phone', 'cpf'])
export class UserClientModel extends BaseModel<UserClientModel> {

    @Column({ nullable: false, unique: true })
    phone: string;

    @Column({ nullable: false, unique: true })
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

}
