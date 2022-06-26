<template>
    <div class="dashboard">
        <div :style="'background:'+box.bg" v-for="box in flex" :key="box.name" class="bg-aqua">
            <div class="inner">
                <h3>{{box.int}}</h3>

                <p>{{box.description}}</p>
            </div>
            <div class="boximg">
                <img :src="require('@/assets/dash/'+box.name+'.png')">
            </div>
            <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>
        </div>

        <div class="analytics_users">
            <div class="wrapper col-2 tabsl">
                <div class="ana_title">
                    <h1>أحصائيات الشهور الاخيرة</h1>
                    <a href="#" class="small-box-footer">2020 <i class="fas fa-sort-down"></i></a>
                </div><canvas class="chart-container" id="chart-0"></canvas>
            </div>
            <div class="container tabsl">
                <div class="ana_title">
                    <h1>أحصائيات الايام الاخيرة</h1>
                    <a href="#" class="small-box-footer">اخر اسبوع <i class="fas fa-sort-down"></i></a>
                </div>
            </div>
            <div class="tabsl box" id="canvas-holder" style="width:50%">
                <div class="ana_title title_box">
                    <h1>المتصفحات الاكثر أستخداماً</h1>
                    <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>
                </div><canvas id="chart-area_2"></canvas>
            </div>
            <div class="tabsl box">
                <div class="ana_title title_box">
                    <h1>أين يوجد المستخدمون؟</h1>
                    <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>

                </div>

                <table class="table table-bordered">
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>الدول</th>
                        <th></th>
                        <th style="width: 40px"></th>
                    </tr>
                    <tr v-for="(f,i) in flag" :key="f.name">
                        <td>{{i}}</td>
                        <td><img :src="f.img"><span>{{f.name}}</span></td>
                        <td>
                            <div class="progress progress-xs">
                                <div class="progress-bar progress-bar-danger" :style="'width:'+ getInt(flag,f.values)">
                                    <font>{{getInt(flag,f.values)}}</font>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-red">{{f.values}}</span></td>
                    </tr>
                </table>
            </div>
            <div class="tabsl box">
                <div class="ana_title title_box">
                    <h1>اهم الإحالات</h1>
                    <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>

                </div>

                <table class="table table-bordered">
                    <tr>
                        <th>رابط الصفحة</th>
                    </tr>
                    <tr v-for="ff in refrf" :key="ff.values">
                        <td><span>{{ff.name}}</span></td>
                        <td>
                            <div class="progress progress-xs">
                                <div class="pro_tow progress-bar progress-bar-danger" :style="'width:'+ getInt(tablePage,ff.values)">
                                    <font>{{getInt(refrf,ff.values)}}</font>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-red">{{ff.values}}</span></td>
                    </tr>
                </table>
            </div>
            <div class="tabsl box">
                <div class="ana_title title_box">
                    <h1>ما الصفحات التي يزورها مستخدمو موقعك؟</h1>
                    <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>

                </div>

                <table class="table table-bordered">
                    <tr>
                        <th>رابط الصفحة</th>
                        <th></th>
                        <th> مرات مشاهدة الصفحة </th>
                    </tr>
                    <tr v-for="ff in tablePage" :key="ff.values">
                        <td><span>{{ff.name}}</span></td>
                        <td>
                            <div class="progress progress-xs">
                                <div class="pro_tow progress-bar progress-bar-danger" :style="'width:'+ getInt(tablePage,ff.values)">
                                    <font>{{getInt(tablePage,ff.values)}}</font>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-red">{{ff.values}}</span></td>
                    </tr>
                </table>
            </div>
            <div class="tabsl box box_sys" id="canvas-holder" style="width:50%">
                <div class="ana_title title_box">
                    <h1>ما أهم الأجهزة لديك؟</h1>
                    <a href="#" class="small-box-footer">اليوم <i class="fas fa-sort-down"></i></a>
                </div>
                <canvas id="chart-area_3"></canvas>
                <div class="icon_sys">
                    <div v-for="sys in icon_system" :key="sys.values" :class="sys.css">
                        <i :class="sys.icon"></i>
                        <span>{{sys.name}}</span>
                        <h6>{{getInt(icon_system,sys.values)}}</h6>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    export default {

        name: "dachBoard",
        created() {},


        methods: {


            getInt(obj, val) {
                let int = 0;
                for (let flags of obj) {
                    int += flags.values;
                }
                return ((val / int) * 100).toFixed(2) + '%'

            },

        },

        data() {
            return {

                refrf: [{
                        name: 'page',
                        values: 1000,


                    }, {
                        name: 'page1',
                        values: 2000,


                    }, {
                        name: 'page2',
                        values: 3000,


                    }, {
                        name: 'page',
                        values: 1440,


                    }, {
                        name: 'page3',
                        values: 4000,


                    }, {
                        name: 'page4',
                        values: 9200,


                    }, {
                        name: 'page5',
                        values: 10000,

                    }

                ],

                icon_system: [

                    {
                        name: 'أجهزة الجوّال',
                        icon: 'fas fa-mobile-alt',
                        values: 1056,
                        css: 'sys_div'

                    },

                    {
                        name: 'الأجهزة المكتبية',
                        icon: 'fas fa-tv',
                        values: 2056,
                        css: 'sys_div sys_div_bor'
                    },

                    {
                        name: 'الأجهزة اللوحية',
                        icon: 'fas fa-tablet-alt',
                        values: 6056,
                        css: 'sys_div'

                    },


                ],

                tablePage: [{
                        name: 'page',
                        values: 1000,


                    }, {
                        name: 'page1',
                        values: 2000,


                    }, {
                        name: 'page2',
                        values: 3000,


                    }, {
                        name: 'page',
                        values: 1440,


                    }, {
                        name: 'page3',
                        values: 4000,


                    }, {
                        name: 'page4',
                        values: 9200,


                    }, {
                        name: 'page5',
                        values: 10000,

                    }

                ],

                flag: [

                    {
                        name: 'Egypt',
                        img: 'https://www.countryflags.io/EG/shiny/64.png',
                        values: 9040
                    }, {
                        name: 'United Arab Emirates',
                        img: 'https://www.countryflags.io/AE/shiny/64.png',
                        values: 1040
                    }, {
                        name: 'Spain',
                        img: 'https://www.countryflags.io/ES/shiny/64.png',
                        values: 900
                    }, {
                        name: 'France',
                        img: 'https://www.countryflags.io/FR/shiny/64.png',
                        values: 400
                    }, {
                        name: 'Palestine',
                        img: 'https://www.countryflags.io/PS/shiny/64.png',
                        values: 1200
                    }

                ],

                analytics_users: [{
                    name: "Saturday",
                    int: 600
                }, {
                    name: "Sunday",
                    int: 866
                }, {
                    name: "Monday",
                    int: 663
                }, {
                    name: "Tuesday",
                    int: 333
                }, {
                    name: "Wednesday",
                    int: 345
                }, {
                    name: "Thursday",
                    int: 543
                }, {
                    name: "Friday",
                    int: 100
                }],

                flex: [

                    {
                        name: 'Orders',
                        description: 'اوردر جديد',
                        int: 150,
                        bg: '#FEA47F'
                    }, {
                        name: 'Bounce',
                        description: 'معدل الأرتداد',
                        int: '50%',
                        bg: '#25CCF7'

                    }, {
                        name: 'Registrations',
                        description: 'الأعضاء الجددد',
                        int: 15,
                        bg: '#EAB543'

                    }, {
                        name: 'Unique',
                        description: 'عدد الزيارات',
                        int: 1500,
                        bg: '#55E6C1'

                    },

                ],

            }
        },

    }

