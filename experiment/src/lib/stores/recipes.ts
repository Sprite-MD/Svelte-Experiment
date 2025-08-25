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

function createRecipes() {
  const { subscribe, update } = writable<Recipe[]>([]);

  return {
    subscribe,

    addRecipe: (title: string) => {
      update((recipes) => [
        ...recipes,
        {
          id: Date.now(),
          title,
          ingredients: [],
        },
      ]);
    },

    removeRecipe: (id: number) => {
      update((recipes) => recipes.filter((r) => r.id !== id));
    },

    addIngredient: (recipeId: number, name: string) => {
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? {
                ...r,
                ingredients: [
                  ...r.ingredients,
                  { id: Date.now(), name },
                ],
              }
            : r
        )
      );
    },

    removeIngredient: (recipeId: number, ingredientId: number) => {
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? {
                ...r,
                ingredients: r.ingredients.filter(
                  (i) => i.id !== ingredientId
                ),
              }
            : r
        )
      );
    },
  };
}

export const recipes = createRecipes();
