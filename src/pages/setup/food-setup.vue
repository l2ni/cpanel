<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home foods-setup">
                        <div class="app-page">
                            <div class="head">
                                <h3>Setup Foods</h3>
                            </div>
                            <div class="taps">
                                <div class="tap_a">
                                    <a v-for="(a,i) in tap_a" :key="i" :class="[tapSelect == a.name ? 'actived':'']"
                                        @click="tapSelect=a.name">{{a.txt}}</a>
                                </div>
                            </div>
                            <div class="tap-content">
                                <ol>
                                    <table>
                                        <tbody>
                                            <th>Name</th>
                                            <th></th>
                                            <tr>
                                                <td class="inpFoods"><input v-model="foodModel" type="text"></td>
                                                <td class="addFoods"><button @click="add()">Add</button></td>
                                            </tr>
                                            <tr v-for="(tap,i) in gettap().obj" :key="i">
                                                <td>{{tap.name}}</td>
                                                <td @click="remove({table:gettap().table,id:tap.id,i:i})" class="op">
                                                    <i class="fas fa-trash-alt"></i></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ol>
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

        created() {
            this.API(`get.php?action=foods`, (data) => {
                if (data) {
                    this.modalContainer(false);
                    this.foodArr(data);
                }
            });
        },

        data() {
            return {
                foodModel: "",
                tapSelect: "foods",
                vaildata: false,
                tap_a: [{
                        name: 'foods',
                        txt: 'الواجبات',
                        status: 1
                    },
                    {
                        name: 'ingredient',
                        txt: 'العناصر الغذائية',
                        status: 1

                    },
                ],
            }
        },
        computed: {
            ...mapState([
                'foodsArr',
                'ingredient'
            ]),
            ...mapGetters([
                'margin_style',
                'API'
            ])
        },
        components: {},

        watch: {
            tapSelect: function (val) {
                if (val == 'ingredient') {
                    this.API(`get.php?action=ingredient`, (data) => {
                        if (data) {
                            this.modalContainer(false);
                            this.ingredientArr(data);
                        }
                    });
                }
            }
        },

        methods: {
            ...mapMutations([
                'modalContainer',
                'foodArr',
                'foodArrPush',
                'deleteAjax',
                'ingredientArr',
                'ingredientPush',
                'changelastRequest'
            ]),

            randomID() {
                var generatePassword = (
                        length = 20,
                        wishlist = "0123456789"
                    ) => Array(length)
                    .fill('')
                    .map(() => wishlist[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) *
                        wishlist.length)])
                    .join('');

                return generatePassword();
            },
            add() {
                if (this.foodModel) {
                    var action = {
                        name: this.foodModel,
                        id: this.randomID()
                    };
                    var URL = `set.php?raw=${this.gettap().table}&action=${JSON.stringify(action)}`;
                    this.API(URL, (data) => {
                        if (data) {
                            this.modalContainer("close");
                            if (this.tapSelect == 'foods') {
                                this.foodArrPush(action);
                            } else {
                                this.ingredientPush(action);
                            }
                        } else {
                            this.changelastRequest([URL, false]);
                            this.modalContainer("error");
                        }
                    });
                    this.foodModel = "";
                }
            },
            remove(obj) {
                this.modalContainer("remove");
                this.deleteAjax(obj);
            },

            gettap(e) {
                e = this.tapSelect == 'foods' ? {
                    obj: this.foodsArr,
                    table: 'foods'
                } : {
                    obj: this.ingredient,
                    table: 'ingredient'
                }
                return e;
            },
        }
    }
