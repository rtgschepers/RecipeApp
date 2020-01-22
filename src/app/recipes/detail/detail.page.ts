import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  recipe: Recipe = new Recipe();
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('recipe');
    this.recipeService.getSingleRecipe(parseInt(id, 10)).then(r => {
      // console.log(r);
      this.recipe = r;
    });
  }

  editRecipe(id: number) {
    this.router.navigateByUrl('/recipes/create/' + id);
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).then(() => {
      this.router.navigateByUrl('/recipes');
    });
  }
}
