const state = {
    Chars: [{ '¢': 'cent', '£': 'pound', '¥': 'yen', '€': 'euro', '©': 'copy', '®': 'reg', '<': 'lt', '>': 'gt', '"': 'quot', '&': 'amp', '\'': '#39' }, { nbsp: ' ', cent: '¢', pound: '£', yen: '¥', euro: '€', copy: '©', reg: '®', lt: '<', gt: '>', quot: '"', amp: '&', apos: '\'' }],
    modal_Container: false,
    foodsArr: [],
    ingredient: [],
    ajax: {},
    itemsMeal: [],
    validata: [],
    section: [],
    search: [],
    param: {},
    users: [],
    tapObj: [],
    lastRequest: "",
    Account: {},
    err: {
        email: 'Keep your email writing correctly',
        gender: 'Select gender Male Or Female',
        nickname: 'type the name',
        password: 'type the password or click Generate Random',
        phone: 'type the Number Phone',
    },
    loadingUploadImage: 'loading_upload.gif',
    pathDefaultImages: '/static/images/Default/',
    DefaultLogo: 'logo.png',
    settings: {
        public: {},
    }
};
export default state;