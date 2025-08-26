import { writable } from 'svelte/store';

export interface Ingredient {
  id: number;
  name: string;
  completed: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
}

function createRecipesStore() {
  const { subscribe, update } = writable<Recipe[]>([]);
  let recipeId = 1;
  let ingredientId = 1;

  return {
    subscribe,

    addRecipe: (title: string) =>
      update(recipes => [
        ...recipes,
        { id: recipeId++, title, ingredients: [] }
      ]),

    removeRecipe: (id: number) =>
      update(recipes => recipes.filter(r => r.id !== id)),

    addIngredient: (recipeId: number, name: string) =>
      update(recipes =>
        recipes.map(recipe =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: [
                  ...recipe.ingredients,
                  { id: ingredientId++, name, completed: false }
                ]
              }
            : recipe
        )
      ),

    removeIngredient: (recipeId: number, ingredientId: number) =>
      update(recipes =>
        recipes.map(recipe =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: recipe.ingredients.filter(
                  i => i.id !== ingredientId
                )
              }
            : recipe
        )
      ),

    toggleIngredient: (recipeId: number, ingredientId: number) =>
      update(recipes =>
        recipes.map(recipe =>
          recipe.id === recipeId
            ? {
                ...recipe,
                ingredients: recipe.ingredients.map(i =>
                  i.id === ingredientId
                    ? { ...i, completed: !i.completed }
                    : i
                )
              }
            : recipe
        )
      )
  };
}

export const recipes = createRecipesStore();
