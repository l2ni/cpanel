<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home add-foods">
                        <div class="app-page">
                            <div class="head">
                                <h3>Add Meal</h3>
                            </div>
                            <div class="taps">
                                <div class="tap_a">
                                    <div class="select">
                                        <label style="margin:0 5px;" for="">الواجبات</label>
                                        <select value="Select A Meal" v-model="option">
                                            <option v-for="(op,i) in options" :key="i">{{op.name}}</option>
                                        </select>
                                    </div>

                                    <div class="itemsetmeal" v-for="(item,index) in items" :key="index">
                                        <div class="remove">
                                            <i @click="items.splice(index, 1)" class="far fa-minus-square">
                                                <span>إزالة</span></i>
                                        </div>

                                        <table class="fix-width">
                                            <tbody>
                                                <td class="names">
                                                    <li>اسم الوجبة</li>
                                                    <li>الكمية</li>
                                                </td>
                                                <td class="names">
                                                    <li>
                                                        <input placeholder="بيضة, مشروب إناناس"
                                                            v-model="item.name.model" type="text">
                                                    </li>
                                                    <li>
                                                        <input placeholder="كوب, نصف كوب" v-model="item.name.quantity"
                                                            type="text">
                                                    </li>
                                                </td>
                                                <tr>
                                                    <th>المغذيات</th>
                                                    <th>الكمية</th>
                                                </tr>
                                                <tr v-for="(el, i) in item.ingredient" :key="i">
                                                    <td>
                                                        {{el.name}}
                                                    </td>
                                                    <td class="na">
                                                        <input v-model="el.quantity" type="text">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div @click="add()" class="plusinp">
                                    <i class="far fa-plus-square"></i>
                                    <span>New</span>
                                </div>
                                <div v-if="items.length > 0" class="foodbtn"><button @click="save()">Add</button></div>
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
                    this.options = data;
                    this.option = data[0].name;
                }
            });
        },
        data() {
            return {
                items: [],
                options: [],
                option: "",
            }
        },
        computed: {
            ...mapState([

            ]),
            ...mapGetters([
                'margin_style',
                'API',
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
                'valid'

            ]),

            validate(valid) {
                return valid == false ? true : false;
            },
            ValiDateMsg(type, title, text, actions) {
                this.$fire({
                    title: title,
                    text: text,
                    type: type,
                    timer: 30000
                }).then(r => {
                    if (r.value || r.value == undefined) {
                        if (actions) {
                            this.modalContainer(actions);

                        }

                    }
                });
            },
            save() {
                var err = false;
                if (!this.option) return;
                for (const key in this.items) {
                    if (!this.items[key].name.model) {
                        err = '<div class="vali-data"><i class="fas fa-star-half-alt"></i>Enter The Name of Meal</div>';
                    }
                    if (!this.items[key].name.quantity) {
                        err += '<div class="vali-data"><i class="fas fa-star-half-alt"></i>Enter The Quantify of Meal</div>';
                    }
                    if (err) {
                        this.valid(err);
                        return;
                    }
                    var action = {
                        name: this.items[key].name.model,
                        ingredient: this.items[key].ingredient,
                        quantity: this.items[key].name.quantity,
                        foods: this.option
                    };
                    var URL = `set.php?raw=meal&action=${JSON.stringify(action)}`;
                    this.API(URL, (data) => {
                        if (data) {
                            this.modalContainer(false);
                        } else {
                            this.changelastRequest([URL, false]);
                            this.modalContainer("error");
                            return;
                        }
                    });
                }
                this.$fire({
                    title: 'Validata',
                    html: `Save ${this.items.length} Meal`,
                    type: 'success',
                    timer: 5000
                });
                var that = this;
                setTimeout(function () {
                    that.modalContainer("foods");
                }, 7000);
            },
            add() {
                this.API(`get.php?action=ingredient`, (data) => {
                    if (data) {
                        this.modalContainer(false);
                        var item = {
                            name: {
                                name: 'Name',
                                id: 0,
                                model: "",
                                quantity: ""
                            },
                            ingredient: data
                        };
                        this.items.push(item);
                    }
                });
            }
        }
    }
