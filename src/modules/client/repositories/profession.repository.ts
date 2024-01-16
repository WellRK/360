import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { ProfessionModel } from "../models/profession.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class ProfessionRepository extends BaseRepository<ProfessionModel> {
    
    constructor(
        @InjectRepository(ProfessionModel)
        protected readonly _model: Repository<ProfessionModel>,
       
      ) {
        super(_model);
      }


    // override async list(): Promise<<ProfessionModel[] | null> {

    //     return await this._model.find({});
    // }

    override async getById(_id: string): Promise<ProfessionModel> {

        return await this._model
            .findOne({
                where: {
                    _id,
                }
            });
    }

}


