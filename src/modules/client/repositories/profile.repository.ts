import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { ProfileClientModel } from "../models/profile-client.model";

@Injectable()
export class ProfileClientRepository extends BaseRepository<ProfileClientModel> {

    constructor(
        @InjectRepository(ProfileClientModel) protected readonly _model: Repository<ProfileClientModel>
    ) {
        super(_model)
    }

    override async list(): Promise<ProfileClientModel[] | null> {

        return await this._model
            .find({
            });
    }

    async getByName(name: string): Promise<ProfileClientModel> {
        return await this._model.findOne({
            where: { name: name },
        })
    }
}