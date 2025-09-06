<script lang="ts">
  import type { Recipe } from '$lib/stores/recipes';
  export let selectedRecipe: Recipe;

  let flipped = false;
</script>

<style>
  .flip-card {
    perspective: 1000px;
    width: 100%;
    height: 100%;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
    top: 0;
    left: 0;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
</style>

<div class="flip-card {flipped ? 'flipped' : ''}">
  <div class="flip-card-inner">
    <!-- Front side -->
    <div class="flip-card-front bg-white rounded-xl p-6">
      <h2 class="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
      <p class="text-sm text-gray-500 mb-4">{selectedRecipe.category || "Uncategorized"}</p>

      <h3 class="text-lg font-semibold mb-2">Ingredients:</h3>
      <ul class="list-disc list-inside space-y-1">
        {#each selectedRecipe.ingredients as ingredient (ingredient.id)}
          <li class="text-gray-700">{ingredient.name}</li>
        {/each}
      </ul>

      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        on:click={() => flipped = true}
      >
        View Instructions →
      </button>
    </div>

    <!-- Back side -->
    <div class="flip-card-back bg-white rounded-xl p-6">
      <h2 class="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
      <h3 class="text-lg font-semibold mb-2">Instructions:</h3>
      <p class="text-gray-700">
        {#if selectedRecipe.instructions}
          {selectedRecipe.instructions}
        {:else}
          No instructions provided yet.
        {/if}
      </p>

      <button
        class="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        on:click={() => flipped = false}
      >
        ← Back to Ingredients
      </button>
    </div>
  </div>
</div>