</script>
<style>
    .select label {
        font-weight: 900;
        font-size: 18px
    }

    .add-foods table li {
        margin: 5px 0 !important;
        padding: 5px 0 !important;
    }

    .add-foods table .names input {}

    .add-foods table .names th {
        display: inline-block;
        background: none !important;
    }

    .add-foods table .names {
        background: whitesmoke;
        border-bottom: 3px solid #ddd
    }

    .itemsetmeal {

        border-bottom: 0px solid #ddd;
        padding: 10px 0;
        background: #ffffff;
    }

    .add-foods .select {
        margin-bottom: 20px auto;
        text-align: center;

        padding: 10px 0;
    }

    .add-foods .select label {
        font-family: 'Readex Pro', sans-serif;
        background: med#iumpurple;
        color: black;
        padding: 5px;
        border: 1px solid #ddd;
        vertical-align: top;
        box-shadow: 0px 1px 1px 0px #ddd;
        margin: -1px 0 !important;
        ;
    }

    .add-foods select {
        background: #f5f5f5;
        border: 1px solid #ddd;
        color: #000 !important;
        font-family: 'Tajawal', sans-serif;
        font-weight: 900;
    }

    .add-foods table tr {
        background: #ffffff none repeat scroll 0 0 !important;
        border-bottom: 1px solid #ddd !important;
        border-bottom-width: 1px;
    }

    .add-foods table tr th:first-child {
        text-align: center;
    }

    .add-foods table th {
        border-bottom-width: 8px !important;
        padding: 10px;
        font-weight: 900
    }

    .add-foods th {
        background: #ffffff none repeat scroll 0 0 !important;

        font-family: 'Tajawal', sans-serif;
        font-weight: 900;
        text-align: center;
        font-size: 18px
    }

    .add-foods table {
        border-collapse: collapse;
        margin: 0 auto;
        border: 1px solid #ccc !important;
        width: 100%
    }

    .itemsetmeal {
        margin: 20px 0;
    }

    .itemsetmeal input {
        padding: 0 5px;
        width: 100%
    }

    .add-foods table td {
        font-family: 'Cairo', sans-serif;
        padding: 10px;
        border-left: 1px solid #ccc !important;
        text-align: center;
        font-size: 14px !important;
    }

    .remove span {
        color: magenta;
        margin: 0 10px;
    }

    .add-foods .tap_a {
        border: 0px solid #ddd;
        padding: 5px;
        margin-bottom: 20px;
    }

    .remove i {
        color: magenta;
    }

    .remove {
        cursor: pointer;
        font-size: 12px;
        padding: 12px;
        border: 2px solid #ddd;
    }

    .plusinp i {
        margin: 0 10px
    }

    .plusinp {
        font-size: 15px;
        margin: 0 auto;
        text-align: center;
        color: mediumorchid;
        cursor: pointer;
        background: #f5f5f5;
        display: block;
        text-align: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ddd;
        opacity: 0.7;
    }

    .plusinp span {
        margin: -3px 0 !important;
    }

    .plusinp i {
        margin: 0 3px !important;
        padding: 0 !important;
    }

    .plusinp:hover {
        opacity: 1
    }

    .foodbtn {
        margin: 36px auto;
        text-align: center;
        padding: 10px 0;
    }

    .setfoodinp {
        margin: 16px;
    }

    .setfoodinp input {
        background: #f5f5f5
    }

    .add-foods button {
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
        padding: 6px 74px;
        text-decoration: none;
        text-shadow: 0px -1px 0px #5b6178;
        width: auto;
    }

    .add-foods button:hover {
        background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
        background-color: #019ad2;
    }

    .add-foods button:active {
        position: relative;
        top: 1px;
    }

    .add-foods {
        direction: rtl;
        text-align: right
    }

    .add-foods .tap-content {
        border: 1px solid #ddd;
    }

    .add-foods .taps {
        /*! margin: 0 20px; */
        background: mintcream;
        border: 1px solid #ddd;

        padding-bottom: 10px;
    }

    .add-foods .tap_a {}

    .add-foods .tap_a select {
        padding: 5px 20px;
        font-size: 20px;
        font-weight: 900;
        color: fuchsia;
        width: 50%
    }

    @media screen and (max-width: 600px) {
        .add-foods table .names input {
            width: 100%;
        }

        .add-foods table .names th {}
    }
</style>