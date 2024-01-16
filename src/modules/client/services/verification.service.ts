import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SendgridRepository } from "../../../shared/repositories/sendgrid.repository";
import { ZenviaRepository } from "../../../shared/repositories/zenvia.repository";
import NumberUtil from "../../../shared/utils/number.util";
import { VerificationRegisterRequestDto } from "../dtos/verification/vertification-register-request.dto";
import { VerificationRegisterResponseDto } from "../dtos/verification/vertification-register-response.dto";
import { UserClientModel } from "../models/user-client.model";
import { UserClientRepository } from "../repositories/user-client.repository";
import { VerificationRepository } from "../repositories/verification.repository";

@Injectable()
export class VerificationService {

    private readonly _logger = new Logger(VerificationService.name);

    constructor(
        private readonly _messageRepository: ZenviaRepository,
        private readonly _verificationRepository: VerificationRepository,
        private readonly _userRepository: UserClientRepository,
        private readonly _sendgridRepository: SendgridRepository
    ) { }

    async send(userId: string): Promise<VerificationRegisterResponseDto> {

        const user = await this._userRepository.getById(userId);

        let verificationModel = await this._verificationRepository.getByUser(user._id);

        if (verificationModel) {
            const now = new Date();
            if (now < verificationModel.deadline) {
                await this._verificationRepository.delete(verificationModel._id);
            } else
                await this._verificationRepository.delete(verificationModel._id);
        }

        let deadline: Date = new Date();
        deadline.setMinutes(deadline.getMinutes() + 2);

        const code = NumberUtil.generateRandomNumberArbitrary(1000, 9999);

        const verificationRegisterRequestDto = new VerificationRegisterRequestDto(
            0,
            deadline,
            user,
            code,
        );

        await this._verificationRepository.save(verificationRegisterRequestDto);

        await this._messageRepository.sendSms(
            user.phone,
            `imoveistock: seu código de verificação é ${verificationRegisterRequestDto.code}`,
        );

        return new VerificationRegisterResponseDto(
            user.phone
        );
    }

    async sendEmail(user: UserClientModel): Promise<VerificationRegisterResponseDto> {

        let verificationModel = await this._verificationRepository.getByUser(user._id);

        if (verificationModel) {
            const now = new Date();
            if (now < verificationModel.deadline) {
                await this._verificationRepository.delete(verificationModel._id);
            } else
                await this._verificationRepository.delete(verificationModel._id);
        }

        let deadline: Date = new Date();
        deadline.setMinutes(deadline.getMinutes() + 2);

        const code = NumberUtil.generateRandomNumberArbitrary(1000, 9999);

        const verificationRegisterRequestDto = new VerificationRegisterRequestDto(
            0,
            deadline,
            user,
            code,
        );

        await this._verificationRepository.save(verificationRegisterRequestDto);

        await this._sendgridRepository.sendEmail(
            user.email,
            'imoveistock app: Código de verificação',
            `imoveistock app: Código de verificação`,
            `Olá ${user.name}, seu código de verificação é ${verificationRegisterRequestDto.code}`,
        );

        return new VerificationRegisterResponseDto(
            user.email
        );
    }

    async verifyCode(userId: string, code: number) {

        const verification = await this._verificationRepository.getByUser(userId);

        if (!verification)
            throw new NotFoundException('Verification email not sent!');

        const now = new Date();
        if (now > verification.deadline) {
            await this._verificationRepository.delete(verification._id);
            throw new UnauthorizedException('Email expirado!');
        }

        if (verification.attempt == 5) {
            await this._verificationRepository.delete(verification._id);
            throw new UnauthorizedException(
                'Você excedeu o limite de 5 tentativas!',
            );
        }

        if (verification.code != code) {
            this._incrementAttempt(verification._id);
            throw new UnauthorizedException('Código inválido!');
        }

        await this._verificationRepository.delete(verification._id);
    }

    private async _incrementAttempt(_id: string) {
        const verification = await this._verificationRepository.getById(_id);
        const attempt = verification.attempt + 1;
        await this._verificationRepository.updateAttempt(_id, attempt);
    }
}