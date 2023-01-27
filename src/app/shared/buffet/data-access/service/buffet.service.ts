import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@shared/api';
import { processPaginatedResponse } from '@shared/serialization';
import { CreateBuffetDto, UpdateBuffetDto } from '../dto';
import { Buffet } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class BuffetService extends ApiService<
Buffet, 
CreateBuffetDto,
UpdateBuffetDto
> {

  constructor(httpClient: HttpClient) { 
    super(httpClient, "/buffet/", Buffet);
  }

  public findAll() {
    return this.httpClient
      .get<Buffet[]>(environment.api.url + this.path)
      .pipe(processPaginatedResponse(Buffet));
  }

  //Szűrés későbbre

  // public find(query: FilterProductsQuery) {
  //   return this.httpClient
  //     .get<Product[]>(environment.api.url + this.path, {
  //       params: serializeQueryParams(query),
  //     })
  //     .pipe(processPaginatedResponse(Product));
  // }
}
