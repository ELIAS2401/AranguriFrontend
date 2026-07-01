import { Component, OnInit, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Location, DecimalPipe } from "@angular/common";
import { InstrumentosService } from "../../services/instrumentos.service";
import type { IInstrumento } from "../../models/instrumento";

@Component({
  selector: "app-detalle",
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly service = inject(InstrumentosService);

  instrumento = signal<IInstrumento | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error.set("ID no válido");
      this.loading.set(false);
      return;
    }
    this.service.obtener(id).subscribe({
      next: (data) => {
        this.instrumento.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Instrumento no encontrado");
        this.loading.set(false);
      },
    });
  }

  eliminar(): void {
    const inst = this.instrumento();
    if (!inst || !confirm(`¿Eliminar ${inst.nombre}?`)) return;
    this.service.eliminar(inst.id).subscribe({
      next: () => this.router.navigate(["/instrumentos"]),
      error: () => this.error.set("Error al eliminar"),
    });
  }

  volver(): void {
    this.location.back();
  }

  volverAlListado(): void {
    this.router.navigate(["/instrumentos"]);
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "https://placehold.co/800x500/1a1a1a/666?text=Sin+imagen";
  }
}
