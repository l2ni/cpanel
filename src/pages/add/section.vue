<template>
    <div id="format" class="noselect">
        <format :taps="tap" />
    </div>
</template>
<script>
    import format from '@/components/format/tap.vue';
    export default {

        components: {
            format
        },
        data() {
            return {
                tap: {
                    tap: [{
                        id: 0,
                        txt: "الأقسام"
                    }],
                    table: "section",
                    section: this.$route.path.split("/")[1]
                }
            }
        }
    }
</script>