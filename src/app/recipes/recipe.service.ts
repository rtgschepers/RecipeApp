import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Storage } from '@ionic/storage';

const KEY = 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private storage: Storage) {}

  async getAllRecipes(): Promise<Recipe[]> {
    return this.storage.get(KEY).then(recipes => {
      if (recipes) {
        return recipes;
      } else {
        return [];
      }
    });
  }

  async getSingleRecipe(id: number): Promise<Recipe> {
    return this.getAllRecipes().then(recipes => {
      return recipes.find(r => r.id === id);
    });
  }

  async saveRecipe(newRecipe: Recipe) {
    // try to get an existing recipe
    this.getSingleRecipe(newRecipe.id).then(existingRecipe => {
      if (existingRecipe) {
        // replace the existing recipe if it exists
        this.getAllRecipes().then(allRecipes => {
          allRecipes[allRecipes.indexOf(existingRecipe)] = newRecipe;
          // update the storage
          this.storage.set(KEY, allRecipes);
        });
      } else {
        this.getAllRecipes().then(allRecipes => {
          // give the recipe the highest id and push it into the array
          newRecipe.id = Math.max.apply(Math, allRecipes.map(r => r.id)) + 1;
          allRecipes.push(newRecipe);
          // update the storage
          this.storage.set(KEY, allRecipes);
        });
      }
    });
  }

  async deleteRecipe(id: number) {
    this.getAllRecipes().then(allRecipes => {
      allRecipes = allRecipes.filter(r => {
        return r.id !== id;
      });
      // update the storage
      this.storage.set(KEY, allRecipes);
    });
  }
}
