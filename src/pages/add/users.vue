<!-- eslint-disable -->
<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="head">
                                <h3 v-html="get_title()"></h3>
                            </div>
                            <div class="blog">
                                <div class=" card-info">
                                    <div class="card-body">
                                        <form class="form-horizontal">
                                            <div class="card-body">
                                                <div v-if="showHTML('adduser')" class="card-bod">
                                                    <label class="input-group-text fname">Username</label>
                                                    <input placeholder="Username" class="form-control" type="text"
                                                        v-model="nickname">
                                                </div>
                                                <div v-if="showHTML('newuser')" class="usernew_pass card-bod">
                                                    <div class="usernew_pass card-bod">
                                                        <label class="input-group-text fname">Password</label>
                                                        <div class="eye">
                                                            <div class="eyas">
                                                                <i @click="typeINPUT = typeINPUT == 'password' ? 'text':'password'"
                                                                    :class="typeINPUT == 'password' ? 'fas fa-eye':'fas fa-eye-slash'"></i>
                                                            </div>

                                                            <input placeholder="Password" class="form-control"
                                                                :type="typeINPUT" v-model="PASSWORD">
                                                        </div>

                                                        <div class="ran">
                                                            <a class="btnns" @click="PASSWORD=randomChars()">Generate
                                                                random</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="showHTML('change password')" class="usernew_pass card-bod">
                                                    <div class="usernew_pass card-bod">
                                                        <label class="input-group-text fname">Enter New Password</label>
                                                        <div class="eye">
                                                            <div class="eyass">
                                                                <i :class="NewPass ? 'fas fa-check':'fas fa-exclamation-circle'"></i>
                                                            </div>
                                                            <div class="eyas">
                                                                <i @click="typeINPUT = typeINPUT == 'password' ? 'text':'password'"
                                                                    :class="typeINPUT == 'password' ? 'fas fa-eye':'fas fa-eye-slash'"></i>
                                                            </div>
                                                            <input placeholder="Password" class="PD form-control"
                                                                :type="typeINPUT" v-model="NewPass">
                                                        </div>
                                                        <div class="ran">
                                                            <a class="btnns" @click="NewPass=randomChars()">Generate
                                                                random</a>
                                                        </div>

                                                        <label class="input-group-text fname">Enter the password
                                                            again</label>
                                                        <div class="eye">
                                                            <div class="eyass">
                                                                <i :class="NewPass && NewPass == ReNewPass ? 'fas fa-check':'fas fa-exclamation-circle'"></i>
                                                            </div>
                                                            <input placeholder="Password" class="PD form-control" :type="typeINPUT" v-model="ReNewPass">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="showHTML('adduser')" class="card-bod">
                                                    <label class="input-group-text fname">Email</label>
                                                    <input placeholder="Email" class="form-control" type="text"
                                                        v-model="email">
                                                </div>
                                                <div v-if="showHTML('adduser')" class="card-bod">
                                                    <label class="input-group-text fname">Access</label>
                                                    <div class="from-control access">
                                                        <label class="switch">
                                                            <input true-value="1" false-value="0" v-model="access"
                                                                type="checkbox">
                                                            <sub class="slider round"></sub>
                                                        </label>
                                                        <div class="status" v-html="access == 1 ? 'On': 'off'"></div>
                                                    </div>
                                                </div>
                                                <div v-if="showHTML('adduser')" class="card-bod">
                                                    <label class="input-group-text fname">Phone</label>
                                                    <vue-tel-input v-bind="bindProps"
                                                        v-on:country-changed="countryChanged" v-model="phone">
                                                    </vue-tel-input>
                                                </div>
                                                <div v-if="showHTML('adduser')" class="usernew_icon card-bod">
                                                    <label class="input-group-text fname">image</label>
                                                    <div class="imgO"><img :src="Default()" alt="">
                                                    </div>
                                                    <label for="userfile"><a class="btnns">تحميل صورة</a></label>
                                                    <input name="userfile" style="display:none" type="file"
                                                        @change="uploadImage()" id="userfile">
                                                </div>
                                                <div v-if="showHTML('adduser')" class="usernew_sex card-bod">
                                                    <label class="input-group-text fname">Gender</label>
                                                    <div>
                                                        <li><input name="sex" value="male" type="radio"
                                                                v-model="Gender">male</li>
                                                        <li><input name="sex" value="female" type="radio"
                                                                v-model="Gender">female</li>
                                                    </div>
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
            <div v-if="showHTML('save')" @click="saveData()" class="btns">
                <a type="button" class="btnn">Save</a>
            </div>
        </section>
    </div>
</template>
<!-- eslint-disable -->

