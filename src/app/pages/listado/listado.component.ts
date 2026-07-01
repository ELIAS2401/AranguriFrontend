import { Component, OnInit, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { InstrumentosService } from "../../services/instrumentos.service";
import { InstrumentCardComponent } from "../../components/instrument-card/instrument-card.component";
import { SkeletonCardComponent } from "../../components/skeleton-card/skeleton-card.component";
import type { IInstrumento } from "../../models/instrumento";

@Component({
  selector: "app-listado",
  standalone: true,
  imports: [InstrumentCardComponent, SkeletonCardComponent],
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.css"],
})
export class ListadoComponent implements OnInit {
  private readonly service = inject(InstrumentosService);
  private readonly router = inject(Router);

  instrumentos = signal<IInstrumento[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  skeletonArray = Array.from({ length: 6 });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.error.set(null);
    this.service.listar().subscribe({
      next: (data) => {
        this.instrumentos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Error al cargar instrumentos");
        this.loading.set(false);
      },
    });
  }

  verDetalle(id: string): void {
    this.router.navigate(["/instrumento", id]);
  }

  editar(id: string): void {
    this.router.navigate(["/editar", id]);
  }

  eliminar(id: string): void {
    if (!confirm("¿Eliminar este instrumento?")) return;
    this.service.eliminar(id).subscribe({
      next: () => this.instrumentos.update((list) => list.filter((i) => i.id !== id)),
      error: () => this.error.set("Error al eliminar"),
    });
  }
}
