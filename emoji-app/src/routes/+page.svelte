<script lang="ts">
    import "../global.css";
    import {onMount} from "svelte";
    import type {PageData} from "./$types";
    import Icon from "../components/Icon.svelte";
    import {leftArrow, rightArrow} from "../utils/appIcon";


    export let data: PageData;
    let itemsPerPage = 10; // Number of items to show per page
    let currentPage = 1;   // Current page number
    let totalPages = 1;    // Total number of pages

    let emojiItems = [];
    let paginatedEmojiItems = [];

    onMount(() => {
        emojiItems = data.data;
        paginatedEmojiItems = data.data;
        updateDisplayedItems();
    });

    // const updateEmojiList = (category) => {
    //     const temp = data.data.filter(item => item.category === category);
    //     emojiItems = temp;
    //     return  temp;
    // }

    // Update the displayed items based on the selected page
    const updateDisplayedItems = () => {
        totalPages = Math.ceil(paginatedEmojiItems.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        emojiItems = paginatedEmojiItems.slice(startIndex, endIndex);
    };

    // Calculate the total number of pages
    const calculateTotalPages = () => {
        totalPages = Math.ceil(data.data.length / itemsPerPage);
    };

    // Called when a new category is selected to update the displayed items and recalculate total pages
    const updateEmojiList = (category) => {
        const temp = data.data.filter(item => item.category === category);
        paginatedEmojiItems = temp;
        calculateTotalPages();
        currentPage = 1; // Reset to the first page when changing categories
        updateDisplayedItems();
        return;
    };

    // Called when the "Next" button is clicked
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedItems();
        }
    };

    // Called when the "Previous" button is clicked
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplayedItems();
        }
    };

    // Calculate the total pages initially
    calculateTotalPages();
</script>


<!----------------------------- HTML ----------------------------->
<main>
    <div class="filter">
        <button class="filter__box" on:click={() => updateEmojiList('smileys and people')}>
            smileys and people
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('flags')}>
            flags
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('symbols')}>
            symbols
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('objects')}>
            objects
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('activities')}>
            activities
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('travel and places')}>
            travel and places
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('food and drink')}>
            food and drink
        </button>
        <button class="filter__box" on:click={() => updateEmojiList('animals and nature')}>
            animals and nature
        </button>
    </div>

    <section>
        {#each emojiItems as item}
            <div class="card">
                <div class="card__emoji">
                    {@html item.htmlCode[0]}
                </div>
                <div class="card-box card__category">
                    <div class="card-box__head card__category__head">
                        Category
                    </div>
                    <div class="card-box__body card__category__body">
                        {item.category}
                    </div>
                </div>
                <div class="card-box card__group">
                    <div class="card-box__head card__group__head">
                        Group
                    </div>
                    <div class="card-box__body card__group__body">
                        {item.group}
                    </div>
                </div>
                <div class="card-box card__name">
                    <div class="card-box__head card__name__head">
                        Name
                    </div>
                    <div class="card-box__body card__name__body">
                        {item.name}
                    </div>
                </div>
                <div class="card-box card__unicode">
                    <div class="card-box__head card__unicode__head">
                        Unicode
                    </div>
                    <div class="card-box__body card__unicode__body">
                        {item.unicode[0]}
                    </div>
                </div>
            </div>
        {/each}
    </section>

    <div class="pagination">
        <button on:click={goToPreviousPage} disabled={currentPage === 1}>
            <Icon d={leftArrow}/>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button on:click={goToNextPage} disabled={currentPage === totalPages}>
            <Icon d={rightArrow}/>
        </button>
    </div>

</main>


<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style>

    button{
        all: unset;
    }

    .filter{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
        background: #181935;
        flex-wrap: wrap;
        justify-content: center;
    }

    .filter__box{
        padding: 0.5rem;
        background: #d4586e;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    section {
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
        padding: 3rem;
        justify-items: center;
        background: #9594a2;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        background: #181935;
        border-radius: 10px;
        width: 20rem;
    }

    .card__emoji {
        font-size: 5rem;
        text-align: center;
    }

    .card-box {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background: aqua;
        border-radius: 5px;
        gap: 0.5rem;
    }

    .card-box__head {
        font-size: small;
        font-weight: bold;
    }

    .card-box__body {
        font-size: 1.5rem;
    }

    .card__category{
        background: #0fbe7b;
    }

    .card__group{
        background: #126aff;
    }

    .card__name{
        background: #f1d45c;
    }

    .card__unicode{
        background: #86e2f1;
    }

    .pagination{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
        background: #181935;
        justify-content: center;
        color: white;
        align-items: center;
    }

    .pagination button{
        padding: 5px;
        background: #d4586e;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
    }

    @media screen and (max-width: 359px){
        main{
            width: fit-content;
        }
    }
</style>
<!----------------------------------------------------------------->
