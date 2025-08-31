import { writable } from 'svelte/store';

export type Ingredient = {
  id: number;
  name: string;
  checked: boolean;
};

export type Recipe = {
  id: number;
  title: string;
  category: string;
  ingredients: Ingredient[];
};

const newId = () => Date.now() + Math.floor(Math.random() * 1_000_000);

function createRecipes() {
  const { subscribe, update, set } = writable<Recipe[]>([]);

  return {
    subscribe,

    addRecipe: (title: string, category: string = '') =>
      update((recipes) => [
        ...recipes,
        { id: newId(), title, category, ingredients: [] }
      ]),

    removeRecipe: (id: number) =>
      update((recipes) => recipes.filter((r) => r.id !== id)),

    clearAll: () => set([]),

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
