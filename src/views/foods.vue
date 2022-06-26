<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="app-page all-foods">
                        <div class="head">
                            <h3>View/Search Meal's (<b>{{Arrmeals().length}}</b>)</h3>
                        </div>
                        <div class="searchUsers">
                            <div class="usersContent">
                                <div class="img"><i class="fas fa-search"></i></div>
                                <div class="inputdiv">
                                    <span class="des">الوجبة</span>
                                    <input v-model="name" type="text">
                                </div>
                                <div class="inputdiv">
                                    <span class="des">الكمية</span>
                                    <input v-model="quantity" type="text">
                                </div>
                                <div class="inputdiv">
                                    <span class="des">فلتر</span>
                                    <select v-model="option" name="status">
                                        <option value="All">All</option>
                                        <option v-for="(el,i) in options" :key="i" :value="el.name">{{el.name}}
                                        </option>
                                    </select>
                                </div>
                                <div class="go"><input type="button" value="Search"></div>
                            </div>
                        </div>
                        <div class="app-page-content">
                            <table class="fix-width">
                                <tbody>
                                    <th>الوجبة</th>
                                    <th>الكمية</th>
                                    <th>العنصر الغذائي</th>
                                    <th></th>
                                    <tr v-for="(item, ii) in Arrmeals()" :key="ii">
                                        <td style=" background: #ffffff">
                                            <b> {{item.name}}</b>
                                        </td>
                                        <td>
                                            {{item.quantity}}
                                        </td>
                                        <td>
                                            <li v-for="(el, i) in item.ingredient" :key="i">
                                        <td class="ingred" v-if="getarr(1,el,el.name)">{{getarr(1,el,el.name)}}</td>
                                        <td class="ingred q" v-if="getarr(1,el,el.name)">{{getarr(0,el,el.quantity)}}
                                        </td>
                                        </li>
                                        </td>
                                        <td><i @click="remove({table:'meal',id:item.id,i:saii(ii,item.id)})"
                                                class="far fa-trash-alt"></i></td>
                                    </tr>
                                </tbody>
                            </table>
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
        created() {
            this.API(`get.php?action=ingredient`, (data) => {
                if (data) {
                    this.modalContainer(false);
                    this.options = data;
                    // this.option = data[0].name
                }
            });
            this.API(`get.php?action=meal`, (data) => {
                if (data) {
                    this.modalContainer(false);
                    this.itemsMealArr(data);

                }
            });
        },
        data() {
            return {
                options: [],
                option: "All",
                name: "",
                quantity: "",

            }
        },
        computed: {
            ...mapState([
                'itemsMeal',
                'search'
            ]),
            ...mapGetters([
                'margin_style',
                'API'
            ])
        },
        props: [],
        updated: function () {},
        components: {},
        watch: {
            name: function () {
                this.quantity = "";
                this.searchGo()

            },
            quantity: function () {
                this.name = "";
                this.searchGo()
            }
        },
        methods: {
            ...mapMutations([
                'modalContainer',
                'deleteAjax',
                'itemsMealArr',
                'searchPush',
                'searchArr'

            ]),
            params(id) {
                return {
                    name: 'updates',
                    params: {
                        id: id,
                        name: this.$route.name
                    }
                }
            },
            saii(i,id){
                var sp = this.name+this.quantity;
                var s = this.search.length;
                s = s > 0 && !sp ? id : i;
                return s;
            },

            Arrmeals() {
                var s = this.search;
                return s.length > 0 ? s : this.itemsMeal;
            },
            searchGo() {
                this.searchArr([]);
                this.itemsMeal.forEach(element => {
                    var txt = this.name ? {
                        c: element.name,
                        m: this.name
                    } : {
                        c: element.quantity,
                        m: this.quantity
                    };
                    if (txt.m.toUpperCase().indexOf(txt.c.toUpperCase()) > -1) {
                        this.searchPush(element);
                    }
                });
            },
            getarr(e, obj, el) {
                const a = 'All';
                if (this.option == a) {
                    return el;
                } else if (obj.name == this.option && e) {
                    return obj.name;
                } else if (obj.name == this.option && !e) {
                    return obj.quantity;
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
    .all-foods .ingred {
        background: mintcream;
        border-radius: 5px;
        margin: 0;
        padding: 5px;
        border: 1px solid #ccc
    }

    .all-foods .ingred.q {
        background: white;
        border-radius: 25px;
        margin: 0;
        padding: 5px;
        border: 1px solid #ccc;
        font-size: 11px
    }

    .fa-trash-alt {
        cursor: pointer;
    }

    .all-foods table li {
        direction: rtl;
        text-align: right;
        padding: 0 10px;
        display: inline-block;
    }

    .all-foods {
        direction: rtl;
        text-align: right
    }

    .all-foods table tr {
        background: #ffffff none repeat scroll 0 0 !important;
        border-bottom: 1px solid #ddd !important;
        border-bottom-width: 1px;
    }

    .all-foods table tr th:first-child {
        text-align: right;
    }

    .all-foods table th {
        border-bottom-width: 8px !important;
        padding: 10px;
    }

    .all-foods th {
        background: #ffffff none repeat scroll 0 0 !important;
    }

    .all-foods table {
        border-collapse: collapse;
        margin: 0 auto;
        border: 1px solid #ccc !important;
        width: 100%
    }

    .all-foods table td {

        padding: 10px;
        border-left: 1px solid #ccc !important;
        text-align: center;
        background: #f5f5f5
    }

    .app-page .app-page-content {
        border: 1px solid #ddd;
    }

    .pageContent .user .time:after {
        content: ": أخر ظهور "

    }

    .def_home .onpage {
        text-align: left;
        padding: 0 10px;

    }
    .searchUsers {
        background: #fff;
        padding: 10px;
        border: 1px solid #ddd!important;;
    }
    .searchUsers input {
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
        color: white
    }
        @media screen and (max-width: 600px) {


        }
</style>