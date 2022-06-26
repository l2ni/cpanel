<template>
    <div v-if="modal_Container" id="modal_Container">
        <div class="model_content">

            <!--error-->
            <div v-if="checkModel('error')">
                <h3>Error </h3>
                <a style="color:blue" @click="TRYAGAINREQUEST()" class="last">Try again</a>
            </div>

            <!--loader-->
            <div v-if="checkModel('loaders')" class="loaders"></div>

            <!--delete-->
            <div v-if="checkModel('remove')">
                <h3>هل تريد الحذف نهائياً؟</h3>
            </div>

            <div class="op">
                <b v-if="checkModel(['remove','error'])" @click="closeModel()">الغاء</b>
                <b v-if="checkModel('remove')" @click="Setmodel()">مسح</b>
            </div>
            <!--end-->
        </div>
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
        name: "AlertApp",
        data() {
            return {

            }
        },
        computed: {
            ...mapState([
                'settings',
                'modal_Container',
                'lastRequest',
                'ajax',
                'validata'
            ]),
            ...mapGetters([
                'API',
                'remove'
            ])
        },
        watch: {
            'modal_Container': function (val) {
                if (/error|loaders|remove|false/.test(val)) {
                    return;
                }
                val = val == "close" ? false : val;
                this.done(val);
                this.modalContainer(false);
            },
            'validata': function (e) {
                this.ValiDateMsg(e);
            }
        },
        components: {},
        methods: {
            ...mapMutations([
                'changelastRequest',
                'modalContainer',
                'deleteAjax'
            ]),

            done(val) {
                this.$fire({
                    toast: true,
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    title: "تم بنجاح",
                    type: "success",
                }).then(r => {
                    console.log(r.value);
                    if (val) {
                        location.href = '../' + val;
                    }
                });
            },
            ValiDateMsg(html) {
                this.$fire({
                    title: 'Validata',
                    html: `<div class="validataContent">${html}</div>`,
                    type: 'error',
                    timer: 300000
                });
            },
            TRYAGAINREQUEST() {
                var URL = this.lastRequest;
                this.API(URL[0], (data) => {
                    if (data) {
                        this.modalContainer(URL[1]);
                    } else {
                        this.modalContainer('error');
                    }
                });
            },
            Setmodel() {
                var ajax = this.ajax;
                this.modalContainer('loaders');
                this.API(`remove.php?table=${ajax.table}&id=${ajax.id}`, data => {
                    this.oki(data, ajax);
                });
            },
            checkModel(value) {
                var model = this.modal_Container;
                switch (typeof value) {
                    case "string":
                        if (model == value) {
                            return true;
                        }
                        break;
                    case "object":
                        for (let i of value) {
                            if (i == model) return true;
                        }
                }
                return false
            },
            closeModel() {
                this.modalContainer(false);
                this.deleteAjax({});
            },
            oki(response, ajax) {
                if (response) {
                    this.remove(ajax.table, ajax.i);
                    this.closeModel();
                } else {
                    this.modalContainer('error');
                }
            },
        },
    }
</script>

<style>
    .validataContent {
        margin: 0;
        text-align: left
    }

    .vali-data i {
        margin: 0 6px
    }

    .validataContent div {
        border: 2px solid #ddd;
        padding: 14px;
        margin: 6px 0
    }
</style>