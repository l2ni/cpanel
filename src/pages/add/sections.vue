<template>
    <div id="format" class="noselect">
        <format :params="params ? params : {id:false,section:$route.name}" />
    </div>
</template>
<script>
    import format from '@/components/format.vue';
    export default {
        props: ['params'],
        components: {
            format
        }
    }
</script>