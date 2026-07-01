import { Component, OnInit, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { InstrumentosService } from "../../services/instrumentos.service";

@Component({
  selector: "app-instrument-form",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./instrument-form.component.html",
  styleUrls: ["./instrument-form.component.css"],
})
export class InstrumentFormComponent implements OnInit {
  private readonly service = inject(InstrumentosService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  categorias = [
    "Guitarra", "Bajo", "Teclado", "Piano", "Batería",
    "Percusión", "Viento", "Metal", "Cuerda", "Electroacústico", "Otro",
  ];

  id = signal<string | null>(null);
  isEditing = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);

  form = {
    nombre: "",
    marca: "",
    categoria: "",
    precio: 0,
    estado: "usado",
    descripcion: "",
    imagen: "",
    creador: "",
    contacto: "",
  };

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get("id");
    if (paramId) {
      this.id.set(paramId);
      this.isEditing.set(true);
      this.service.obtener(paramId).subscribe({
        next: (data) => {
          this.form.nombre = data.nombre;
          this.form.marca = data.marca;
          this.form.categoria = data.categoria;
          this.form.precio = data.precio;
          this.form.estado = data.estado || "usado";
          this.form.descripcion = data.descripcion;
          this.form.imagen = data.imagen;
          this.form.creador = data.creador;
          this.form.contacto = data.contacto;
        },
        error: () => this.error.set("Error al cargar instrumento"),
      });
    }
  }

  guardar(): void {
    if (!this.form.nombre || !this.form.marca || !this.form.categoria || !this.form.precio || !this.form.descripcion || !this.form.imagen || !this.form.creador || !this.form.contacto) {
      this.error.set("Todos los campos son obligatorios");
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const data = {
      nombre: this.form.nombre,
      marca: this.form.marca,
      categoria: this.form.categoria,
      precio: this.form.precio,
      estado: this.form.estado,
      descripcion: this.form.descripcion,
      imagen: this.form.imagen,
      creador: this.form.creador,
      contacto: this.form.contacto,
    };

    const request = this.isEditing()
      ? this.service.actualizar(this.id()!, data)
      : this.service.crear(data);

    request.subscribe({
      next: () => this.router.navigate(["/"]),
      error: (err) => {
        const msg = err?.error?.error || "Error al guardar";
        this.error.set(msg);
        this.submitting.set(false);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(["/"]);
  }
}
