import { writable } from 'svelte/store';

export type Ingredient = {
  id: string;
  name: string;
  checked: boolean;
};

export type Recipe = {
  id: string;
  title: string;
  category: string;
  ingredients: Ingredient[];
};

export const CATEGORIES = [
  "Dessert",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Vegetarian"
];

const STORAGE_KEY = 'recipes';

// unique ID
const newId = () => crypto.randomUUID();

// Initialize from localStorage safely
function loadInitial(): Recipe[] {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Recipe[];
      } catch (err) {
        console.warn("⚠️ Could not parse recipes from localStorage, resetting...");
        return [];
      }
    }
  }
  return [];
}

function createRecipes() {
  const { subscribe, set, update } = writable<Recipe[]>(loadInitial());

  // Persist changes to localStorage
  subscribe((recipes) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  });

  return {
    subscribe,
    addRecipe: (title: string, category: string = '') =>
      update((recipes) => [
        ...recipes,
        { id: newId(), title, category, ingredients: [] }
      ]),
    updateCategory: (recipeId: string, category: string) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId ? { ...r, category } : r
        )
      ),
    removeRecipe: (id: string) =>
      update((recipes) => recipes.filter((r) => r.id !== id)),
    addIngredient: (recipeId: string, name: string) =>
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
    removeIngredient: (recipeId: string, ingredientId: string) =>
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
    toggleIngredient: (recipeId: string, ingredientId: string) =>
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
    clearAll: () => set([])
  };
}

export const recipes = createRecipes();
