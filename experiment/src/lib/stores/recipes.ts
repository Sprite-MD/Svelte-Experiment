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

// Simple id helper to avoid duplicate keys
const newId = () => Date.now() + Math.floor(Math.random() * 1_000_000);

function createRecipes() {
  const { subscribe, update } = writable<Recipe[]>([]);

  return {
    subscribe,

    addRecipe: (title: string) =>
      update((recipes) => [
        ...recipes,
        { id: newId(), title, ingredients: [] }
      ]),

    removeRecipe: (id: number) =>
      update((recipes) => recipes.filter((r) => r.id !== id)),

    addIngredient: (recipeId: number, name: string) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? {
                ...r,
                ingredients: [
                  ...r.ingredients,
                  { id: newId(), name, checked: false }
                ]
              }
            : r
        )
      ),

    removeIngredient: (recipeId: number, ingredientId: number) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? {
                ...r,
                ingredients: r.ingredients.filter((i) => i.id !== ingredientId)
              }
            : r
        )
      ),

    toggleIngredient: (recipeId: number, ingredientId: number) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? {
                ...r,
                ingredients: r.ingredients.map((i) =>
                  i.id === ingredientId ? { ...i, checked: !i.checked } : i
                )
              }
            : r
        )
      )
  };
}

export const recipes = createRecipes();
