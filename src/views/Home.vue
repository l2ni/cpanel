<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="dashboard">
                                <div :style="'background:#FEA47F'" v-for="(box,i) in flex" :key="i" class="bg-aqua">
                                    <div class="inner">
                                        <router-link tag="p" :to="{path: box.to}">{{box.name}}
                                        </router-link>
                                    </div>
                                    <div class="boximg">
                                        <i :class="box.i"></i>
                                    </div>
                                    <router-link class="small-box-footer" v-if="box.add" tag="a"
                                        :to="{path: '/'+box.to+'/add'}">{{box.add}}
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
    import json from '@/json/menu.json';

    export default {

        name: "dachBoard",
        created() {},


        methods: {

        },

        data() {
            return {

                flex: json
            }
        },

    }
</script>
<style>
    .bg-aqua {
        margin: 5px;
        display: inline-block;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 20px;
        color: white;
        width: 230px;
        font-family: 'Oswald', sans-serif;
        background: mediumorchid !important;
        border-radius: 10px;
        box-shadow: 1px 0 5px 0 #000
    }

    .bg-aqua:last-child {
        padding-bottom: 0px;
    }

    .app-page {
        text-align: center
    }

    .bg-aqua i {
        font-size: 40px;
        margin-bottom: 15px;

    }

    .bg-aqua p {
        font-size: 25px;
        color:rgb(187, 255, 0);
        cursor: pointer;
       border-bottom: #ddd solid 1px;;
       padding: 5px;

    }

    .bg-aqua .small-box-footer {
        font-size: 15px;
        padding: 5px 20px;
        background: white;
        font-family: 'Oswald', sans-serif;
        border-radius: 20px
    }

    @media screen and (max-width: 600px) {
        .bg-aqua {
            width: 90%;
        }

        .app-page {
            margin-top: 20px
        }

    }
</style>