import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../model/Endereco';

const API = 'https://viacep.com.br/ws';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCEPService {
  Endereco!: Endereco;

  constructor(private httpClient: HttpClient) {}

  public enderecoPorCep(cep: string): Observable<Endereco> {
    return this.httpClient.get<Endereco>(`${API}/${cep}/json`);
  }
}
