import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('CartController', () => {
  let controller: CartController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<CartController>(CartController);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of carts', async () => {
    const mockResponse = {
      data: [{ id: 1 }, { id: 2 }],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
   
    const result = await controller.getList();
    expect(result).toEqual(mockResponse.data);
  });

  it('should return a cart by id', async () => {
     const mockResponse = {
       data: { id: 1 },
       status: 200,
       statusText: 'OK',
       headers: {},
       config: {}
     };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await controller.getById('1');
    expect(result).toEqual(mockResponse.data);
  });
});
