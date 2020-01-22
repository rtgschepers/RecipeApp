import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.recipeService.getAllRecipes().then(r => {
      this.recipes = r;
    });
  }
}
