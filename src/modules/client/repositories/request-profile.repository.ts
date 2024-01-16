import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { RequestProfileStatusEnum } from "../enums/request-profile-status.enum";
import { RequestProfileClientModel } from "../models/request-profile.model";

@Injectable()
export class RequestProfileRepository extends BaseRepository<RequestProfileClientModel> {

    constructor(
        @InjectRepository(RequestProfileClientModel) protected readonly _model: Repository<RequestProfileClientModel>,
    ) {
        super(_model)
    }

    async listByStatus(status: RequestProfileStatusEnum): Promise<RequestProfileClientModel[]> {
        return await this._model
            .find({
                where: { status },
            });
    }

    async updateStatus(_id: string, status: RequestProfileStatusEnum) {
        await this._model.createQueryBuilder()
            .update({
                status,
            }).where({ _id })
            .execute();
    }
}