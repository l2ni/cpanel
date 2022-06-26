<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home home-page">
                        <div class="app-page">
                            <div class="head">
                                <h3>General Config</h3>
                            </div>
                            <div class="blog">
                                <div class="card card-info">
                                    <div class="card-body">
                                        <form class="form-horizontal">
                                            <div class="card-body">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text fname">domain name</b>
                                                    </div>
                                                    <input class="form-control" type="text" id="fname" name="domain"
                                                        v-model="domain">
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text lname">title</b>
                                                    </div>
                                                    <input type="text" class="form-control" id="lname" name="title"
                                                        v-model="title">
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text lname">descripion</b>
                                                    </div>
                                                    <input type="text" class="form-control" id="lname" name="descripion"
                                                        v-model="descripion">
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text subject">keyword</b>
                                                    </div>
                                                    <input type="text" class="form-control" id="lname" name="keyword"
                                                        v-model="keyword">
                                                </div>
                                                <div class="input-group mb-3 mb3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text subject"><i
                                                                class="fas fa-camera-retro"></i></b>
                                                    </div>
                                                    <label class="form-control" for="userfile"> <span
                                                            class="btn-up">تحميل صورة</span> </label>
                                                    <input name="userfile" @change="uploadImage()" style="display:none"
                                                        ref="logoFile" type="file" id="userfile">
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <b class="input-group-text subject">logos</b>
                                                    </div>
                                                    <input type="text" class="form-control" v-model="logos" id="lname"
                                                        name="logos" disabled>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="saveDate()" class="btns">
                <input value="Save" type="button" class="btnn">
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
                'settings',
                'DefaultLogo'
            ]),
            ...mapGetters([
                'API',
                'UPLOADFILE',
                'include'
            ])
        },
        created() {
            this.API('get.php?action=home', data => {
                if (data) {
                    data = data[0];
                    this.modalContainer(false);
                    this.domain = data.domain;
                    this.title = data.title;
                    this.descripion = data.descripion;
                    this.keyword = data.keyword;
                    this.logos = data.logos;
                }
            });
        },
        data() {
            return {
                domain: '',
                title: '',
                descripion: '',
                keyword: '',
                logos:"rq"
            }
        },
        methods: {
            ...mapMutations([
                'modalContainer',
                'changelastRequest'
            ]),
            saveDate() {
                let action = {
                    domain: this.domain,
                    title: this.title,
                    descripion: this.descripion,
                    keyword: this.keyword,
                    logos: this.logos
                }
                let URL = `update.php?raw=home&id=1&row=id&action=`;
                URL += JSON.stringify(action);
                this.API(URL, (data) => {
                    if (data) {
                        this.modalContainer(false);
                    }  else {
                        this.changelastRequest([URL, false]);
                        this.modalContainer("error");
                    }
                })
            },
            uploadImage() {
                this.UPLOADFILE([300, 300], (data) => {
                    if (data.status) {
                        this.logos = this.include("", data.url);
                        this.settings.public.logos = this.logos;
                    }
                });
            },
        }
    }
</script>
<style>
    .btn-up {
        background: #e9ecef !important;
        border: none;
        padding: 0 7px;
        color: black;
        border: #999 solid 1px;
    }

    .card {
        margin: 0 0px;
        background: #f5f5f5;
        padding: 20px;
    }

    .card .card-content {
        border: 1px solid #ddd;
    }

    .card .title span {
        font-size: 15px !important;
        text-align: left
    }

    .btnn {
        background: #0085ba;
        color: white;
        border: none;
        font-family: 'Almarai', sans-serif !important;
        margin: 0;
        padding: 5px 10px;
        width: 40%;
    }

    .btns {
        margin: 19px auto;
        text-align: center;

    }

    .card .title {
        background: #fff;
        padding: 8px;
        margin: 40px 0 0px 0;
        border: 1px solid #ddd;


    }

    .card .timeline-body {
        padding: 20px;
        text-align: center
    }

    .card .timeline-body.d {
        padding: 15px;
        background: #f6f6f6
    }

    .card .timeline-body img {
        padding: 20px;
        text-align: center
    }

    .card span {
        color: black;
        font-family: 'Almarai', sans-serif !important;
        font-weight: 900;
        margin: 0 10px;
        text-align: center;
    }

    .card .item-btn {
        padding: 10px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        text-align: left;
    }

    .card .btn-i {
        background: #0085ba;
        color: white;
        border: none;
        font-family: 'Almarai', sans-serif !important;
        margin: 0;
        padding: 5px 10px;
    }

    .item-btn {
        margin: 0 auto;
        text-align: center
    }

    .btn-success {
        width: 50%;
        background: #0085ba;
        color: white;
        border: none;
        display: inline-block;
        text-align: center;
        margin: 3px auto;

    }

    .card .img img {
        width: 80px;
        height: 80px;
        margin: 5px;
        padding: 5px;
        border: 1.5px solid #ddd;
    }

    .card .img {
        display: inline-block;
        border: 2px solid #ddd;
        margin: 5px;
        position: relative;
        padding-top: 15px
    }

    .timeline-body {
        border: 1px solid #ddd;

    }

    .card .img i {
        top: 0;
        left: 0px;
        position: absolute;
        background: mediumorchid;
        color: white;
        padding: 3px;
        font-size: 11px;
        display: block;
        width: 100%;
        text-align: left
    }

    .img.video {
        width: 150px;
        padding-bottom: 10px;
        vertical-align: top
    }

    .img.video b {
        color: mediumblue;
        padding: 0 10px;
        font-size: 14px
    }

    .yt input {
        margin-bottom: 30px;

    }

    .img.video img {
        width: 130px;
        height: 130px
    }

    @media screen and (max-width: 600px) {
        .card {
            padding: 0;
            margin: 0;
        }
    }

    /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {

        .col-25,
        .col-75,
        input[type=submit] {
            width: 100%;
            margin-top: 0;
        }

        .setlogo label {
            width: 50% !important;
            display: inline-block !important;
        }

        .setlogo #lname {
            width: 40% !important;
            display: inline-block
        }
    }

    .setlogo input {
        display: inline-block;
    }

    .setlogo * {
        border: 0 !important;
        ;
        border-radius: 0 !important;
        outline: none
    }

    .setlogo label {
        display: inline-block;
        background: #fff;
        padding: 10px 12px 7px 6px
    }

    .setlogo i {
        margin: 0 10px;
        font-size: 25px;
        vertical-align: middle
    }

    .setlogo span {
        vertical-align: middle
    }

    @media screen and (max-width: 600px) {


        .home-page .card-body {
            padding: 10px 5px !important;
        }
    }
</style>