</script>
<style>
    .ana_title a{
 position: absolute;
  top:0;
  left: 0
    
}
.ana_title{
  position: relative
}
.box_sys a{
  margin: 0 20px
}
    .box_sys .ana_title {
        padding: 0 20px
    }

    .box_sys {
        max-height: 530px !important;
        padding: 0 !important;
        text-align: center !important;
    }

    .icon_sys {
        margin: 20px 0;
        background: #ff6384;
        border-top: solid 4px orange;
        border-bottom: solid 1px #ccc
    }

    .sys_div_bor {

        border-left: 1px solid #dd6389;
        border-right: 1px solid #dd6389;
    }

    .sys_div {
        display: inline-block;
        padding: 10px;
    }

    .sys_div span {
        color: white;
        font-weight: 900;
        font-family: 'El Messiri' !important;
        ;
        font-size: 20px;
    }

    .sys_div i {
        font-size: 30px;
        display: block;
        color: #fff !important;
        ;
        margin: 10px 0;
    }

    .sys_div h6 {
        padding: 0;
        margin: 0;
        font-size: 20px;
        color: white !important;
    }

    .box_sys {
        max-height: 600px !important;
    }

    .icon_sys {
        margin: 20px 0;
    }

    .sys_div {
        display: inline-block;
        margin: 10px
    }

    .analytics_users .ana_title {
        border-bottom: 3px solid #eee;
        font-family: 'El Messiri';
    }

    .title_box {
        margin: 0 0 25px 0
    }

    canvas {
        padding: 0 !important;
        ;
        margin: 0 !important;
        height: 280px !important;
    }

    .analytics_users .ana_title h1 {
        margin: 20px 5px;
        padding: 0;
        text-align: right;
        font-size: 20px;
        color: black;
        font-weight: 300
    }

    .analytics_users .bx {
        border-radius: 3px;
        background: #ffffff;
        width: 45%;
        padding: 10px;
        display: inline-block;
        width: 45%;
        vertical-align: top;
        background: #fff;
        margin: 0 5px 2% 6px;
        border: 1px solid #ddd;
    }

    .table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        text-align: left
    }

    .table td {
        margin: 0 10px;
    }

    .table .progress-bar {
        background: orange;
        height: 25px;
        text-align: center
    }

    .tabsl span {
        font-family: 'Katibeh';
    }

    .table img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin: 0 10px
    }

    .progress {
        background: #ddd;
        width: 200px;
        height: 25px;
    }

    .table span {

        vertical-align: middle
    }

    .analytics_users .tabsl {
        display: inline-block;
        width: 45%;
        vertical-align: top;
        background: #fff;
        margin: 10px 5px 5% 15px;
        border: 1px solid #ddd;
        font-family: 'El Messiri';
        font-weight: 300;
        padding: 20px;
        min-height: 420px;
        max-height: 420px;
    }

    .box font {
        font-size: 12px;
        margin: 0 5px;
        text-align: center
    }

    canvas {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .container {}

    /*
    ############################
    ############################
    ############################
*/
    #chart-0 {
        margin: 0 0 0 0px;
    }

    .wrapper.col-2 {
        display: inline-block;
        min-height: 256px;
        width: 49%;
    }

    @media (max-width: 400px) {
        .wrapper.col-2 {
            width: 100%
        }
    }

    .wrapper canvas {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .toolbar {
        display: flex;
    }

    .toolbar>* {
        margin: 0 8px 0 0;
    }

    .chartjs-title {
        font-size: 2rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .chartjs-title::before {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 40px;
        content: 'Chart.js | ';
        color: #f27173;
        font-weight: 600;
        padding-left: 48px;
    }

    .chartjs-caption {
        font-size: 1.2rem;
    }

    .chartjs-links {
        display: flex;
        justify-content: center;
        padding: 8px 0;
    }

    .chartjs-links a {
        align-items: center;
        display: flex;
        font-size: 0.9rem;
        margin: 0.2rem;
    }

    .chartjs-links .fa:before {
        margin-right: 0.5em;
    }

    .samples-category {
        display: inline-block;
        margin-bottom: 32px;
        vertical-align: top;
        width: 25%;
    }

    .samples-category>.title {
        color: #aaa;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .samples-category:hover>.title {
        color: black;
    }

    .samples-category>.items {
        padding: 8px 0;
    }

    .samples-entry {
        padding: 0 0 4px 0;
    }

    .samples-entry>.title {
        font-weight: 700;
    }

    @media (max-width: 640px) {
        .samples-category {
            width: 33%;
        }
    }

    @media (max-width: 512px) {
        .samples-category {
            width: 50%;
        }
    }

    @media (max-width: 420px) {
        .chartjs-caption {
            font-size: 1.05rem;
        }

        .chartjs-title::before {
            content: '';
        }

        .chartjs-links a {
            flex-direction: column;
        }

        .chartjs-links .fa {
            margin: 0
        }

        .samples-category {
            width: 100%;
        }
    }


    /*    #######################  */
    /*    #######################  */
    /*    #######################  */
    /*    #######################  */
    .analytics_users {
        text-align: center;
        padding: 0px 0px;
        background: #fff;
        margin: 30px 0
    }

    .bg-aqua a {
        font-family: 'El Messiri';
        text-decoration: none;
        font-size: 20px;
    }

    .bg-aqua p {
        background: gold;
        padding: 0 15px;
        border: 1px solid #999;
    }

    .bg-aqua {
        display: inline-block;
        margin: 10px 0.5%;
        width: 24%;
        text-align: center;
        position: relative;
        padding: 10px;
        border: 1px solid #ddd
    }

    .bg-aqua p {
        vertical-align: middle;
        font-family: 'El Messiri';
        font-size: 20px
    }

    .bg-aqua img {
        width: 60px;
        height: 60px;
        vertical-align: middle;
        position: absolute;
        right: 10px;
        top: 10px;
        background: white;
        border-radius: 50%;
        border: 1px solid #999
    }

    .bg-aqua h3 {
        font-size: 40px;
        display: block;
        margin: 00px 0 20px 0;
        text-align: center;
        color: #fff;
        font-family: 'Chewy';
    }

    .bg-aqua div {
        display: inline-block;
    }

    .bg-aqua a {
        display: block;
        color: white
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    .pro_tow {
        background: darksalmon !important;
        color: #000;
    }

</style>
