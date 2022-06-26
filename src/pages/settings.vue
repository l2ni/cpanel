<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="head">
                                <h3>Settings</h3>
                            </div>
                            <div class="setup-links">
                                <div v-for="(item,i) in list" :key="i" class="link-container">
                                    <router-link tag="a" class="link" :to="params(item.url)">
                                        <div class="icon"><i :class="item.icon"></i></div>
                                        <div class="content-setup">
                                            <span class="title">
                                                {{item.name}} </span>
                                            <span class="desc">{{item.title}}</span>
                                        </div>
                                    </router-link>
                                </div>
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

                list: [{
                        name: "General Settings",
                        title: "General settings and configuration",
                        icon: "fas fa-cog fa-fw",
                        url: "general"
                    },
                    {
                        name: "Administrator Users",
                        title: "Setup and manage staff members",
                        icon: "fas fa-user fa-fw",
                        url: "admins"
                    },
                    {
                        name: "Database Backups",
                        title: "Manage automated backups",
                        icon: "fas fa-server fa-fw",
                        url: "backups"
                    },
                ]

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
            params(id) {
                return {
                    name: 'updates',
                    params: {
                        name: this.$route.name
                    }
                }
            },

        }
    }
</script>
<style>

.link-container {
    background: white!important;
    border: 1px solid #ddd;
    margin: 5px 0;
  
}
.link {
    display: block;
    margin: 0 0 8px 0;
    padding: 10px 20px;
    text-decoration: none;
    color: #444;
    background-color: #fff;
    height: 70px;
   
}

.setup-links .link .content-setup .desc {
    display: block;
    font-size: .9em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #555;
}
.setup-links .link .content-setup .title {
    display: block;
    font-size: 1.2em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.setup-index .link-container .content-setup {
    padding: initial;
    min-height: initial;
}
.setup-links .link .content-setup {
    margin-top: 4px;
    margin-left: 60px;
}
.content-setup {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}
* {
    box-sizing: border-box;
}
.setup-links .link {
    color: #444;
}
.setup-links .link-container {
    padding-left: 4px;
    padding-right: 4px;
}
* {
    box-sizing: border-box;
}
.link .icon {
    float: left;
    color: #666;
    font-size: 2.4em;
    border-radius: 3px;
}
.setup-links .link i {
    margin: 0;
}
* {
    box-sizing: border-box;
}
.setup-links .link .icon {
    color: #666;
    font-size: 2.4em;
}
.app-page {
    margin: 0 20px;
    background: #f5f5f5;
    padding: 20px;
}
.app-page .app-page-content {
    border: 1px solid #ddd;
}

@media screen and (max-width: 600px) {
.app-page {
        padding: 0;
        margin: 0;
}
}



</style>