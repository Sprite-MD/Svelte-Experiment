<script lang="ts">
  import { recipes, CATEGORIES } from '$lib/stores/recipes';

  let newRecipe = '';
  let newIngredient: Record<string, string> = {};
  let activeCategory = '';
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
  <form
    class="flex gap-2 mb-6 items-center"
    on:submit|preventDefault={() => {
      if (newRecipe.trim()) {
        recipes.addRecipe(newRecipe.trim());
        newRecipe = '';
      }
    }}
  >
    <label for="newRecipe" class="sr-only">Recipe name</label>
    <input
      id="newRecipe"
      type="text"
      bind:value={newRecipe}
      placeholder="Enter recipe name..."
      class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
    >
      Add Recipe
    </button>
  </form>

  <!-- Category Filter -->
  <div class="mb-6">
    <label for="categoryFilter" class="mr-2 font-medium text-gray-700">
      Filter:
    </label>
    <select
      id="categoryFilter"
      bind:value={activeCategory}
      class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All</option>
      {#each CATEGORIES as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <!-- Recipe Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each $recipes.filter(r => !activeCategory || r.category === activeCategory) as recipe (recipe.id)}
      <div class="bg-white rounded-xl shadow-md p-4 border flex flex-col h-full">
        <!-- Header -->
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold text-gray-700">{recipe.title}</h2>
          <button
            type="button"
            class="text-red-500 hover:text-red-700 text-lg font-bold"
            on:click={() => recipes.removeRecipe(recipe.id)}
          >
            ✕
          </button>
        </div>

        <!-- Category Selector for each recipe -->
        <div class="mb-3">
          <label for={`category-${recipe.id}`} class="block mb-1 text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id={`category-${recipe.id}`}
            bind:value={recipe.category}
            on:change={(e: Event) => {
              const category = (e.target as HTMLSelectElement).value;
              recipes.updateCategory(recipe.id, category);
            }}
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Uncategorized</option>
            {#each CATEGORIES as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>

        <!-- Ingredient Form -->
        <form
          class="flex gap-2 mb-3 items-center"
          on:submit|preventDefault={() => {
            const value = (newIngredient[recipe.id] ?? '').trim();
            if (value) {
              recipes.addIngredient(recipe.id, value);
              newIngredient[recipe.id] = '';
            }
          }}
        >
          <label for={`ingredient-${recipe.id}`} class="sr-only">New ingredient</label>
          <input
            id={`ingredient-${recipe.id}`}
            type="text"
            bind:value={newIngredient[recipe.id]}
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

        <!-- Ingredients List -->
        <ul class="space-y-1 flex-1 overflow-y-auto">
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
