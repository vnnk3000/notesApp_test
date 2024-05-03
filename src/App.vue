<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/notes">Notes</RouterLink>
            </nav>
        </div>
    </header>

    <Transition mode="out-in">
        <RouterView />
    </Transition>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { useStore } from 'vuex';
    import * as types from './store/mutation-types'

    const store = useStore();

    store.dispatch('replaceState');
    store.subscribe(({ type }, state) => {
        if (type === types.EDIT_NOTE ||
            type === types.ADD_NOTE ||
            type === types.DELETE_NOTE) {
            localStorage.setItem('user_notes', JSON.stringify(state.notes));
        }
    });
</script>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: transform .5s ease, opacity .5s ease;
    }

    .v-enter-from,
    .v-leave-to{
        transform: translate3d(0,5px,0);
        opacity: 0;
    }
</style>
