<template>
    <div>
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <img style="width:140px" :src="logo()">
            </nav>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <div class="sidebar">
                    <div class="fadie user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img style="width:35px;height:35px" :src="Account.image" class="img-circle elevation-2"
                                alt="User Image">
                        </div>
                        <div @click="menuser = !menuser ? 1: 0" class="info">
                            <a href="#" class="d-block">
                                {{Account.nickname}} <i :class="menuser ? 'fa fa-sort-up' : 'fa fa-sort-down'"></i></a>
                        </div>
                        <div v-if="menuser" class="usermenu">
                            <div class="ul">
                                <router-link tag="li" class="edit" :to="params(Account.id, 'full')">
                                    <div class="txt">تعديل الاكونت</div>
                                    <div class="ico"><i class="fa fa-edit "></i></div>
                                </router-link>
                                <router-link tag="li" class="pass" :to="params(Account.id, 'pass')">
                                    <div class="txt">تغير الباسورد</div>
                                    <div class="ico"><i class="fa fa-key"></i></div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li @click="alert = alert == li.to ? false : li.to" v-for="li in menue" :key="li.to"
                                class="nav-item has-treeview">
                                <router-link style="color:#92b8c9;" :to="{path: li.to}" v-if="li.viwe == '0'" tag="a"
                                    class="nav-link">
                                    <i class="nav-icon" :class="li.i"></i>
                                    <p>{{li.name}}</p>
                                </router-link>
                                <a href="#" style="color:#92b8c9;" class="nav-link" v-else>
                                    <i class="nav-icon" :class="li.i"></i>
                                    <p>{{li.name}}
                                        <i class="fas fa-angle-left right"></i></p>
                                </a>
                                <!-- v-if="li.to == alert" -->
                                <ul class="nav nav-treeview">
                                    <li v-if="li.viwe" class="nav-item">
                                        <router-link tag="a" class="nav-link" :to="'/'+li.to">
                                            <i class="nav-icon far fa-list-alt"></i>
                                            <p>{{li.viwe}}</p>
                                        </router-link>
                                    </li>
                                    <li v-if="li.add" class="nav-item">
                                        <router-link tag="a" class="nav-link" :to="{path: '/'+li.to+'/add'}">
                                            <i class="fa nav-icon fa-user-plus"></i>
                                            <p>{{li.add}}</p>
                                        </router-link>
                                    </li>
                                    <li v-if="li.sections" class="nav-item">
                                        <router-link tag="a" class="nav-link" :to="{path: '/'+li.to+'/'+EachSection.url}">
                                            <i :class="'nav-icon '+EachSection.i"></i>
                                            <p>{{EachSection.name}}</p>
                                        </router-link>
                                    </li>
                                    <li v-if="li.set" class="nav-item">
                                        <router-link tag="a" class="nav-link" :to="{path: '/'+li.to+'/setup'}">
                                            <i class="fa nav-icon fa-user-plus"></i>
                                            <p>Setup</p>
                                        </router-link>
                                    </li>
                                    <li v-for="(arr,ii) in li.list.data" :key="ii" class="nav-item">
                                        <router-link tag="a" class="nav-link" :to="{path: '/'+li.to+'/'+arr.url}">
                                            <i class="nav-icon" :class="arr.i"></i>
                                            <p>{{arr.name}}</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
    import json from '@/json/menu.json';
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
        name: "TopHeader",
        data() {
            return {
                alert: "",
                menue: json,
                menuser: "",
                EachSection: { "name": "ألاقسام", "url": "section", "i": "fas fa-book" },

            }
        },
        created() {},
        computed: {


            ...mapState([
                'settings',
                'Account',
                'DefaultLogo'

            ]),
            ...mapGetters([
                'API',
                'UPLOADFILE',
                'include'
            ])
        },
        components: {},
        methods: {
            logo(){
                if(this.settings.public.logos){
                    return this.settings.public.logos
                } else {
                   return this.include("def", this.DefaultLogo);
                }

            },
            ...mapMutations([
                'modalContainer',
                'AccountArr'
            ]),

            params(id, type) {
                return {
                    name: 'updates',
                    params: {
                        id: id,
                        name: '_users',
                        section: 'users',
                        type: type
                    }
                }
            },
        },
    }
</script>
<style>
    .nav li {
        background: #494e54;
        margin: 2px 0;
        color: white !important;
    }

    .nav li p {
        color: white !important;
        font-size: 13px
    }

    .nav li i {
        color: white !important;
    }

    .nav ul {
        margin: 0 12px;
        font-size: 10px !important;
    }

    .user-panel {
        vertical-align: middle;
    }

    .nav ul li {
        margin: 0 10px;
        font-size: 10px !important;
        background: #594e54;
    }

    .nav ul li p {
        margin: 0 10px;
        font-size: 12px !important;
        background: #594e54;
    }

    .router-link-active {
        color: white !important;
    }

    .li_hover * {
        text-decoration: none
    }

    .ul * {
        text-decoration: none
    }

   .fadie .usermenu {
        margin-top: 44px;
        z-index: 9999;
        background: #594e54;
        display: block;
        width: 100% !important;
        position: absolute;
        box-shadow: 0px 0px 5px 0px #fff;
        font-family: 'Cairo', sans-serif;
        text-align: right;
        padding: 3px;
        font-size: 15px
    }

  .fadie  .usermenu li {
        color: white !important;
        padding: 3px;
        cursor: pointer;
    }

  .fadie  .usermenu i {
        color: white !important;
        float: right;
        margin: 5px;
        text-align: center
    }

  .fadie  .ul .edit div {
        display: inline-block;
        vertical-align: middle
    }

  .fadie  .ul .edit .ico {
        width: 30px;
    }

  .fadie  .ul .pass .ico {
        width: 26px;
        margin: 0 3px
    }

   .fadie .ul .edit .txt,
   .fadie .ul .pass .txt {
        width: 130px
    }

   .fadie .ul .pass div {
        display: inline-block;
        vertical-align: middle
    }

   .fadie .info {
        z-index: 9;
        position: relative;
        overflow:  !important;
    }

    .user-panel,
    .user-panel .info {
        overflow: unset !important;
        ;
        white-space: nowrap
    }
</style>