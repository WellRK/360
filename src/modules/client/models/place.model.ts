import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../shared/model/base.model';
import { ProfessionModel } from './profession.model';

@Entity({ name: 'place_client' })
//@Unique('unique_phone_cpf', ['phone', 'cpf'])
export class PlaceModel extends BaseModel<PlaceModel> {

    @Column({ nullable: true, unique: true })
    name: string;

    @Column({ nullable: false, unique: false })
    date_birth: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: false, unique: true })
    telefone: string;

    @Column({ nullable: false, unique: false })
    obs: string;

    @Column({ nullable: false, unique: false })
    professionId: string;

    @Column({ nullable: true, unique: false })
    profession: string;

    @ManyToOne(() => ProfessionModel, (profile) => profile.name, { nullable: false, })
    professionName: ProfessionModel;
    // @Column({ nullable: false, unique: false })
    // professionName: string;
    
}