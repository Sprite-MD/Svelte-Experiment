<script lang="ts">
  import { recipes, addRecipe, removeRecipe, addIngredient, removeIngredient } from '$lib/stores/recipes';
  import type { Recipe, Ingredient } from '$lib/stores/recipes';

  let newRecipe = '';
  let newIngredient: Record<number, string> = {};
</script>

<main class="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen font-sans">
  <h1 class="text-center text-3xl font-bold mb-6 text-gray-800">🍴 Recipe Cards</h1>

  <!-- Add Recipe Form -->
  <form class="flex gap-2 mb-6" on:submit|preventDefault={() => { if(newRecipe.trim()) addRecipe(newRecipe); newRecipe = ''; }}>
    <input type="text" bind:value={newRecipe} placeholder="Enter recipe name..." class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"/>
    <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Add Recipe</button>
  </form>

  <!-- Recipe Cards -->
  <div class="space-y-6">
    {#each $recipes as recipe (recipe.id)}
      <div class="bg-white rounded-xl shadow-md p-4 border">
        <!-- Header -->
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold text-gray-700">{recipe.title}</h2>
          <button class="text-red-500 hover:text-red-700 text-lg font-bold" on:click={() => removeRecipe(recipe.id)}>✕</button>
        </div>

        <!-- Ingredient Form -->
        <form class="flex gap-2 mb-3" on:submit|preventDefault={() => { if(newIngredient[recipe.id]?.trim()){ addIngredient(recipe.id, newIngredient[recipe.id]); newIngredient[recipe.id] = ''; } }}>
          <input type="text" bind:value={newIngredient[recipe.id]} placeholder="Add ingredient..." class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <button type="submit" class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Add</button>
        </form>

        <!-- Ingredients List -->
        <ul class="space-y-1">
          {#each recipe.ingredients as ingredient (ingredient.id)}
            <li class="flex justify-between items-center p-2 border rounded-md hover:bg-gray-50">
              <span>{ingredient.name}</span>
              <button class="text-red-500 hover:text-red-700" on:click={() => removeIngredient(recipe.id, ingredient.id)}>✕</button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</main>
