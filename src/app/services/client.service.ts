import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8085/clients'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/getAll`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/Save`, client);
  }

  updateClient(id: number, updatedClient: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/update/${id}`, updatedClient);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  searchClients(client: Client): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/searchP`);
  }
  getActiveClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/actif`);
  }

  getInactiveClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/inactif`);
  }

  getClientChiffreAffaires(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${id}/chiffreAffaires`);
  }
}
