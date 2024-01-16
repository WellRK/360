import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from '../../../shared/model/base.model';

@Entity({ name: 'profession' })
export class ProfessionModel extends BaseModel<ProfessionModel> {

    @Column({ nullable: false, unique: true })
    name: string;
    
}

