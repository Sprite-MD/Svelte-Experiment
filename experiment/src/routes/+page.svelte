<script lang="ts">
  import { recipes } from '$lib/stores/recipes';

  let newRecipe = '';
  let newIngredient: Record<number, string> = {};
</script>

<main class="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen font-sans">
  <h1 class="text-center text-3xl font-bold mb-6 text-gray-800">🍴 Recipe Cards</h1>

  <!-- Add Recipe Form -->
  <form
    class="flex mb-6"
    on:submit|preventDefault={() => {
      if (newRecipe.trim()) {
        recipes.addRecipe(newRecipe.trim());
        newRecipe = '';
      }
    }}
  >
    <input
      type="text"
      bind:value={newRecipe}
      placeholder="Enter recipe name..."
      class="w-[70%] p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <button
      type="submit"
      class="w-[30%] bg-green-500 text-white rounded-r-md hover:bg-green-600 transition text-sm sm:text-base"
    >
      Add Recipe
    </button>
  </form>

  <!-- Recipe Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each $recipes as recipe (recipe.id)}
      <div class="bg-white rounded-xl shadow-md p-4 border flex flex-col h-full">
        <!-- Header -->
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold text-gray-700">{recipe.title}</h2>
          <button
            type="button"
            aria-label="Remove recipe"
            class="text-red-500 hover:text-red-700 text-lg font-bold"
            on:click={() => recipes.removeRecipe(recipe.id)}
          >
            ✕
          </button>
        </div>

        <!-- Ingredient Form -->
        <form
          class="flex mb-3"
          on:submit|preventDefault={() => {
            const value = (newIngredient[recipe.id] ?? '').trim();
            if (value) {
              recipes.addIngredient(recipe.id, value);
              newIngredient[recipe.id] = '';
            }
          }}
        >
          <input
            type="text"
            bind:value={newIngredient[recipe.id]}
            placeholder="Add ingredient..."
            class="w-[70%] p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            class="w-[30%] bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Add
          </button>
        </form>

        <!-- Ingredients List -->
        <ul class="space-y-1 flex-1 overflow-y-auto max-h-48">
          {#each recipe.ingredients as ingredient (ingredient.id)}
            <li class="flex justify-between items-center p-2 border rounded-md hover:bg-gray-50">
              <button
                type="button"
                class={`text-left flex-1 ${ingredient.checked ? 'line-through text-gray-500' : ''}`}
                on:click={() => recipes.toggleIngredient(recipe.id, ingredient.id)}
              >
                {ingredient.name}
              </button>
              <button
                type="button"
                aria-label="Remove ingredient"
                class="ml-2 text-red-500 hover:text-red-700"
                on:click={() => recipes.removeIngredient(recipe.id, ingredient.id)}
              >
                ✕
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</main>
