<!-- eslint-disable -->

<template>
<!-- eslint-disable -->

    <div>
        <nav class="main-header navbar navbar-expand navbar-light navbar-white">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item  d-sm-inline-block">
                    <a href="/" class="nav-link">Home</a>
                </li>
                <li class="nav-item  d-sm-inline-block">
                    <a href="?logout=1" class="nav-link">Logout</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <!-- <router-link data-widget="control-sidebar" data-slide="true" tag="a" class="nav-link" :to="{path: '/helpers'}">
                        <i class="fas fa-th-large"></i>
                    </router-link> -->
                </li>
            </ul>
        </nav>
    </div>
</template>
<!-- eslint-disable -->

<script>
    export default {
        name: "TopHeader",
        data() {
            return {
                nav: [{
                    i: 'fas fa-dollar-sign',
                    nav: '9',
                    status: ''
                }, {
                    i: 'far fa-envelope',
                    nav: '6',
                    status: ''
                }, {
                    i: 'fa fa-users',
                    nav: '2',
                    status: ''
                }],
            }
        },
        components: {},
        methods: {
        },
    }
</script>