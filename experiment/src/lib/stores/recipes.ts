import { writable } from 'svelte/store';
import { dev } from '$app/environment';

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

const STORAGE_KEY = 'recipes';

// id helper
const newId = () => Date.now() + Math.floor(Math.random() * 1_000_000);

function createRecipes() {
  const { subscribe, set, update } = writable<Recipe[]>([]);

  // ✅ Load initial data
  async function init() {
    if (dev) {
      // Load from dev seed JSON
      try {
        const res = await fetch('/recipes-dev.json');
        const data: Recipe[] = await res.json();
        set(data);
        console.log('✅ Loaded recipes from recipes-dev.json (dev mode)');
        return;
      } catch (e) {
        console.warn('⚠️ Could not load recipes-dev.json, falling back to localStorage');
      }
    }

    // Fallback: load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      set(JSON.parse(stored));
    }
  }

  // ✅ Save to localStorage on updates (only in browser + not dev mode)
  subscribe((recipes) => {
    if (typeof window !== 'undefined' && !dev) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  });

  return {
    subscribe,
    init,
    addRecipe: (title: string, category: string) =>
      update((recipes) => [
        ...recipes,
        { id: newId(), title, category, ingredients: [] }
      ]),
    removeRecipe: (id: number) =>
      update((recipes) => recipes.filter((r) => r.id !== id)),
    addIngredient: (recipeId: number, name: string) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? { ...r, ingredients: [...r.ingredients, { id: newId(), name, checked: false }] }
            : r
        )
      ),
    removeIngredient: (recipeId: number, ingredientId: number) =>
      update((recipes) =>
        recipes.map((r) =>
          r.id === recipeId
            ? { ...r, ingredients: r.ingredients.filter((i) => i.id !== ingredientId) }
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
    clearAll: () => set([])
  };
}

export const recipes = createRecipes();
