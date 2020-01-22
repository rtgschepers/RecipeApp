import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {
  recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipe = new Recipe();
    this.recipe.ingredients = [null];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('recipe');
    if (id) {
      this.recipeService.getSingleRecipe(parseInt(id, 10)).then(r => {
        this.recipe = r;
      });
    }
  }

  addIngredient() {
    this.recipe.ingredients.push(null);
  }

  saveRecipe() {
    this.recipeService.saveRecipe(this.recipe).then(() => {
      this.router.navigateByUrl('/recipes');
    });
  }

  cancel() {
    this.router.navigateByUrl('/recipes');
  }

  customTrackBy(id: number): number {
    return id;
  }
}
