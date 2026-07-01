import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import type { IInstrumento, CrearInstrumento, ActualizarInstrumento } from "../models/instrumento";

@Injectable({ providedIn: "root" })
export class InstrumentosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "/api/instrumentos";

  listar(): Observable<IInstrumento[]> {
    return this.http.get<IInstrumento[]>(this.apiUrl);
  }

  obtener(id: string): Observable<IInstrumento> {
    return this.http.get<IInstrumento>(`${this.apiUrl}/${id}`);
  }

  crear(data: CrearInstrumento): Observable<IInstrumento> {
    return this.http.post<IInstrumento>(this.apiUrl, data);
  }

  actualizar(id: string, data: ActualizarInstrumento): Observable<IInstrumento> {
    return this.http.patch<IInstrumento>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
