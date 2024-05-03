<template>
    <div class="note__editor">
        <form class="form" @submit.prevent="saveNote">
            <div class="form__field" :class="{'error' : isError}">
                <label>
                    <p>Note title</p>
                    <input type="text" placeholder="Note title" v-model.trim="formData.formTitle">
                    <p class="form__error">This field is required</p>
                </label>
            </div>
            <div class="form__field">
                <label>
                    <p>Note text</p>
                    <textarea placeholder="Note text" v-model="formData.formText"/>
                </label>
            </div>
            <div class="form__field">
                <label>
                    <p>Select category</p>
                    <select name="category" v-model="formData.formCategory">
                        <option v-for="(category, i) in Object.keys(CATEGORIES)" :key="i" :value="category"> {{ CATEGORIES[category] }} </option>
                    </select>
                </label>
            </div>
            <button class="form__button">
                {{route.params.id ? 'Edit' : 'Create'}} note
            </button>
        </form>
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import { ref, computed, watch, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import * as types from '../store/mutation-types';
    import { generateDate } from '@/helpers';

    const CATEGORIES = {
        family: 'Family',
        work: 'Work',
        friends: 'Friends',
        other: 'Other',
    }
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formData = ref({
        formTitle: '',
        formText: '',
        formCategory: ''
    });
    const isError = ref(false);

    let editableNote = null;

    onMounted(() => {
        if (route.params.id) {
            editableNote = store.state.notes.find((note) => note.id == route.params.id);
            const { title, body, category } = editableNote;
            formData.value.formTitle = title;
            formData.value.formText = body;
            formData.value.formCategory = category;
        }
    })

    const saveNote = () => {
        if (!simpleFormValidate.value) {
            isError.value = true;

            return
        } else {
            let noteObject = {
                title: formData.value.formTitle,
                body: formData.value.formText,
                category: formData.value.formCategory,
            }

            if (editableNote) {
                noteObject = {...editableNote, ...noteObject};
                noteObject.dateEdited = generateDate();
                store.commit(types.EDIT_NOTE, noteObject);
            } else {
                noteObject.id = Date.now();
                noteObject.dateCreated = generateDate();
                store.commit(types.ADD_NOTE, noteObject);
            }
            router.push({ path: '/notes' });
        }
    }

    const simpleFormValidate = computed(() => {
        let { formTitle } = formData.value;
        
        return formTitle.length;
    })

    watch(formData, (newValue) => {
        if (newValue.formTitle.length) isError.value = false;
    }, { deep: true })

</script>