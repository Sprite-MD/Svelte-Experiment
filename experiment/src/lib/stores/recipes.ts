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

// Load saved recipes from localStorage
function loadFromStorage(): Recipe[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const data = localStorage.getItem('recipes');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading recipes from localStorage', e);
    return [];
  }
}

function createRecipes() {
  const { subscribe, update, set } = writable<Recipe[]>(loadFromStorage());

  // Save to localStorage whenever recipes change
  subscribe((recipes) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  });

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
      ),

    clearAll: () => set([]) // clears all recipes
  };
}

export const recipes = createRecipes();
