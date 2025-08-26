import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Ingredient {
  id: number;
  name: string;
  done: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
}

function createRecipesStore() {
  const stored = browser ? localStorage.getItem('recipes') : null;
  const initial = stored ? JSON.parse(stored) : [];

  const { subscribe, set, update } = writable<Recipe[]>(initial);

  if (browser) {
    subscribe((value) => {
      localStorage.setItem('recipes', JSON.stringify(value));
    });
  }

  return {
    subscribe,
    addRecipe: (title: string) =>
      update((recipes) => [
        ...recipes,
        { id: Date.now(), title, ingredients: [] }
      ]),
    removeRecipe: (id: number) =>
      update((recipes) => recipes.filter((r) => r.id !== id)),
    addIngredient: (recipeId: number, name: string) =>
      update((recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: [
                  ...recipe.ingredients,
                  { id: Date.now(), name, done: false }
                ]
              }
            : recipe
        )
      ),
    removeIngredient: (recipeId: number, ingredientId: number) =>
      update((recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: recipe.ingredients.filter(
                  (ing) => ing.id !== ingredientId
                )
              }
            : recipe
        )
      ),
    toggleIngredient: (recipeId: number, ingredientId: number) =>
      update((recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: recipe.ingredients.map((ing) =>
                  ing.id === ingredientId ? { ...ing, done: !ing.done } : ing
                )
              }
            : recipe
        )
      ),
    clearRecipes: () => {
      set([]);
      if (browser) {
        localStorage.removeItem('recipes'); // ✅ remove the key completely
      }
    }
  };
}

export const recipes = createRecipesStore();
