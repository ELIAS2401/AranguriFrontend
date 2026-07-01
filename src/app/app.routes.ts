import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ListadoComponent } from "./pages/listado/listado.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";
import { InstrumentFormComponent } from "./components/instrument-form/instrument-form.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "instrumentos", component: ListadoComponent },
  { path: "instrumento/:id", component: DetalleComponent },
  { path: "nuevo", component: InstrumentFormComponent },
  { path: "editar/:id", component: InstrumentFormComponent },
  { path: "**", redirectTo: "" },
];
