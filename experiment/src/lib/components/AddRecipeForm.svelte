<script lang="ts">
  import { recipes } from "$lib/stores/recipes";

  let title = "";
  let category = "";

  function addRecipe() {
    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim() || "Uncategorized";

    if (!trimmedTitle) return;

    recipes.addRecipe(trimmedTitle, trimmedCategory);

    title = "";
    category = "";
  }
</script>

<div class="bg-white shadow-md rounded-2xl p-4 mb-6 w-full max-w-md">
  <h2 class="text-lg font-semibold mb-3">Add a Recipe</h2>
  <form class="flex flex-col gap-2" on:submit|preventDefault={addRecipe}>
    <input
      type="text"
      bind:value={title}
      placeholder="Recipe Title"
      class="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      required
    />
    <input
      type="text"
      bind:value={category}
      placeholder="Category (optional, defaults to Uncategorized)"
      class="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-600 transition"
    >
      Add Recipe
    </button>
  </form>
</div>
