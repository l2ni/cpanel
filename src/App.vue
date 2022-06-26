<template>
    <div id="app" class="noselect">

        <body class="hold-transition sidebar-mini layout-fixed">
            <TopHeader />
            <AlertApp />
            <leftMenu />
            <router-view />


        </body>
    </div>
</template>
<script>
    import AlertApp from '@/components/AlertApp.vue';
    import TopHeader from '@/components/TopHeader.vue';
    import leftMenu from '@/components/leftMenu.vue';
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
        components: {
            AlertApp,
            TopHeader,
            leftMenu
        },
        computed: {
            ...mapState([
                'settings',
                'Account'

            ]),
            ...mapGetters([
                'API',
                'UPLOADFILE'
            ])
        },
        created() { // ${state.setting.public.domain}
            var self = this;
            ['home', 'AccountAccess'].forEach(function (val, i) {
                self.API(`get.php?action=${val}`, data => {
                    if (data) {
                        self.modalContainer(false);
                        if (!i) {
                            self.settings.public = data[0];
                        } else {
                            self.AccountArr(data[0]);
                        }
                    }
                });
            });
        },
        methods: {
            ...mapMutations([
                'modalContainer',
                'AccountArr'
            ]),
        },

        data() {
            return {}
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Recursive&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@1,700&family=Orelega+One&family=Oswald&family=PT+Sans+Narrow&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@800&family=Baloo+Bhaijaan+2&family=Cairo&family=Changa&family=Harmattan:wght@700&family=IBM+Plex+Sans+Arabic:wght@500&family=Mada&family=Readex+Pro&family=Tajawal&display=swap');

    li {
        list-style: none
    }

    .from {
        direction: rtl;
    }

    .from select {
        width: 200px;
        height: 30px;
    }

    .from label {
        width: 100px;
        margin: 0 20px;
        display: inline-block;
        vertical-align: middle
    }

    .from input {
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
        box-shadow: 0px 0px 1px rgba(66, 66, 66, .75);
        text-shadow: 0px 0px 5px rgba(66, 66, 66, .75);
    }

    .from button {
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
        width: 20%;
        margin: 10px auto;
    }

    .from button:hover {
        background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
        background-color: #019ad2;
    }

    .from button:active {
        position: relative;
        top: 1px;
    }

    .input {
        display: inline-block;
        vertical-align: middle;
    }

    .input small {
        color: red;
        font-weight: 900;
        display: block;
    }

    .input small {
        margin: 0 5px;
        color: red;
        font-weight: 900
    }

    .title-page {
        background: palegoldenrod !important;
    }

    .app-page .from .div {
        padding: 20px;
        background: white;
        margin: 4px 0;
    }

    .title-page span {
        font-size: 25px;
        font-weight: 900
    }

    .app-page {
        background: #f5f5f5;
    }

    .menu ul {
        margin: 0;
        padding: 0
    }

    .menu li {
        padding: 7px 0 2px 0;
    }

    .menu li .div_i {
        margin: 0 13px
    }

    .menu li .div_i i {
        font-size: 20px;
        color: #92b8c9;
        width: 30px;
        text-align: center
    }
.model_content a span{
    font-size: 25px;
    margin:0 10px;
    vertical-align: middle;
    color: navy
    
}
    .menu li .div_span {
        color: #92b8c9;
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.5;
    }

    .menu li .div_fas {
        float: right;
        color: #92b8c9;
        margin: 0 10px
    }

    .menu li .div_span span {
        vertical-align: middle
    }

    .menu li div {
        display: inline-block;
        vertical-align: middle
    }

    .menu ul ul {
        text-align: left;
        padding: 0px 0;
        transition: disply .3s ease-in-out;
        -webkit-animation: conditionalOpen 0.3s normal forwards ease-in-out;
        animation: conditionalOpen 0.3s normal forwards ease-in-out;
        transform-origin: 0% 0%;
        background: #2c3b41
    }

    .menu .li_menu {
        margin: 0 10px;
        direction: ltr;
    }

    .menu .li_menu a {
        color: paleturquoise
    }

    .menu li {
        list-style: none;
        cursor: pointer
    }

    .menu .li_menu i {
        margin: 0 15px;
    }

    .model_content b {
        margin: 0 5px;
        padding: 4px 10px;
        border: 1px solid #bbb;
        cursor: pointer
    }

    .model_content h3 {
        border-bottom: 1px solid #999;
        padding: 5px 0;
    }

    .model_content {
        position: relative;
    }

    .model_content .op {
        position: absolute;
        bottom: 15px;
        left: 10px
    }

    .model_content b:first-child {
        background: #f5f6f7
    }

    .model_content b:last-child {
        background: #6ca5d4;
        color: white;
    }

    .model_content a {
        color: blue;
        display: block;
        margin: 10px 0;
        text-decoration: underline;
        cursor: pointer;
        font-family: 'Changa', sans-serif;
        margin: 0 !important;
        ;
        width: 100% !important;
        padding: 9 !important;

    }

    .model_content .fa-check {
        font-size: 40px !important;
        text-align: center;
        display: block;
        padding: 23px 10px;
        border-radius: 50%;
        color: magenta;
    }

    .model_content .checkA a {
        -webkit-text-decoration-line: none;
        text-decoration-line: none;
        color: black;
        margin: 0 !important;
        ;
        width: 100% !important;
        ;
        display: block;
    }

    .model_content .check {
        border-radius: 50%;
        width: 100% !important;
        ;
    }

    .model_content {
        display: inline-block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        height: auto;
        width: auto;
        padding: 50px 75px;
        border-radius: 5px;
        transition: padding-top .5s ease-in-out, padding-left .5s ease-in-out;
    }

    .loaders {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite;
        /* Safari */
        animation: spin 2s linear infinite;
        margin: 0 auto;
        transition: width .5s ease-in-out, height .5s ease-in-out;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    #modal_Container {
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 10000;
    }

    .def_home {
        text-align: left;
        display: block;
        padding: 0px 0;
        transition: margin-left .5s ease-in-out, width .5s ease-in-out;
    }

    .login {
        margin: 20px 3px;
        text-align: center;
        height: 34px;
    }

    .login img {
        vertical-align: middle;
        width: 40px;
        border-radius: 50%;
        padding: 1px;
        background: #ddd;
        margin: 0 5px
    }

    .login i {
        float: unset !important;
        font-size: 15px;
        vertical-align: middle;
        color: #92b8c9;
        margin: 0 5px;
    }

    .login span {
        font-size: 15px;
        vertical-align: middle;
        margin: 0 0px 0 7px;
        font-weight: 900;
        color: #92b8c9;
        font-family: 'Recursive', sans-serif;
    }

    .li-add {
        background: #63a4ca;
        padding: 2px 20px;
        border: 1px solid #999;
    }

    .li-add a {
        color: white !important;
    }

    @-webkit-keyframes conditionalOpen {
        from {
            transform: scaleY(0)
        }

        to {
            transform: scaleY(1)
        }
    }

    @keyframes conditionalOpen {
        from {
            transform: scaleY(0)
        }

        to {
            transform: scaleY(1)
        }
    }

    .menu {
        position: absolute;
        bottom: 0;
        white-space: nowrap;
        position: fixed;
        overflow-y: auto;
        top: 0px;
        left: 0px;
        background-color: #343a40;
        z-index: 600;
        bottom: 0;
        font-family: 'El Messiri';
        font-size: 13px;
        transition: width .5s ease-in-out;
    }

    .noselect {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Old versions of Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                      supported by Chrome, Edge, Opera and Firefox */
    }

    .menu li:first-child {
        border-top: none;
    }

    .menu .li_hover:hover {
        text-decoration: underline;
        -webkit-text-decoration-color: #c3153d;
        text-decoration-color: #c3153d;
    }

    .header a {
        text-decoration: none;
        color: white;
        font-weight: 900;
        font-size: 13px;
        vertical-align: middle
    }

    .header li {
        display: inline-block;
        margin: 0 20px;
        vertical-align: middle
    }

    .header .nav-link .fa-bars {
        border: 1px solid #999;
        border-radius: 50%;
        padding: 7px 9px;
    }

    .header {
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.15);
        display: block;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 300;
        background: #3c8dbc;
        transition: margin-left .5s ease-in-out, width .5s ease-in-out;
        vertical-align: middle;
        padding: 10px 15px;
    }

    .header .logo {
        display: inline-block;
        text-align: right;
        vertical-align: middle;
        width: 50%;
    }

    .header .logo span {
        position: absolute;
        background: red;
        border-radius: 50%;
        padding: 0px 5px;
        font-size: 12px;
        margin: -5px 0;
    }

    .header_menu {
        text-align: left;
        display: inline-block;
    }

    body,
    ul,
    #app {
        padding: 0;
        margin: 0;
    }

    .app-page {
        margin: 0 20px;
        background: #f5f5f5;
        padding: 20px;
    }

    .app-page .head h3 {
        color: black;
        text-align: center;
        border: 1px solid #ccc;
        background: white;
        padding: 15px 0px;
        font-size: 20px;
        font-weight: 900;
            box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);

    }

    .container,
    body {
        background: #f5f5f5 !important;
    }
.btns {

  text-align: center;
  margin: 20px auto;
}
    @media screen and (max-width: 600px) {
        .pageContent .dis {
            display: block !important;
        }

        .nav .selct {
            padding-bottom: 10px
        }

        .searchUsers .usersContent .img {
            display: none;
        }

        .content-wrapper>.content,
        .head h3 {
            width: 100%;
            padding: 0;
            margin: 0px 0;
        }

        .head {

            margin: 0px 0;
        }

        .container,
        .content,
        .content-wrapper,
        .container-fluid {
            width: 100%;
            padding: 0 !important;
            ;
            margin: 0 !important;
        }

        .app-page {
            padding: 0;
            margin: 0;
            text-align: center;
        }

        .card-body {
            padding: 5px !important;
        }

        .model_content h3 {

            width: 150px !important;
            font-size: 15px;
        }

        .model_content {
            width: 300px;
            padding-left: 0;
            padding-right: 0;
            text-align: center
        }
    }
</style>