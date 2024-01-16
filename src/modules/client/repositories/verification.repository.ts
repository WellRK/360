import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { VerificationModel } from "../models/verification.model";

@Injectable()
export class VerificationRepository extends BaseRepository<VerificationModel> {

    constructor(
        @InjectRepository(VerificationModel) protected readonly _model: Repository<VerificationModel>
    ) {
        super(_model)
    }

    async getByUser(userId: string): Promise<VerificationModel> {

        return await this._model
            .createQueryBuilder()
            .innerJoin('user_client', 'user_client')
            .where('user_id = :userId', { userId })
            .getOne();
    }

    async updateAttempt(_id: string, attempt: number): Promise<void> {

        await this._model.createQueryBuilder()
            .update({
                attempt,
            }).where({ _id })
            .execute();
    }
}