<script>
    import {
        VueTelInput
    } from 'vue-tel-input'
    import {
        mapState
    } from 'vuex'
    import {
        mapGetters
    } from 'vuex'
    import {
        mapMutations
    } from 'vuex'
    import "@/assets/rel.css";
    export default {
        components: {
            VueTelInput,
        },
        data() {
            return {
                nickname: "",
                PASSWORD: "",
                NewPass: "",
                ReNewPass: "",
                typeINPUT: "password",
                image: "",
                phone: "",
                email: "",
                access: "0",
                Gender: "",
                status: true,
                login: "1",
                register: [navigator.userAgent],
                info: [],
                bindProps: {
                    dropdownOpenDirection: 'below',
                    phoneDetails: "",
                    selectedIndex: 0,
                    sortedCountries: "",
                    searchQuery: "",
                    activeCountryCode: '',
                    open: false,
                    invalidMsg: "Type Numbers Only",
                    finishMounted: false,
                    selectedIndex: null,
                    typeToFindInput: '',
                    typeToFindTimer: null,
                    validCharactersOnly: true,
                    placeholder: "Enter a phone number",
                    autocomplete: "on",
                    dropdownOptions: {
                        showDialCodeInSelection: true,
                        showSearchBox: true,
                        showFlags: true,
                    },

                }
            }
        },
        computed: {
            ...mapState([
                'settings',
                'pathDefaultImages',
                'modal_Container',
                'err',
                'loadingUploadImage'
            ]),

            ...mapGetters([
                'API',
                'UPLOADFILE',
                'include',
                'validateInput',
                'ValiDateMsg'

            ])
        },

        props: ['params'],

        created() {
            if (this.get_params()) {
                this.API(`get.php?action=_users&id=${this.params.id}`, (data) => {
                    if (data) {
                        this.modalContainer(false);
                        this.action(data);
                    }
                });
            }
        },
        watch: {

        },
        methods: {
            showHTML(type) {
                if (type == "save") {
                    if (this.get_params().type == 'pass') {
                        if (this.NewPass && this.NewPass == this.ReNewPass) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
                if (type == "change password") {
                    if (this.get_params().type == 'pass') {
                        return true;
                    }
                    return false;
                }
                if (type == "adduser") {
                    if (!this.get_params() || this.get_params().type == 'full') {
                        return true;
                    }
                    return false;
                }
                if (type == "newuser") {
                    if (!this.get_params()) {
                        return true;
                    }
                    return false;
                }
            },
            get_params() {
                if (this.params) return this.params
                return false;
            },

            Default() {
                if (this.image) return this.image;
                const genders = this.Gender;
                const img = ['user_male.jpg', 'user_female.jpg'];

                if (genders == 'female') {
                    return this.include("def", img[1]);
                }
                return this.include("def", img[0]);
            },

            ...mapMutations([
                'changelastRequest',
                'modalContainer',
                'valid'
            ]),
            get_title() {
                if (!this.get_params()) {
                    return 'Add New Username'
                } else {
                    if (this.get_params().type == 'full') {
                        return 'Edit Data (' + this.nickname + ')'
                    } else {
                        return 'Change Password (' + this.nickname + ')'
                    }
                }
            },
            action(event) {
                if (event) {
                    event = event[0];
                    var phone = JSON.parse(event.phone);
                    this.nickname = event.nickname;
                    this.PASSWORD = null;
                    this.image = event.image;
                    this.phone = phone.number.trim();
                    this.email = event.email;
                    this.access = event.access;
                    this.Gender = event.Gender;
                    this.status = event.status;
                    this.login = event.login;
                    this.register = event.register;
                    this.info = event.info;
                }

                var action = {
                    id: this.randomChars("id"),
                    nickname: this.nickname,
                    PASSWORD: this.PASSWORD,
                    image: !this.image ? this.Default() : this.image,
                    phone: {
                        number: this.phone,
                        country: this.phoneDetails
                    },
                    email: this.email,
                    access: this.access,
                    Gender: this.Gender,
                    status: this.status,
                    login: this.login,
                    register: this.register,
                    info: this.info,
                };
                return JSON.stringify(action);
            },

            validata() {
                if (this.get_params().type == 'pass') {
                    return false
                }

                var Obj = JSON.parse(this.action()),
                    txt = "",
                    error = this.err;

                Object.keys(Obj).forEach(KEY => {
                    if (KEY == "email") {
                        Obj[KEY] = this.validateInput('@', this.email);
                    }
                    if (!Obj[KEY]) {
                        KEY = KEY.toLowerCase();
                        if (KEY in error) {
                            txt +=
                                `<div class="vali-data"><i class="fas fa-star-half-alt"></i>${(KEY in error ? error[KEY] : "")}</div>`
                        }

                    }
                });

                if (txt) {
                    this.valid(txt);
                    return true;
                }
            },

            saveData(URL) {
                if (!this.get_params()) {
                    if (this.validata()) {
                        return;
                    }
                }

                var action = this.action();
                if (this.get_params()) {
                    if (this.get_params().type == "pass") {
                        action = {
                            PASSWORD: this.NewPass
                        };
                        action = JSON.stringify(action);
                    }
                    URL = `update.php?raw=users&id=${this.params.id}&row=id&action=${action}`;
                } else {
                    URL = `set.php?raw=users&action=${action}`;
                }

                this.API(URL, (data) => {
                    if (data) {
                        this.modalContainer("users");
                    } else {
                        this.changelastRequest([URL, "users"]);
                        this.modalContainer("error");
                    }
                });
            },

            countryChanged(phoneDetails) {
                this.phoneDetails = phoneDetails;
            },

            randomChars(type) {
                type = type == "id" ? "0123456789" :
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-$";
                var generatePassword = (
                        length = 10,
                        wishlist = type
                    ) => Array(length)
                    .fill('')
                    .map(() => wishlist[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff +
                            1) *
                        wishlist.length)])
                    .join('');

                return generatePassword();
            },

            uploadImage() {
                this.UPLOADFILE([50, 50], (data) => {
                    if (data.status) {
                        this.image = this.include("", data.url);
                    }
                });
            },
        }
    }
