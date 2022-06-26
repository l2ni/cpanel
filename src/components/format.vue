<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="container">
                    <div class="def_home">
                        <div class="app-page">
                            <div class="head">
                                <h3>{{getSection('title')}}</h3>
                            </div>
                            <div class="blog">
                                <div class="card card-info">
                                    <div class="card-body">
                                        <form class="form-horizontal">
                                            <div class="card-body">
                                                <div v-if="tapObj.length > 0" class="input-group mb-3">
                                                    <div class="input-group-prepend quantity_in">
                                                        <b class="input-group-text">الاقسام </b>
                                                    </div>
                                                    <select v-model="option">
                                                        <option v-for="(op,i) in tapObj" :key="i">{{op.name}}</option>
                                                    </select>
                                                </div>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend quantity_in">
                                                        <b class="input-group-text">Title </b>
                                                    </div>
                                                    <input v-model="name" type="text" id="pages_name"
                                                        class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <!-- :config="editorConfig" -->
                                                    <ckeditor :editor="editor" @ready="onReady" v-model="title">
                                                    </ckeditor>
                                                </div>
                                            </div>
                                            <div class="item-up">
                                                <div class="title"><span>Videos</span></div>
                                                <div class="video-taps">
                                                    <div class="tapContents">
                                                        <div v-for="(tap,i) in videoTaps.tap" :key="i"
                                                            @click="videoTaps.actived=tap.id"
                                                            :class="videoTaps.actived == tap.id ? videoTaps.class.active: videoTaps.class.none">
                                                            <span>{{tap.name}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="videoTaps.actived=='1'">
                                                    <div class="timeline-body">
                                                        <div class="yt loading">
                                                            <input placeholder="http://www.youtube.com"
                                                                v-model="m_video" type="text">
                                                        </div>
                                                        <div class="img video" v-for="(urls,i) in video" :key="i">
                                                            <div class="view">
                                                                <img :src="urls.url">
                                                                <div><b>{{urls.title}}</b></div>
                                                            </div>
                                                            <i class="fas fa-times" @click="DeleteRoWyt(i)"
                                                                style="cursor: pointer;">
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div class="item-btn">
                                                        <small>Paste the media URL in the input</small>
                                                    </div>
                                                </div>
                                                <div v-if="videoTaps.actived=='2'">
                                                    <div class="timeline-body">
                                                        <div v-if="DEFIMAGESVIDEO" class="img DEFIMAGES">
                                                            <img :src="include('def',DEFIMAGESVIDEO)">
                                                        </div>
                                                        <div class="img" v-for="(url,i) in videos" :key="i">
                                                            <img :src="url">
                                                            <i class="fas fa-times" @click="DeleteRowVideo(i)"
                                                                style="cursor: pointer;"></i>
                                                        </div>
                                                        <div v-if="load == 'video' && loading" class="img loading">
                                                            <img :src="include('def',loading)">
                                                        </div>
                                                    </div>
                                                    <div class="item-btn">
                                                        <label for="video" class="btn-i">Upload Video</label>
                                                        <input name="video" @change="uploadVideo()" id="video"
                                                            style="display:none" type="file">
                                                        <!--  -->
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="item-up">
                                                <div class="title"><span>Images</span></div>
                                                <div class="timeline-body">
                                                    <div v-if="DEFIMAGES" class="img DEFIMAGES">
                                                        <img :src="include('def',DEFIMAGES)">
                                                    </div>
                                                    <div class="img" v-for="(url,i) in image" :key="i">
                                                        <img :src="url">
                                                        <i class="fas fa-times" @click="DeleteRow(i)"
                                                            style="cursor: pointer;"></i>
                                                    </div>
                                                    <div v-if="load == 'img' && loading" class="img loading">
                                                        <img :src="include('def',loading)">
                                                    </div>
                                                </div>
                                                <div class="item-btn">
                                                    <label for="userfile" class="btn-i">Upload Image</label>
                                                    <input accept=".jpg,.jpeg,.png" name="userfile"
                                                        @change="uploadImage()" id="userfile" style="display:none"
                                                        type="file">
                                                </div>
                                            </div>
                                        </form>
                                        <div class="item-up seo">
                                            <div class="title"><span>Seo</span></div>
                                            <div class="inp-seo">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend quantity_in">
                                                        <b class="input-group-text">keyword</b>
                                                    </div>
                                                    <input v-model="keyword" type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div @click="api()" class="item-btn">
                                    <button type="button" class="btn btn-block btn-success btn-lg">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<!-- eslint-disable -->

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
    //  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
            if (this.params.id) {
                this.API(`get.php?action=_section&id=${this.params.id}`, (data) => {
                    if (data) {
                        this.modalContainer(false);
                        this.action(data);
                    }
                });
            }
            this.API(`get.php?action=section&row=${this.getSection("section")}`, (data) => {
                if (data) {
                    this.modalContainer(false);
                    if (data.length > 0) {
                        this.dataTap(data);
                        var seleced = this.option;
                        this.option = seleced ? seleced : data[0].name;
                    }

                }
            });
        },
        data() {
            return {
                videoTaps: {
                    tap: [
                        {
                            name: "Paste Urls",
                            id: 1
                        },
                        {
                            name: "Uploads Videos",
                            id: 2
                        }
                    ],

                    class: {
                        active: "actiived-s",
                            none: "nonn-ac"
                    },
                    actived: 1

                },
                video: [],
                videos: [],
                m_video: "",
                editor: DecoupledEditor,
                loading: false,
                title: '',
                image: [],
                actived: "1",
                load: "",
                DEFIMAGES: `workout_img.png`,
                DEFIMAGESVIDEO: `video.png`,
                keyword: "",
                name: '',
                tables: "",
                info: [],
                option: "",
                section: false
            }
        },
        computed: {

            ...mapState([
                'APIURL',
                'escape',
                'Chars',
                'settings',
                'Account',
                'loadingUploadImage',
                'tapObj'
            ]),
            ...mapGetters([
                'API',
                'UPLOADFILE',
                'getJSon',
                'encodeHTML',
                'uncodeHTML',
                'include',
                'ValiDateMsg',
                'UPLOADFILEVIDEO'

            ])
        },
        props: ['params'],
        updated: function () {},
        components: {},
        watch: {
            image: function (value, x) {
                x = (value.length > 0) ? false : `workout_img.png`;
                this.DEFIMAGES = x;
            },
            videos: function (value, x) {
                x = (value.length > 0) ? false : `workout_img.png`;
                this.DEFIMAGESVIDEO = x;
            },
            m_video: function (val, regExp) {
                if (val.match(
                        /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                    )) {
                    regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    regExp = val.match(regExp);
                    if (regExp[7].length == 11) {
                        var url =
                            `http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${regExp[7]}&format=json`;
                        this.API(url, (e) => {
                            if (e) {
                                this.modalContainer(false);
                                this.video.push({
                                    title: e.title,
                                    url: e.thumbnail_url,
                                    video: val
                                });
                            }
                        }, true);
                        this.m_video = "";
                    }
                }
            }
        },

        methods: {
            getSection(ev, txt) {

                var table = this.params.id ? [this.params.section, "Edit The "] : [this.params.section, "add To "]
                switch (table[0].toLowerCase()) {
                    case "workouts":
                        txt = table[1] + "Swimming Workouts"
                        break;
                    case "fitness":
                        txt = table[1] + "Fitness"
                        break;
                    case "culture":
                        txt = table[1] + "Specialized Culture"
                        break;
                    case "coaches":
                        txt = table[1] + "Coach's Guide"
                        break;
                }

                if (ev == 'title') {
                    return txt;
                }
                if (ev == "section") {
                    return table[0];
                }
            },
            encodeURIArr(arr, types, escape) {
                if (arr.length == 0) return [];
                arr = escape ? arr : JSON.parse(arr);
                let arrays = [];
                for (let index = 0; index < arr.length; index++) {
                    if (types == "video") {
                        let obj = {
                            title: escape ? this.encodeHTML(arr[index].title) : this.uncodeHTML(arr[index].title),
                            url: arr[index].url,
                            video: arr[index].video
                        }

                        arrays.push(obj);
                    }
                }
                return arrays;
            },

            action(e = false) {
                if (e) {
                    e = e[0];
                    this.name = this.uncodeHTML(e.name);
                    this.title = this.uncodeHTML(e.title, false);
                    this.image = JSON.parse(e.image);
                    this.video = this.encodeURIArr(e.video, "video", !1);
                    this.keyword = this.uncodeHTML(e.keyword);
                    this.user = e.name;
                    this.info = []
                    this.section = e.section;
                    this.option = e.section;
                    return;
                }
                var table = this.params.id ? this.params.section : this.params.section

                let obj = {
                    name: this.encodeHTML(this.name),
                    title: this.encodeHTML(this.title),
                    image: this.image,
                    video: this.encodeURIArr(this.video, "video", 1),
                    keyword: this.encodeHTML(this.keyword),
                    tables: table,
                    user: this.Account.nickname,
                    info: [],
                    section: this.option,

                };

                return JSON.stringify(obj);

            },

            api(URL) {
                const section = this.params.section;
                if (this.params.id) {
                    URL = `update.php?raw=sections&id=${this.params.id}&row=id&action=${this.action()}`;
                } else {
                    URL = `set.php?raw=sections&action=${this.action()}`;
                }
                this.API(URL, (data) => {
                    if (data) {
                        this.modalContainer(section);
                    } else {
                        this.changelastRequest([URL, section]);
                        this.modalContainer("error");
                    }
                });
            },

            onReady(editor) {
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            },

            ...mapMutations([
                'modalContainer',
                'deleteAjax',
                "dataTap"

            ]),

            uploadImage() {
                this.loading = this.loadingUploadImage;
                this.load = 'img';
                this.UPLOADFILE([600, 600], (data) => {
                    if (data.status) {
                        this.image.push(this.include("", data.url));
                        this.loading = false;
                        this.load = false;
                    }
                });
            },
            uploadVideo() {
                this.loading = this.loadingUploadImage;
                this.load = 'video';
                this.UPLOADFILEVIDEO((data) => {
                    if (data.status) {
                        this.videos.push(this.include("", data.url));
                        this.loading = false;
                        this.load = false;
                    }
                });
            },

            DeleteRow(i) {
                this.$delete(this.image, i);
            },

            DeleteRoWyt(i) {
                this.$delete(this.video, i);
            }
        }
    }