</script>
<style>
    .foods-setup .inpFoods {
        padding: 0 15px
    }

    .foods-setup {
        direction: rtl;
        text-align: right;
    }

    .foods-setup h3 {
        color: black;
        text-align: center;
        border: 1px solid #ccc;
        margin: 0 0px;
        background: white;
        padding: 5px 0;
    }

    .foods-setup .tap-content {}

    .foods-setup .taps {
        margin: 0 0px;
        background: #fff;
    }

    .foods-setup .tap_a {
        padding: 10px 0;
    }

    .foods-setup .tap_a a {
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 900;
        color: fuchsia;
        cursor: pointer;

    }

    .foods-setup .actived {
        border: 2px solid #fff;
        border-top: 3px solid fuchsia;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }

    .foods-setup h1 {}

    .foods-setup .tap-content ol {
        padding: 10px 30px;
    }

    .foods-setup .new_tap {
        padding: 2%
    }

    .foods-setup .new_tap .tap_name {
        border-top: 1px solid #ddd;
        margin: 20px 0;
        padding: 20px 0;

    }

    .foods-setup .new_tap .tap_name input {
        width: 50%;
        margin: 8px 0;
        box-sizing: border-box;
        padding: 5px;
        font-size: 16px;
        border-width: 1px;
        border-color: #CCCCCC;
        background-color: #FFFFFF;
        color: #000000;
        border-style: solid;
        border-radius: 0px;
        box-shadow: 0px 0px 5px rgba(66, 66, 66, .75);
        text-shadow: 0px 0px 5px rgba(66, 66, 66, .75);
    }

    .foods-setup .tap_name label {
        font-weight: bold;
        margin: 0 5px;
        display: block
    }

    .foods-setup th {
        text-align: center;
        width: 25%;
        border: 1px solid #999;
        background: palegoldenrod;
        padding: 0 5px
    }

    .foods-setup table {
        direction: rtl;
        width: 100% !important;
        ;
        text-align: center !important;
    }

    .foods-setup table td {
        border: 1px solid #ddd;
        padding: 10px 0;
        background: oldlace;
        font-size: 18px;
        border-radius: 10px;
    }

    .foods-setup table .op {
        width: 2.5%;
        font-size: 15px;
        border-radius: 0px;
        background: white;
        padding: 0 15px;
        cursor: pointer;
        text-align: center
    }

    .foods-setup button {
        box-shadow: 0px 1px 0px 0px #f0f7fa;
        background: linear-gradient(to bottom, #33bdef 5%, #019ad2 100%);
        background-color: #33bdef;
        border-radius: 6px;
        border: 1px solid #057fd0;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 24px;
        text-decoration: none;
        text-shadow: 0px -1px 0px #5b6178;
        width: auto
    }

    .foods-setup button:hover {
        background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
        background-color: #019ad2;
    }

    .foods-setup button:active {
        position: relative;
        top: 1px;
    }

    .foods-setup .tap_radio .input {
        width: 30px;
        height: 30px;
        background: #f5f5f5;
        display: inline-block;
        vertical-align: middle;
        margin: 0 10px;
        border-radius: 50%;
        border: 1px solid fuchsia
    }

    .foods-setup .tap_radio div {
        margin: 5px;
    }

    .foods-setup .tap_radio i {
        width: 10px;
        height: 10px;
        background: fuchsia;
        display: inline-block;
        vertical-align: middle;
        margin: 9px 9px;
        border-radius: 50%;
    }

    .foods-setup .tap_radio span {
        font-size: 20px;
        vertical-align: middle;
        font-weight: 900
    }

    .app-page .tap-content ol {
        text-align: center;
        margin: auto auto;
        margin: 0 0px;
        padding: 0px;
        width: 100% !important;
    }

    @media screen and (max-width: 600px) {
        .foods-setup .app-page {
            margin: 0 0px;
            padding: 0px;
        }

        .foods-setup button {
            width: auto;
        }

        .add-foods .taps {
            margin: 0 5px !important;
            ;
            background: mintcream;
            padding: 0px;
        }

        .app-page .tap-content ol {
            text-align: center;
            margin: auto auto;
            margin: 0 0px;
            padding: 0px;
            width: 100% !important;
        }

        .foods-setup .taps {
            margin: 0 0px;
            background: #fff;
        }

        .app-page table td {
            width: auto;
        }

        .app-page table input {
            width: 100%;
            padding: 0;
            margin: 0;
        }
    }
</style>