</script>
<style>
    .vti__dropdown {
        border: solid 1px #ddd;
    }

    .vti__dropdown .vti__dropdown-arrow {
        padding: 0 5px
    }

    .btnImage {
        background: #ffffff !important;
        color: rgb(0, 0, 0) !important;
        font-weight: bold;
        display: inline-block;
        padding: 5px 30px;
        margin: 0 10px;
        font-family: 'Cairo', sans-serif;
        font-size: 15px;
        border-radius: 0%
    }

    .eyass {
        position: absolute;
        width: 40px !important;
        left: 0px;
        margin: 7px -4px;

    }

    .eye .PD {
        padding-left: 30px
    }

    .eyas {
        position: absolute;
        width: 20px !important;
        right: 10px;
        background: none !important;
        margin: 7px 0;
    }

    .eye {
        position: relative
    }

    .vti__dropdown-list .vti__flag-wrapper {
        margin: 0 10px 0px 0px
    }

    .vti__dropdown-item {
        width: 360px
    }

    .vti__search_box {
        border: 1px solid #000;
        width: 99.9%;
        padding: 7px;
        margin: 2px 0;
        box-sizing: border-box
    }

    .vti__dropdown-list {

        overflow-x: hidden;
    }

    .access .status {
        color: black;
        font-weight: bold;
        display: inline-block;
        padding: 1px 20px;
        margin: 0 10px;
        font-family: 'PT Sans Narrow', sans-serif;
        font-size: 20px;
        border-radius: 1%;
        box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);
    }

    .access {
        text-align: left
    }

    .from-control.access {
        padding: 15px 15px 10px 10px;
        border: 1px solid #ddd;
        margin: 0 !important;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
    }

    input:checked+.slider {
        background-color: #2196F3;
    }

    input:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked+.slider:before {
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .card .usernew_sex li input {
        margin: 10px 6px;
    }

    .card .usernew_sex li {
        display: inline-block;
        margin: 10px 20px;
    }

    .usernew_icon label {
        width: 100%;
        background: none;
        padding: 10px;
    }

    .usernew_sex div {
        background: #fff;
    }

    .btnns,
    .btnn {
        background: #02a9eb;
        color: white !important;
        border: none;
        font-family: 'Almarai', sans-serif !important;
        margin: 0;
        padding: 5px 10px;
        width: 170px;
        text-align: center;
    }

    .btnn {
        background: #0085ba;

    }

    .usernew_sex div {
        padding: 0px !important;
        margin: 0 !important;
        background: #fff;
        border: 1px solid #ddd;
    }

    .usernew_icon span {
        background: #02a9eb;
        color: white;
        border: none;
        font-family: 'Almarai', sans-serif !important;
        margin: 0;
        padding: 0px 15px;
        border: 1px solid #ddd;
        font-size: 13px
    }

    .card-bod {
        /*! margin: 20px 0; */
    }

    .usernew_icon div {
        display: inline-block;
        padding: 10px 0;
        text-align: center
    }

    .usernew_icon {
        border: 1px solid #ddd;
        border-bottom: none;
    }

    .usernew_icon label {
        background: #e9ecef
    }

    .usernew_icon .inp {
        display: inline-block;
        padding: 10px;
        width: 70%
    }

    .usernew_icon .imgO {
        display: inline-block;
        padding: 10px;
    }

    .usernew_icon img {
        width: 50px;
        height: 50px;
    }

    .card-body {
        flex: 1 1 auto;
        padding: 0;
    }

    .card-bod {
        margin-bottom: 20px;
        background: none !important;
        box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);
    }  
  .card-bod:last-child {
        margin-bottom: 0px;
    }

    .card-bod .ran {
        padding: 15px;
    }

    .usernew_pass .card-bod {
        width: 100%;
        background: none;
        /*! padding: 10px; */
    }

    .btns {
        width: 220px !important;
        background: #0085ba;
        color: white !important;
        padding: 5px 10px;
    }

        .card {
        background-color: none!important;
        background-clip: none!important;
        border: 0 !important;
        border-radius: 0
    }

    .card {
        box-shadow: 0!important;
        margin-bottom:  0!important;
    }
    .usernew_sex li{
        display: inline-block;
        margin: 20px 5px;

    }    
    .usernew_sex{
        text-align: left;
      font-family: 'Oswald', sans-serif;
      

    }    
    .usernew_sex input{
        padding: 0 5px;
                margin: 0 5px;


    }  
  label{
       font-family: 'Noto Serif', serif;
}
</style>