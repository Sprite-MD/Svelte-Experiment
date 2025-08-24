import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
}

// Initialize recipes safely for SSR
const initialRecipes: Recipe[] = browser
  ? JSON.parse(localStorage.getItem('recipes') ?? '[]')
  : [];

export const recipes = writable<Recipe[]>(initialRecipes);

let recipeId = initialRecipes.length;
let ingredientId = 0;

// Persist to localStorage only in browser
if (browser) {
  recipes.subscribe((value) => {
    localStorage.setItem('recipes', JSON.stringify(value));
  });
}

// Add / remove recipes
export function addRecipe(title: string) {
  recipes.update(r => [...r, { id: ++recipeId, title, ingredients: [] }]);
}

export function removeRecipe(id: number) {
  recipes.update(r => r.filter(recipe => recipe.id !== id));
}

// Add / remove ingredients
export function addIngredient(recipeId: number, name: string) {
  recipes.update(r =>
    r.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, ingredients: [...recipe.ingredients, { id: ++ingredientId, name }] }
        : recipe
    )
  );
}

export function removeIngredient(recipeId: number, ingredientId: number) {
  recipes.update(r =>
    r.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, ingredients: recipe.ingredients.filter(i => i.id !== ingredientId) }
        : recipe
    )
  );
}

// Optional: reset all recipes
export function resetRecipes() {
  recipes.set([]);
}
