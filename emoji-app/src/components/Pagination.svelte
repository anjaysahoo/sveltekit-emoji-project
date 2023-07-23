<!-- Pagination.svelte -->
<script>
    export let fullArray = [];

    const itemsPerPage = 10;
    let currentPage = 1;

    // Function to get the items for the current page
    function getCurrentPageItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return fullArray.slice(startIndex, endIndex);
    }

    // Function to navigate to the previous page
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    // Function to navigate to the next page
    function nextPage() {
        const totalPages = Math.ceil(fullArray.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
</script>

<style>
    /* Add your styling for pagination buttons and container here */
</style>

<div>
    {#each getCurrentPageItems() as item}
        <div>{item}</div>
    {/each}

    <!-- Pagination buttons -->
    <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
    <button on:click={nextPage} disabled={currentPage === Math.ceil(fullArray.length / itemsPerPage)}>Next</button>
</div>
