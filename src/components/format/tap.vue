<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home foods-setup">
                        <div class="app-page">
                            <div class="taps">
                                <div class="tap_a">
                                    <a v-for="(a,i) in taps.tap" :key="i" :class="[tapSelect == a.id ? 'actived':'']"
                                        @click="tapSelect=a.name">{{a.txt}}</a>
                                </div>
                            </div>
                            <div class="tap-content">
                                <ol>
                                    <table>
                                        <tr>
                                            <td class="inpFoods"><input v-model="foodModel" type="text"></td>
                                            <td class="addFoods"><button @click="add()">Add</button></td>
                                        </tr>
                                        <tbody v-if="tapObj.length > 0">
                                            <th>Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <tr v-for="(tap,i) in tapObj" :key="i">
                                                <td>{{tap.name}}</td>
                                                <td @click="Edited(tap, i)">
                                                    <i class="fas fa-edit"></i>
                                                </td>
                                                <td @click="remove({table:taps.table,id:tap.id,i:i})" class="op">
                                                    <i class="fas fa-trash-alt"></i></td>
                                           </tr>
                                        </tbody>
                                    </table>
                                    <div class="head" v-if="!tapObj.length">
                                        <h3>Empty Data</h3>
                                    </div>
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

            this.API(`get.php?action=${this.taps.table}&row=${this.taps.section}`, (data) => {
                if (data) {
                    this.modalContainer(false);
                    this.dataTap(data);
                }
            });

        },
        data() {
            return {
                tapSelect: 0,
                foodModel: ""
            }
        },
        computed: {
            ...mapState([
                "tapObj",
                "Account"

            ]),
            ...mapGetters([
                'API'
            ])
        },
        props: ["taps"],
        updated: function () {},
        components: {},
        watch: {},
        mounted() {},
        methods: {
            ...mapMutations([
                'modalContainer',
                'deleteAjax',
                "changelastRequest",
                "dataTap",
                "dataTapPush"

            ]),
            Edited(val, i) {
                this.$prompt("New Value", val.name).then(value => {
                     this.add({value:value, id: val.id, i:i});
                });
            },
            add(update) {
                  if (!this.foodModel) { 
                      if(!update) return
                  }
                    const user = this.Account.nickname;
                    var action = !update ? {
                        name: this.foodModel,
                        id: this.randomID(),
                        section: this.taps.section,
                        user: user,
                    } : {
                        name: update.value,
                        user: user
                    };
                    var URL = !update ? "set" : "update";
                    URL += `.php?raw=${this.taps.table}&action=${JSON.stringify(action)}`;
                    URL += update ? `&id=${update.id}&row=id`:"";
                    this.API(URL, (data) => {
                        if (data) {
                            this.modalContainer("close");
                            if (update){
                                this.tapObj[update.i].name = update.value;
                                return;
                            }
                            this.dataTapPush(action);

                        } else {
                            this.changelastRequest([URL, false]);
                            this.modalContainer("error");
                        }
                    });
                    this.foodModel = "";
            },
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
            remove(obj) {
                this.modalContainer("remove");
                this.deleteAjax(obj);
            },
        }
    }
</script>
<style>
    .inpFoods {
        padding: 0 15px
    }

    /* {
        direction: rtl;
        text-align: right;
    } */

    .tap-content {}

    .taps {
        margin: 0 0px;
        background: #fff;
        text-align: right;
    }

    .tap_a {
        padding: 10px 0;
    }

    .tap_a a {
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 900;
        color: fuchsia;
        cursor: pointer;

    }

    .actived {
        border: 2px solid #fff;
        border-top: 3px solid fuchsia;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }

    h1 {}

    .tap-content ol {
        padding: 10px 30px;
    }

    .new_tap {
        padding: 2%
    }

    .new_tap .tap_name {
        border-top: 1px solid #ddd;
        margin: 20px 0;
        padding: 20px 0;

    }

    .new_tap .tap_name input {
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

    .tap_name label {
        font-weight: bold;
        margin: 0 5px;
        display: block
    }

    th {
        text-align: center;
        width: 25%;
        border: 1px solid #999;
        background: palegoldenrod;
        padding: 0 5px
    }

    table {
        direction: rtl;
        width: 100% !important;
        ;
        text-align: center !important;
    }

    table td {
        border: 1px solid #ddd;
        padding: 10px 0;
        background: oldlace;
        font-size: 18px;
        border-radius: 10px;
    }

    table .op {
        width: 2.5%;
        font-size: 15px;
        border-radius: 0px;
        background: white;
        padding: 0 15px;
        cursor: pointer;
        text-align: center
    }

    button {
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

    button:hover {
        background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
        background-color: #019ad2;
    }

    button:active {
        position: relative;
        top: 1px;
    }

    .tap_radio .input {
        width: 30px;
        height: 30px;
        background: #f5f5f5;
        display: inline-block;
        vertical-align: middle;
        margin: 0 10px;
        border-radius: 50%;
        border: 1px solid fuchsia
    }

    .tap_radio div {
        margin: 5px;
    }

    .tap_radio i {
        width: 10px;
        height: 10px;
        background: fuchsia;
        display: inline-block;
        vertical-align: middle;
        margin: 9px 9px;
        border-radius: 50%;
    }

    .tap_radio span {
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

        button {
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

        .taps {
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

    .app-page .app-page-content {
        border: 1px solid #ddd;
    }

    @media screen and (max-width: 600px) {}
</style>