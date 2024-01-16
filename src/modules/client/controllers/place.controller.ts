import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtClientAuthGuard } from "../../../shared/guards/jwt-client-auth.guard";
import { ResponseDto } from "../../../shared/dtos/response.dto";
import { PlaceService } from "../services/place.service";
import { PlaceRegisterRequestDto } from "../dtos/place/place.dto";
import { PlaceUpdateRequestDto } from "../dtos/place/place-update-request.dto";
import { ProfessionRegisterRequestDto } from "../dtos/place/profession.dto";
import { ProfessionService } from "../services/profession.service";



@ApiTags('place')
@Controller('place/user')
export class PlaceController {

    private readonly _logger = new Logger(PlaceController.name);

    constructor(
        private readonly _placeService: PlaceService,
        private readonly _professionService: ProfessionService,
    ) { }

    @Post()
    async register(
        @Body() dto: PlaceRegisterRequestDto,
    ) {

        try {

            const response = await this._placeService.register(dto);

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

    @Post('profession')
    async registerP(
        @Body() dto: ProfessionRegisterRequestDto,
    ) {

        try {

            const response = await this._professionService.register(dto);

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
    //@UseGuards(JwtClientAuthGuard)
    @ApiBearerAuth()
    async update(
        @Req() request,
        @Body() dto: PlaceUpdateRequestDto,
    ) {

        try {
            //request.user,
            const response = await this._placeService.update(dto);

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
    

    @Get()
  @HttpCode(200)
  //@UseGuards(JwtClientAuthGuard)
  @ApiBearerAuth()
  async list(
  ) {

    try {

      const response = await this._placeService.list();

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

  @Get('idP/:id')
  @HttpCode(200)
 // @UseGuards(JwtClientAuthGuard)
  @ApiBearerAuth()
  async get(@Param('id') _id: string) {
    try {
      const response = await this._professionService.getById(_id);
      return new ResponseDto(true, response, null);
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
      const response = await this._placeService.delete(id);

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