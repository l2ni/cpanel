<template>
    <div @click="menu = ''" class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="app-page">
                        <div class="head">
                            <h3>View/Search Clients (<b>{{Arrusers().length}}</b>)</h3>
                        </div>
                        <div class="searchUsers">
                            <div class="usersContent">
                                <div class="img"><i class="fas fa-search"></i></div>
                                <div class="inputdiv">
                                    <span class="des">Username</span>
                                    <input v-model="name" type="text">
                                </div>
                                <div class="inputdiv">
                                    <span class="des">Email</span>
                                    <input v-model="mail" type="text">
                                </div>
                                <div class="inputdiv">
                                    <span class="des">Status</span>
                                    <select v-model="SelectStatus" name="status">
                                        <option :value="'Any'">Any</option>
                                        <option :value="'Active'">Active</option>
                                        <option :value="'Suspension'">Suspension</option>
                                    </select>
                                </div>
                                <div @click="searchGo()" class="go"><input type="button" value="Search"></div>
                            </div>
                        </div>
                        <div class="pageContent">
                            <div class="dis" v-for="(user, i) in Arrusers()" :key="i">
                                <div v-if="!user.hide" class="user">
                                    <div class="usermenu" v-on:click.stop.prevent>
                                        <i v-on:click.stop.prevent="menu = !menu ? user.id: ''"
                                            class="fas fa-ellipsis-h"></i>
                                        <div v-if="menu == user.id" class="ul">
                                            <router-link tag="li" class="edit" :to="params(user.id, 'full')">تعديل الاكونت <i
                                                    class="fa fa-user "></i></router-link>
                                            <router-link tag="li" class="edit" :to="params(user.id, 'pass')">تغير الباسورد <i
                                                    class="fa fa-key "></i></router-link>                    
                                            <li @click="menu='';status(user.status, user.id,i)">{{status(user.status)}} <i
                                                    class="fa fa-ban"></i></li>
                                            <li @click="menu='';remove({table:'users',id:user.id,i:saii(i,user.id)})">حذف
                                                الاكونت <i class="far fa-trash-alt"></i></li>
                                        </div>
                                    </div>
                                    <div class="userbox">
                                        <div class="imguser"><img :src="user.image"> </div>
                                        <div class="username"><span>{{user.nickname}}</span></div>
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

        computed: {
            ...mapState([
                'users',
                'search'
            ]),
            ...mapGetters([
                'margin_style',
                'API'
            ])
        },
        created() {
            
            this.API(`get.php?action=${this.$route.name}`, data => {
                if (data) {
                    this.modalContainer(false);
                    this.usersArr(data);
                }
            });
        },

        data() {
            return {
                menu: "",
                name: "",
                mail: "",
                SelectStatus: "Any"
            }
        },
        watch: {
            SelectStatus: function (values) {
                for (let i in this.users) {
                    if (values == "Suspension") {
                        if (this.users[i].status == values) {
                            this.users[i].hide = undefined;
                        } else {
                            this.users[i].hide = 1;
                        }
                    } else if (values == "Active") {
                        if (this.users[i].status == 'active') {
                            this.users[i].hide = undefined;
                        } else {
                            this.users[i].hide = 1;
                        }
                    } else {
                        this.users[i].hide = undefined;
                    }
                }
            },
            name: function () {
                this.mail = "";
                this.searchGo()

            },
            mail: function () {
                this.name = "";
                this.searchGo();
            }
        },
        methods: {
            status(val, id, i) {
                if (!id) {
                    return val == 'active' ? 'أيقاف الاكونت' : 'تنشيط الاكونت';

                }
                var action = {
                    status: val == 'active' ? 'Suspension' : 'active'
                }
                this.users[i].status = action.status
                var URL = `update.php?raw=users&id=${id}&row=id&action=${JSON.stringify(action)}`;

                this.API(URL, (data) => {
                    if (data) {
                        this.modalContainer(false);

                    }
                });


            },
            searchGo() {
                this.searchArr([]);
                this.users.forEach(element => {
                    var txt = this.name ? {
                        c: element.nickname,
                        m: this.name
                    } : {
                        c: element.email,
                        m: this.mail
                    };
                    if (txt.m.toUpperCase().indexOf(txt.c.toUpperCase()) > -1) {
                        this.searchPush(element);
                    }
                });
            },
            params(id, type) {
                return {
                    name: 'updates',
                    params: {
                        id: id,
                        name: 'users',
                        section: 'users',
                        type: type
                    }
                }
            },
            saii(i, id) {
                var s = this.search.length;
                s = s > 0 ? id : i;
                return s;
            },

            ...mapMutations([
                'modalContainer',
                'deleteAjax',
                'searchPush',
                'searchArr',
                'usersArr'

            ]),

            Arrusers() {
                var sp = this.name + this.mail;
                var s = this.search;
                return s.length > 0 && sp != false ? s : this.users;
            },

            remove(obj) {
                this.modalContainer("remove");
                this.deleteAjax(obj);

            },

        }
    }
</script>

<style>
.pageContent .dis{ 
    display: inline-block  
}
    .user .usermenu .ul {
        position: absolute;
        right: 8px;
        background: white;
        width: 190px;
        padding: 5px 5px;
        -webkit-animation: conditionalOpen 0.5s normal forwards ease-in-out;
        animation: conditionalOpen 0.5s normal forwards ease-in-out;
        z-index: 9999;
        box-shadow: 1px 1px 7px 1px #ddd;
    }

    .user .usermenu {
        position: relative
    }

  .user .ul li:hover {
        background: mediumorchid;
        color: white;
        box-shadow: 1px 1px 7px 1px #ddd;
}
.user li {
        list-style: none;
        margin: 5px 0px;
        padding: 3px 6px 1px 3px;
        font-family: 'Tajawal', sans-serif;
        
}
.user li i {
        list-style: none;
        margin-left: 5px;
         cursor:  pointer
}


    .user .username {
        overflow: hidden;
        width: 100px;
    }

    .pageContent .user {
        display: inline-block;
        background: #fff;
        width: 200px;
        padding-left: 5px;
        text-align: center;
        margin: 10px;
    }

    .pageContent .user img {
        width: 40px;
        height: 40px;
    }

    .pageContent .user .imguser {
        display: inline-block;
        vertical-align: middle
    }

    .pageContent .user .username {
        display: inline-block;
        padding-left: 5px;
        color: #3c8dbc;
        font-weight: 600;
        vertical-align: middle;
    }

    .pageContent .usermenu {
        text-align: right;
        padding-right: 10px;
        cursor: pointer;
    }

    .searchUsers {
        background: #fff;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 1px 1px 7px 1px #ddd;
        margin: 10px 0;
    }

    .searchUsers .usersContent div {
        display: inline-block;
        margin: 0 10px;
    }

    .searchUsers input {
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
    }

    .searchUsers .usersContent div span {
        display: block;
    }

    .searchUsers .usersContent .img {
        background: #71c43a;
        padding: 5px 10px;
        color: white;
        border-radius: 50%;
        font-size: 30px
    }

    .searchUsers .go input {
        background: #3c8dbc;
        color: white;
        margin: 10px 0
    }

    .pageContent {
        text-align: center;
        padding-bottom: 30px !important;
        background: white;
        box-shadow: 1px 1px 7px 1px #ddd;
        margin: 0
    }

    .pageContent .user {
        padding-bottom: 30px;
                    box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);

    }

    @media screen and (max-width: 450px) {
        .pageContent .user {
            width: 80%
        }
    }
</style>