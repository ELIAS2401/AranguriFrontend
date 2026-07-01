export interface IInstrumento {
  id: string;
  nombre: string;
  marca: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  estado: string;
  creador: string;
  contacto: string;
  created_at: string;
}

export type CrearInstrumento = Omit<IInstrumento, "id" | "created_at">;
export type ActualizarInstrumento = Partial<CrearInstrumento>;
