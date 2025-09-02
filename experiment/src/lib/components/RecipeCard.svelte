<script lang="ts">
  import { recipes, type Recipe } from "$lib/stores/recipes";
  import { onMount } from "svelte";

  export let recipe: Recipe;

  let newIngredient = "";
  let categoryValue: string;

  // Initialize category once on mount to avoid overwriting
  onMount(() => {
    categoryValue = recipe.category || "Uncategorized";
  });

  function onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    categoryValue = value;
    recipes.updateCategory(recipe.id, value === "Uncategorized" ? "" : value);
  }

  function addIngredient() {
    const trimmed = newIngredient.trim();
    if (!trimmed) return;
    recipes.addIngredient(recipe.id, trimmed);
    newIngredient = "";
  }

  function toggleIngredient(id: number) {
    recipes.toggleIngredient(recipe.id, id);
  }

  function removeIngredient(id: number) {
    recipes.removeIngredient(recipe.id, id);
  }

  function removeRecipe() {
    recipes.removeRecipe(recipe.id);
  }

  // All categories for dropdown including user-added ones
  $: allCategories = Array.from(
    new Set([
      "Dessert",
      "Breakfast",
      "Lunch",
      "Dinner",
      "Vegetarian",
      ...$recipes.map(r => r.category).filter(c => c),
    ])
  ).sort((a, b) => a.localeCompare(b));
</script>

<div class="bg-white shadow-md rounded-2xl p-4 flex flex-col h-full">
  <div class="flex justify-between items-center mb-3">
    <h2 class="text-xl font-semibold">{recipe.title}</h2>
    <button on:click={removeRecipe} class="text-red-500 hover:text-red-700">✕</button>
  </div>

  <!-- Category Selector -->
  <div class="mb-3">
    <label for={`category-${recipe.id}`} class="block mb-1 text-sm font-medium text-gray-700">
      Category:
    </label>
    <select
      id={`category-${recipe.id}`}
      bind:value={categoryValue}
      on:change={onCategoryChange}
      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="Uncategorized">Uncategorized</option>
      {#each allCategories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <!-- Ingredients List -->
  <ul class="space-y-1 flex-1 overflow-y-auto mb-3">
    {#each recipe.ingredients as ing (ing.id)}
      <li class="flex justify-between items-center p-2 border rounded-md hover:bg-gray-50">
        <button
          type="button"
          class="text-left flex-1 {ing.checked ? 'line-through text-gray-500' : ''}"
          on:click={() => toggleIngredient(ing.id)}
        >
          {ing.name}
        </button>
        <button
          type="button"
          class="ml-2 text-red-500 hover:text-red-700"
          on:click={() => removeIngredient(ing.id)}
        >
          ✕
        </button>
      </li>
    {/each}
  </ul>

  <!-- Add Ingredient Form -->
  <form on:submit|preventDefault={addIngredient} class="flex gap-2 items-center">
    <input
      type="text"
      bind:value={newIngredient}
      placeholder="Add ingredient..."
      class="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0"
    />
    <button
      type="submit"
      class="shrink-0 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Add
    </button>
  </form>
</div>

<style>
  .line-through {
    text-decoration: line-through;
    color: gray;
  }
</style>
