import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { PlaceModel } from "../models/place.model";
import { FindManyOptions, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PlaceRegisterRequestDto } from "../dtos/place/place.dto";


@Injectable()
export class PlaceRepository extends BaseRepository<PlaceModel> {
  constructor(
    @InjectRepository(PlaceModel)
    protected readonly _model: Repository<PlaceModel>,
   
  ) {
    super(_model);
  }

  override async getById(_id: string): Promise<PlaceModel | null> {
    return await this._model.findOne({
      where: { _id: _id },
    });
  }

  override async list(): Promise<PlaceModel[]> {
    return await this._model.find({
      order: { name: 'ASC' },
    });
  }

  



    
}