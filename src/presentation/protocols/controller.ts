import { HttpRequest, HttpResponse } from './http'

export interface Controller{
  // handle: (httpRequest: HttpRequest) => HttpResponse
  handle (httpRequest: HttpRequest): HttpResponse
}
