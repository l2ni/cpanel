<!-- eslint-disable -->
<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="head">
                                <h3>{{getstring('title')}}</h3>
                            </div>
                            <div class="sectionitem" v-for="(item,i) in section" :key="i">
                                <div class="sections item" v-if="item.tables.toLowerCase() == $route.name.toLowerCase()">
                                    <div class="view">
                                        <img :src="getjson(item)">
                                        <div>{{uncodeHTML(item.name)}}</div>
                                    </div>
                                    <div class="option-i">
                                        <div @click="remove({table:'sections',id:item.id,i:i})" class="edit">
                                            <i class="far fa-trash-alt"></i>
                                            <span>Remove</span>
                                        </div>
                                        <router-link tag="div" class="edit" :to="params(item.id)">
                                            <i class="fas fa-edit"></i>
                                            <span>Edit</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<!-- eslint-disable -->

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
        created() {
            this.get_item()
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapState([
                'section'
            ]),
            ...mapGetters([
                'API',
                'include',
                'uncodeHTML'

            ])
        },
        methods: {
            get_item() { 
                this.API(`get.php?action=sections`, (data) => {
                    if (data) {
                        this.modalContainer(false);
                        this.Setsection(data);
                    }
                });
            },
            getstring(ev, txt) {
                if (ev == 'title') {
                    switch (this.$route.name) {
                        case 'Workouts':
                            txt = 'Swimming Workouts'
                            break;
                        case 'Fitness':
                            txt = 'Fitness'
                            break;
                        case 'Culture':
                            txt = 'Specialized Culture'
                            break;
                        case 'Coaches':
                            txt = "Coach's Guide"
                            break;
                    }
                }
                return txt;
            },
            params(id) {
                return {
                    name: 'updates',
                    params: {
                        id: id,
                        name: this.$route.name,
                        section: "section"
                    }
                }
            },
            ...mapMutations([
                'modalContainer',
                'deleteAjax',
                'Setsection',

            ]),
            images(url) {
                url = JSON.parse(url);
                return url[0];
            },
           getjson(item) {
                var url = JSON.parse(item.image);
                var video = JSON.parse(item.video);

                if (url.length > 0) {
                    return url[0];
                } 
                else if(video.length > 0) {
                    return video[0].url;
                }
            },
            remove(obj) {
                this.modalContainer("remove");
                this.deleteAjax(obj);

            },
        }
    }
</script>
<style>
    .app-page .app-page-content {
        border: 1px solid #ddd;
    }

    .sections.item .view {
        background: mintcream;
        padding: 10px;
        border: 1px solid #ddd;
        width: 160px;

    }

    .sections.item {
        background: white;
        border: 1px solid #ddd;
        padding: 20px;
        vertical-align: top
    }

    .container {
        background: white
    }

    .sections.item .view div {
        border-top: 1px solid #c4d3d7;
        padding-top: 15px;
        font-weight: 900;
        font-size: 18px;
        font-family: 'PT Sans Narrow', sans-serif;
    }

    .sectionitem {
        display: inline-block;
    }

    .sections.item .view img {
        padding-bottom: 15px;
        width: 120px;
    }

    .sections.item {
        display: inline-block;
        background: mintcream;
        text-align: center;
        padding: 10px;
        border: 1px solid #ddd;
        margin: 0 5px
    }

    .sections.item .edit {
        padding-top: 20px;
        text-align: center;
        cursor: pointer;
    }

    .sections.item .edit * {
        vertical-align: middle;
        font-size: 13px;
        color: magenta;
        margin: 0 2.5px;
    }

    .sections.item .option-i div {
        display: inline-block;
        width: 50%
    }

    @media screen and (max-width: 600px) {

        .sections.item {
            background: white;
            border: 1px solid #ddd;
            padding: 20px;
            display: block;
            margin: 10px 0;
        }

        .sections.item .view img {

            width: 100% !important;
        }

        .sections.item .view {

            width: 100% !important;
        }
    }
</style>