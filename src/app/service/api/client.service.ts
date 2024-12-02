import {Injectable} from "@angular/core";
import {Client} from "../../models/client.model";
import {Observable} from "rxjs";
import {Page} from "../../utils/page";
import {ApiService} from "./api.service";

@Injectable({providedIn: 'root'})
export class ClientService {

  constructor(private api: ApiService) { }

  getClients(attribute: string, query: string, pageIndex: number, pageSize: number): Observable<Page<Client>> {
    return this.api.get(`${ApiService.URL}/clients?${attribute}=${query}&page=${pageIndex}&size=${pageSize}`);
  }

  create(Client: Client): Observable<Client> {
    return this.api.post(`${ApiService.URL}/clients`, Client);
  }

  update(ClientId: number, Client: Client): Observable<Client> {
    return this.api.put(`${ApiService.URL}/clients/${ClientId}`, Client);
  }

  delete(ClientId: number): Observable<Client> {
    return this.api.delete(`${ApiService.URL}/clients/${ClientId}`);
  }
}
