// src/lib/stores/recipes.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Ingredient = {
  id: number;
  name: string;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: Ingredient[];
};

// ✅ Initialize safely (empty array on server, load from localStorage on client)
const initialRecipes: Recipe[] = browser
  ? JSON.parse(localStorage.getItem('recipes') ?? '[]')
  : [];

export const recipes = writable<Recipe[]>(initialRecipes);

let recipeId = browser ? initialRecipes.length : 0;
let ingredientId = 0;

// ✅ Subscribe only on client
if (browser) {
  recipes.subscribe((value) => {
    localStorage.setItem('recipes', JSON.stringify(value));
  });
}

export function addRecipe(title: string) {
  recipes.update((items) => [
    ...items,
    { id: ++recipeId, title, ingredients: [] }
  ]);
}

export function removeRecipe(id: number) {
  recipes.update((items) => items.filter((r) => r.id !== id));
}

export function addIngredient(recipeId: number, name: string) {
  recipes.update((items) =>
    items.map((r) =>
      r.id === recipeId
        ? {
            ...r,
            ingredients: [...r.ingredients, { id: ++ingredientId, name }]
          }
        : r
    )
  );
}

export function removeIngredient(recipeId: number, ingredientId: number) {
  recipes.update((items) =>
    items.map((r) =>
      r.id === recipeId
        ? {
            ...r,
            ingredients: r.ingredients.filter((ing) => ing.id !== ingredientId)
          }
        : r
    )
  );
}
