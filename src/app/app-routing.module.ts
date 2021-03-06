import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', children: [
    { path: '', loadChildren: './recipes/recipes.module#RecipesPageModule'},
    { path: 'create', children: [
      {path: '', loadChildren: './recipes/create/create.module#CreatePageModule'},
      {path: ':recipe', loadChildren: './recipes/create/create.module#CreatePageModule'}
    ] },
    { path: ':recipe', loadChildren: './recipes/detail/detail.module#DetailPageModule' },
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
