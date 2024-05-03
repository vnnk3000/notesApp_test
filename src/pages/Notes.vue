<template>
    <div>
        <div class="notes__sort" v-if="notes.length > 1">
            Sort notes By: 
            <a href="#"
                class="notes__sort-button"
                :class="{'active': sortType === 'id'}"
                @click.prevent="sortItems('id')"
            >Date</a>
            <a href="#"
                class="notes__sort-button"
                @click.prevent="sortItems('title')"
                :class="{'active': sortType === 'title'}"
            >Title</a>
        </div>

        <div class="notes__grid" v-if="notes.length">
            <Note v-for="note in notes" 
                :note="note"
                :key="note.id"
            />
            <div class="note--add">
                <RouterLink :to="'/create-note'">+ Create more notes</RouterLink>
            </div>
        </div>
        <div v-else>
            <p>You don't have notes now.  <RouterLink :to="'/create-note'">Create new on here</RouterLink></p>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useStore } from 'vuex';
    import Note from "../components/Note.vue";
    
    const store = useStore();

    const sortType = ref(null);

    const notes = computed(()=> [...store.state.notes]);

    const sortItems = (sortParam) => {
        sortType.value = sortParam;
        notes.value.sort((a,b) => {
            const propA = a[sortParam].toString().toLowerCase();
            const propB = b[sortParam].toString().toLowerCase();
            if (propA < propB) {
                return -1;
            }
            if (propA > propB) {
                return 1;
            }
            return 0;
        })
    }
</script>