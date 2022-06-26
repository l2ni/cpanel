<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="head">
                                <h3>title</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>

    import {
        mapState
    } from 'vuex'
    import {
        mapGetters
    } from 'vuex'
    import {
        mapMutations
    } from 'vuex'
    export default {
        created() {},
        data() {
            return {

            }
        },
        computed: {
            ...mapState([

            ]),
            ...mapGetters([
                'API'
            ])
        },
        props: [],
        updated: function () {},
        components: {},
        watch: {},
        methods: {
            ...mapMutations([
                'modalContainer',
                'deleteAjax',

            ]),

        }
    }
</script>
<style>
/*
en
    font-family: 'Noto Serif', serif;

    font-family: 'Orelega One', cursive;

    font-family: 'Oswald', sans-serif;

    font-family: 'PT Sans Narrow', sans-serif;
---

ar

    font-family: 'Almarai', sans-serif;

    font-family: 'Baloo Bhaijaan 2', cursive;

    font-family: 'Cairo', sans-serif;

    font-family: 'Changa', sans-serif;

    font-family: 'Harmattan', sans-serif;

    font-family: 'IBM Plex Sans Arabic', sans-serif;

    font-family: 'Mada', sans-serif;

    font-family: 'Readex Pro', sans-serif;

    font-family: 'Tajawal', sans-serif;


*/
    .app-page .app-page-content {
        border: 1px solid #ddd;
    }

    @media screen and (max-width: 600px) {

    }
</style>