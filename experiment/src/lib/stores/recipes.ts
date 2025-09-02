import { writable } from "svelte/store";
import { dev } from "$app/environment";

export type Ingredient = { id: number; name: string; checked: boolean };
export type Recipe = { id: number; title: string; category: string; ingredients: Ingredient[] };

const STORAGE_KEY = "recipes";
const newId = () => Date.now() + Math.floor(Math.random() * 1_000_000);

function createRecipes() {
  const { subscribe, set, update } = writable<Recipe[]>([]);

  function init() {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) set(JSON.parse(stored));
  }

  subscribe((recipes) => {
    if (typeof window !== "undefined" && !dev) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  });

  return {
    subscribe,
    init,
    addRecipe: (title: string, category: string) =>
      update((recipes) => [...recipes, { id: newId(), title, category, ingredients: [] }]),
    removeRecipe: (id: number) => update((recipes) => recipes.filter((r) => r.id !== id)),
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
                ),
              }
            : r
        )
      ),
    updateCategory: (recipeId: number, category: string) =>
      update((recipes) =>
        recipes.map((r) => (r.id === recipeId ? { ...r, category } : r))
      ),
    clearAll: () => set([]),
    seedTestRecipes: () =>
      set([
        {
          id: newId(),
          title: "Classic Pancakes",
          category: "Breakfast",
          ingredients: [
            { id: newId(), name: "2 cups flour", checked: false },
            { id: newId(), name: "1.5 cups milk", checked: false },
            { id: newId(), name: "2 eggs", checked: false },
            { id: newId(), name: "1 tbsp sugar", checked: false },
          ],
        },
        {
          id: newId(),
          title: "Spaghetti Bolognese",
          category: "Dinner",
          ingredients: [
            { id: newId(), name: "200g spaghetti", checked: false },
            { id: newId(), name: "150g ground beef", checked: false },
            { id: newId(), name: "1 onion", checked: false },
            { id: newId(), name: "Tomato sauce", checked: false },
          ],
        },
        {
          id: newId(),
          title: "Veggie Salad",
          category: "Vegetarian",
          ingredients: [
            { id: newId(), name: "Lettuce", checked: false },
            { id: newId(), name: "Tomatoes", checked: false },
            { id: newId(), name: "Cucumber", checked: false },
            { id: newId(), name: "Olive oil", checked: false },
          ],
        },
      ]),
  };
}

export const recipes = createRecipes();
