import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import type { IInstrumento } from "../models/instrumento";

interface BackendInstrumento {
  id: string;
  nombre: string;
  marca: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  estado?: string;
  created_at: string;
}

function toFrontend(data: BackendInstrumento): IInstrumento {
  return { ...data, estado: data.estado || "usado" };
}

@Injectable({ providedIn: "root" })
export class InstrumentosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "/api/instrumentos";

  listar(): Observable<IInstrumento[]> {
    return this.http
      .get<BackendInstrumento[]>(this.apiUrl)
      .pipe(map((list) => list.map(toFrontend)));
  }

  obtener(id: string): Observable<IInstrumento> {
    return this.http
      .get<BackendInstrumento>(`${this.apiUrl}/${id}`)
      .pipe(map(toFrontend));
  }

  crear(data: Omit<IInstrumento, "id" | "created_at">): Observable<IInstrumento> {
    const { estado: _estado, ...payload } = data;
    return this.http
      .post<BackendInstrumento>(this.apiUrl, payload)
      .pipe(map(toFrontend));
  }

  actualizar(
    id: string,
    data: Partial<Omit<IInstrumento, "id" | "created_at">>
  ): Observable<IInstrumento> {
    const { estado: _estado, ...payload } = data as any;
    return this.http
      .patch<BackendInstrumento>(`${this.apiUrl}/${id}`, payload)
      .pipe(map(toFrontend));
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
