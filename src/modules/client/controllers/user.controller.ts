import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "../../../shared/dtos/response.dto";
import { ValidatorInterceptor } from "../../../shared/interceptors/validator.interceptor";
import { UserDeletedLogicRequestDto } from "../dtos/user/user-deleted-logic-request.dto";
import { UserUpdateRequestDto } from "../dtos/user/user-update-request.dto";
import { UserRegisterRequestValidator } from "../dtos/user/validators/user-register-request.validator";
import { UserUpdateRequestValidator } from "../dtos/user/validators/user-update-request.validator";
import { UserService } from "../services/user.service";
import { UserRegisterRequestDto } from "../dtos/user/user-register-request.dto";
import { JwtClientAuthGuard } from "../../../shared/guards/jwt-client-auth.guard";

@ApiTags('app')
@Controller('app/user-client')
export class UserController {

    private readonly _logger = new Logger(UserController.name);

    constructor(
        private readonly _userService: UserService,
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new UserRegisterRequestValidator()))
    async register(
        @Body() dto: UserRegisterRequestDto,
    ) {

        try {

            const response = await this._userService.register(dto);

            return new ResponseDto(
                true,
                response,
                null,
            );

        } catch (error) {

            this._logger.error(error.message);

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }


    @Patch()
    @UseInterceptors(new ValidatorInterceptor(new UserUpdateRequestValidator()))
    @UseGuards(JwtClientAuthGuard)
    @ApiBearerAuth()
    async update(
        @Req() request,
        @Body() dto: UserUpdateRequestDto,
    ) {

        try {

            const response = await this._userService.update(request.user, dto);

            return new ResponseDto(
                true,
                response,
                null,
            );

        } catch (error) {

            this._logger.error(error.message);

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

@Delete('delete/id/:id')
  @HttpCode(200)
  //@UseGuards(JwtClientAuthGuard)
  @ApiBearerAuth()
  async deletar(@Param('id') id: string) {
    try {
      const response = await this._userService.delete(id);

      return new ResponseDto(
        true,
        response,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    



   
    
}