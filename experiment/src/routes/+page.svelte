<script lang="ts">
  import { recipes } from "$lib/stores/recipes";
  import RecipeCard from "$lib/components/RecipeCard.svelte";
  import AddRecipeForm from "$lib/components/AddRecipeForm.svelte";
  import { onMount } from "svelte";

  let activeCategory = "";

  if (import.meta.env.DEV && typeof window !== "undefined") {
    // @ts-ignore
    window.recipes = recipes;
  }

  onMount(() => {
    recipes.init();
  });

  // Merge default categories with user-added ones, include "Uncategorized"
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

<main class="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen font-sans">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800">🍴 Recipe Cards</h1>
    <button
      type="button"
      class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      on:click={() => recipes.clearAll()}
    >
      Clear All
    </button>
  </div>

  <!-- Add Recipe Form -->
  <AddRecipeForm></AddRecipeForm>

  <!-- Category Filter -->
  <div class="mb-6">
    <label for="categoryFilter" class="mr-2 font-medium text-gray-700">Filter:</label>
    <select
      id="categoryFilter"
      bind:value={activeCategory}
      class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All</option>
      <option value="Uncategorized">Uncategorized</option>
      {#each allCategories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <!-- Recipe Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each $recipes.filter(r => !activeCategory || (r.category || "Uncategorized") === activeCategory) as recipe (recipe.id)}
      <RecipeCard {recipe}></RecipeCard>
    {/each}
  </div>
</main>
