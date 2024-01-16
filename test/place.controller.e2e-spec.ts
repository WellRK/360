import { Test, TestingModule } from '@nestjs/testing';

import { HttpException } from '@nestjs/common';
import { PlaceController } from '../src/modules/client/controllers/place.controller';
import { PlaceService } from '../src/modules/client/services/place.service';
import { PlaceRegisterRequestDto } from '../src/modules/client/dtos/place/place.dto';
import { PlaceRegisterResponseDto } from '../src/modules/client/dtos/place/place-register-response.dto';
import { ResponseDto } from '../src/shared/dtos/response.dto';

describe('PlaceController', () => {
    let controller: PlaceController;
    let service: PlaceService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [PlaceController],
        providers: [{
          provide: PlaceService,
          useValue: {
            register: jest.fn(),
            // outros métodos mockados aqui
          },
        }],
      }).compile();
  
      controller = module.get<PlaceController>(PlaceController);
      service = module.get<PlaceService>(PlaceService);
    });
  
    describe('register', () => {
      it('should call service.register and return the result', async () => {
        // Criando um objeto literal que corresponde à estrutura de PlaceRegisterRequestDto
        const dto = {
          name: 'Test Place',
          city: 'Test City',
          state: 'Test State'
        };
  
        const registerResponse = { _id: '123', name: 'Test Place' };
        const responseDto = new ResponseDto(true, registerResponse, null);
  
        jest.spyOn(service, 'register').mockResolvedValue(registerResponse);
        
        const result = await controller.register(dto as any);
        expect(service.register).toHaveBeenCalledWith(dto);
        expect(result).toEqual(responseDto);
      });
  
      it('should handle exceptions', async () => {
        const dto = {
          name: 'Test Place',
          city: 'Test City',
          state: 'Test State'
        };
  
        jest.spyOn(service, 'register').mockRejectedValue(new Error('Error'));
  
        await expect(controller.register(dto as any)).rejects.toThrow(HttpException);
      });
    });
  
    describe('update', () => {
      it('should call service.update and return the result', async () => {
        const requestUser = { userId: 'user-id' };
        const dto = { name: 'Updated Name', city: 'Updated City', state: 'Updated State' }; // Adapte conforme a estrutura do DTO
        const updateResponse = { _id: '123', name: 'Updated Name' }; // Mock de retorno do serviço
        const responseDto = new ResponseDto(true, updateResponse, null);
    
        jest.spyOn(service, 'update').mockResolvedValue(updateResponse);
    
        const result = await controller.update({ user: requestUser } as any, dto as any);
        expect(service.update).toHaveBeenCalledWith(requestUser, dto);
        expect(result).toEqual(responseDto);
      });
    
      it('should handle exceptions', async () => {
        const dto = { /* ... */ }; // Seu DTO aqui
        jest.spyOn(service, 'update').mockRejectedValue(new Error('Error'));
    
        await expect(controller.update({ user: {} } as any, dto as any)).rejects.toThrow(HttpException);
      });
    });

    describe('list', () => {
      it('should call service.list and return the result', async () => {
        const listResponse = [{ name: 'Place1', city: 'City1', state: 'State1' }]; // Mock de retorno do serviço
        const responseDto = new ResponseDto(true, listResponse, null);
    
        jest.spyOn(service, 'list').mockResolvedValue(listResponse);
    
        const result = await controller.list();
        expect(service.list).toHaveBeenCalled();
        expect(result).toEqual(responseDto);
      });
    
      it('should handle exceptions', async () => {
        jest.spyOn(service, 'list').mockRejectedValue(new Error('Error'));
    
        await expect(controller.list()).rejects.toThrow(HttpException);
      });
    });

    describe('get', () => {
      it('should call service.getById and return the result', async () => {
        const _id = '123';
        const getResponse = { name: 'Place1', city: 'City1', state: 'State1' }; // Mock de retorno do serviço
        const responseDto = new ResponseDto(true, getResponse, null);
    
        jest.spyOn(service, 'getById').mockResolvedValue(getResponse);
    
        const result = await controller.get(_id);
        expect(service.getById).toHaveBeenCalledWith(_id);
        expect(result).toEqual(responseDto);
      });
    
      it('should handle exceptions', async () => {
        const _id = '123';
        jest.spyOn(service, 'getById').mockRejectedValue(new Error('Error'));
    
        await expect(controller.get(_id)).rejects.toThrow(HttpException);
      });
    });

    // describe('delete', () => {
    //   it('should call service.delete and return the result', async () => {
    //     const _id = '123';
    //     const deleteResponse = true; // Mock de retorno do serviço
    //     const responseDto = new ResponseDto(true, deleteResponse, null);
    
    //     jest.spyOn(service, 'delete').mockResolvedValue(deleteResponse);
    
    //     const result = await controller.delete(_id);
    //     expect(service.delete).toHaveBeenCalledWith(_id);
    //     expect(result).toEqual(responseDto);
    //   });
    
    //   it('should handle exceptions', async () => {
    //     const _id = '123';
    //     jest.spyOn(service, 'delete').mockRejectedValue(new Error('Error'));
    
    //     await expect(controller.delete(_id)).rejects.toThrow(HttpException);
    //   });
    // });


  
  });