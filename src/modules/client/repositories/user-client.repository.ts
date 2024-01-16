import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserClientModel } from '../models/user-client.model';
import {
  Brackets,
  FindManyOptions,
  FindOneOptions,
  In,
  Repository,
} from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { PaginateResultDto } from '../../../shared/dtos/paginate-result.dto';
import { ProfileClientModel } from '../models/profile-client.model';

@Injectable()
export class UserClientRepository extends BaseRepository<UserClientModel> {
  constructor(
    @InjectRepository(UserClientModel)
    protected readonly _model: Repository<UserClientModel>,
    @InjectRepository(ProfileClientModel)
    protected readonly _profile: Repository<ProfileClientModel>,
  ) {
    super(_model);
  }

  override async getById(_id: string): Promise<UserClientModel | null> {
    return await this._model.findOne({
      where: { _id: _id },
    });
  }

  override async list(): Promise<UserClientModel[]> {
    return await this._model.find({
      order: { name: 'ASC' },
      relations: ['profiles'],
    });
  }

  async getByPhone(phone: string): Promise<UserClientModel> {
    return await this._model.findOne({
      where: { phone: phone },
    });
  }

  async getByEmail(email: string): Promise<UserClientModel> {
    return await this._model.findOne({
      //relations: ['profiles'],
      where: { email: email },
    });
  }



  public async listAll(): Promise<PaginateResultDto> {
    const query: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };

    const [result, total] = await this._model.findAndCount(query);

    return new PaginateResultDto(result, total);
  }



    
}