</script>
<style>
    .video-taps div span {
        color: mistyrose;
        font-size: 12px;
    }

    .video-taps .tapContents div {
        display: inline-block;
        background: #48799b;
        padding: 5px;
        margin: 0 0px;
        cursor: pointer
    }

    .video-taps {
        text-align: left;
        direction: ltr;
        background: #48799b;

        border-bottom: 2px solid #000;

    }

    .video-taps .actiived-s {
        background: #0085ba !important;

    }

    .video-taps .actiived-s span {

        color: white !important;
    }

    .ck-content {
        border: 1px solid #ccc !important;
    }

    .app-page .app-page-content {
        border: 1px solid #ddd;
    }

    .item-up .title span {
        text-shadow: 1px 1px 1px #000;
        font-size: 15px !important;
        text-align: left;
        color: #fff;
    }

    .item-up .title {
        background: #0085ba;
        padding: 8px;
        margin: 40px 0 0px 0;
        /*! border: 1px solid #ddd; */
    }

    .item-up .timeline-body {
        padding: 20px;
        text-align: center
    }

    .item-up .timeline-body.d {
        padding: 15px;
        background: #f6f6f6
    }

    .item-up .timeline-body img {
        padding: 20px;
        text-align: center
    }

    .item-up span {
        color: white;
        font-family: 'Almarai', sans-serif !important;
        font-weight: 900;
        font-size: 20px;
        margin: 0 10px;
        text-align: center;
        display: block
    }

    .item-up .item-btn {
        padding: 10px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        text-align: left;
    }

    .item-up .btn-i {
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

    .item-up .img img {
        width: 80px;
        height: 80px;
        margin: 5px;
        padding: 5px;
        border: 1.5px solid #ddd;
    }

    .item-up .img {
        display: inline-block;
        border: 2px solid #ddd;
        margin: 5px;
        position: relative;
        padding-top: 15px
    }

    .timeline-body {
        border: 1px solid #ddd;
    }

    .item-up .img i {
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
        padding: 10px 5px;
        border: 2px solid #ddd;
        width: 100%
    }

    .img.video img {
        width: 130px;
        height: 130px
    }

    @media screen and (max-width: 600px) {}
</style>