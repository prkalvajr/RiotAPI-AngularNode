import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "match",
    loadComponent: () =>
      import("./components/match/match.component").then((m) => m.MatchComponent),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
