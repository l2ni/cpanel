<template>
    <div>
        <Sections v-if="froms('section')" :params="ROOT(1)" />
        <Users v-else-if="froms('users')" :params="ROOT(1)" />
        <Home v-else />
    </div>
</template>
<script>
    import Sections from "../add/sections.vue"
    import Users from '../add/users.vue'
    import Home from '../../views/Home.vue'
    export default {
        watch: {},
        components: {
            Sections,
            Home,
            Users
        },
        created() {},
        methods: {
            froms(name) {
                let root = this.ROOT();
                if (root == name) {
                    return true
                }
            },

            ROOT(value, param) {
                param = this.$route.params;
                return value ? {
                    id: param.id,
                    section: param.name.toLowerCase(),
                    type: param.type ? param.type : false
                } : param.section;
            },
        }
    }
</script>