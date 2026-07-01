import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import type { IInstrumento } from "../../models/instrumento";

@Component({
  selector: "app-instrument-card",
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: "./instrument-card.component.html",
  styleUrls: ["./instrument-card.component.css"],
})
export class InstrumentCardComponent {
  instrumento = input.required<IInstrumento>();
  verDetalle = output<string>();
  editar = output<string>();
  eliminar = output<string>();

  get categoriaColor(): string {
    const colores: Record<string, string> = {
      Guitarra: "#e8590c",
      Bajo: "#e8590c",
      Cuerda: "#e8590c",
      Teclado: "#1971c2",
      Piano: "#1971c2",
      Percusión: "#c92a2a",
      Batería: "#c92a2a",
      Viento: "#2f9e44",
      Metal: "#2f9e44",
      Electroacústico: "#e8590c",
      Electrónico: "#1971c2",
    };
    const cat = this.instrumento().categoria?.toLowerCase() || "";
    if (cat.includes("guitarr") || cat.includes("bajo") || cat.includes("cuerda")) return colores["Guitarra"];
    if (cat.includes("teclado") || cat.includes("piano")) return colores["Teclado"];
    if (cat.includes("percus") || cat.includes("bater")) return colores["Percusión"];
    if (cat.includes("viento") || cat.includes("metal")) return colores["Viento"];
    return "#6c757d";
  }

  getCategoriaColor(): string {
    return this.categoriaColor;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "https://placehold.co/600x400/1a1a1a/666?text=Sin+imagen";
  }
}
