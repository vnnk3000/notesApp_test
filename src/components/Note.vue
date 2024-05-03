<template>
    <div class="note">
        <div class="note__content">
            <div class="note__header">
                <span class="note__date note__date--created">{{ note.dateCreated }}</span>
                <div class="note__buttons">
                    <button class="note__button note__button--fav" @click.prevent="onAddToFav">
                        <BookmarkIcon :class="{ 'active': note.isFavorite }"/>
                    </button>
                    <RouterLink class="note__button note__button--edit" :to="`/edit-note/${note.id}`">
                        <PencilIcon />
                    </RouterLink>
                    <button class="note__button note__button--delete" @click.prevent="onDeleteNote">
                        <CrossIcon />
                    </button>
                </div>
            </div>
            <div class="note__top">
                <h4 class="note__title">{{note.title}}</h4>
            </div>
            <div class="note__body">
                <p class="note__text">
                    {{ note.body }}
                </p>
            </div>
            <div class="note__footer">
                <span class="note__date note__date--edited" v-if="note.dateEdited">Last edited: {{ note.dateEdited }}</span>
                <span class="note__category">{{ note.category }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    import PencilIcon from '../assets/static/icons/pencil.svg';
    import CrossIcon from '../assets/static/icons/cross.svg';
    import BookmarkIcon from '../assets/static/icons/bookmark.svg';
    import * as types from '../store/mutation-types'

    const store = useStore();

    const  { note } = defineProps(['note']);

    const onDeleteNote = () => {
        store.commit(types.DELETE_NOTE, note.id);
    }

    const onAddToFav = () => {
        const isFav = !!note.isFavorite;
        store.commit(types.EDIT_NOTE, {...note, isFavorite: !isFav});
    }
</script>