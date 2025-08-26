// src/lib/stores/recipes.ts
import { writable } from 'svelte/store';

export type Ingredient = {
  id: number;
  name: string;
  checked: boolean;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: Ingredient[];
};

function createRecipes() {
  const { subscribe, update } = writable<Recipe[]>([]);

  return {
    subscribe,
    addRecipe: (title: string) =>
      update((recipes) => [
        ...recipes,
        { id: Date.now(), title, ingredients: [] }
      ]),
    removeRecipe: (id: number) =>
      update((recipes) => recipes.filter((recipe) => recipe.id !== id)),
    addIngredient: (recipeId: number, name: string) =>
      update((recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: [
                  ...recipe.ingredients,
                  { id: Date.now(), name, checked: false }
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
                  (ingredient) => ingredient.id !== ingredientId
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
                ingredients: recipe.ingredients.map((ingredient) =>
                  ingredient.id === ingredientId
                    ? { ...ingredient, checked: !ingredient.checked }
                    : ingredient
                )
              }
            : recipe
        )
      )
  };
}

export const recipes = createRecipes();
