import { writable } from 'svelte/store';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
}

export const recipes = writable<Recipe[]>([]);

// Add a recipe
export function addRecipe(title: string) {
  recipes.update(r => [...r, { id: Date.now(), title, ingredients: [] }]);
}

// Remove a recipe
export function removeRecipe(id: number) {
  recipes.update(r => r.filter(recipe => recipe.id !== id));
}

// Add ingredient to a recipe
export function addIngredient(recipeId: number, ingredientName: string) {
  recipes.update(r =>
    r.map(recipe =>
      recipe.id === recipeId
        ? {
            ...recipe,
            ingredients: [
              ...recipe.ingredients,
              { id: Date.now(), name: ingredientName }
            ]
          }
        : recipe
    )
  );
}

// Remove ingredient
export function removeIngredient(recipeId: number, ingredientId: number) {
  recipes.update(r =>
    r.map(recipe =>
      recipe.id === recipeId
        ? {
            ...recipe,
            ingredients: recipe.ingredients.filter(i => i.id !== ingredientId)
          }
        : recipe
    )
  );
}
