/*eslint-disable*/
const getters = {
    basefile: (state) => (callback) => {
        var file = document.getElementById("video").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function() {
            var dataURL = reader.result;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    callback(JSON.parse(xhr.response));
                }
            }
            var server = ["https://api.imgur.com/3/image", `http://${state.settings.public.domain}/upload/`];
            xhr.open('POST', server[1], true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var data = `image=${dataURL}&up=video`;
            xhr.send(data);
        }

        reader.onerror = function(error) {
            console.log('Error: ', error);
        }
    },
    UPLOADFILEVIDEO: (state) => (callback) => {
        var fd = new FormData();
        var hr = new XMLHttpRequest();
        fd.append('video', document.getElementById("video").files[0]);
        var server = `http://${state.settings.public.domain}/upload/upload.php`;
        hr.open('POST', server, true);
        hr.setRequestHeader("Content-type", "multipart/form-data");

        hr.onreadystatechange = function() {
            if (hr.readyState === 4 && hr.status == 200) {
                callback(JSON.parse(hr.response));
            }
        }

        hr.send(fd);
    },
    UPLOADFILE: (state) => (max, callback) => {
        var files = document.getElementById("userfile").files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            var tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function() {
                var MAX_WIDTH = max[0];
                var MAX_HEIGHT = max[1];
                var tempW = tempImg.width;
                var tempH = tempImg.height;
                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                }
                var canvas = document.createElement('canvas');
                canvas.width = tempW;
                canvas.height = tempH;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, tempW, tempH);
                var dataURL = canvas.toDataURL("image/jpeg");
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status == 200) {
                        callback(JSON.parse(xhr.response));

                    }
                }
                var server = ["https://api.imgur.com/3/image", `http://${state.settings.public.domain}/upload/`];
                xhr.open('POST', server[1], true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                var data = `image=${dataURL}&up=home`;
                xhr.send(data);
            }
        }
        reader.readAsDataURL(files);

    },


    uncodeHTML: (state) => (str, decode) => {
        var htmlEntities = state.Chars[1];
        str = JSON.stringify(str);

        function unescapeHTML(str) {
            return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
                var match;
                if (entityCode in htmlEntities) {
                    return htmlEntities[entityCode];
                    /*eslint no-cond-assign: 0*/
                } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                    return String.fromCharCode(parseInt(match[1], 16));
                    /*eslint no-cond-assign: 0*/
                } else if (match = entityCode.match(/^#(\d+)$/)) {
                    return String.fromCharCode(~~match[1]);
                } else {
                    return entity;
                }
            });
        };
        str = str.slice(1);
        str = str.slice(0, -1);
        str = unescapeHTML(str);
        return decode ? decodeURIComponent(str) : str;
    },

    validateInput: () => (event, str) => {
        var reg;
        switch (event) {
            case '@':
                reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                break;
        }
        if (reg.test(str)) {
            return true;
        }
        return false;
    },

    encodeHTML: (state) => (str) => {
        if (!str) return;
        var escapeChars = state.Chars[0];
        var regexString = '[';
        for (var key in escapeChars) {
            regexString += key;
        }
        regexString += ']';

        var regex = new RegExp(regexString, 'g');

        function escapeHTML(str) {
            return str.replace(regex, function(m) {
                return '&' + escapeChars[m] + ';';
            });
        };

        return encodeURIComponent(escapeHTML(str));
    },
    include: (state) => (event, name) => {
        var domain = state.settings.public.domain;
        if (event) {
            return `http://${domain}${state.pathDefaultImages}${name}`;
        }
        return `http://${domain}/upload/${name}`;
    },

    API: (state) => (url, callback, def = false) => {
        def = !def ? 'http://localhost/api/' + url : url;
        state.modal_Container = 'loaders';
        fetch(def).then(response => response.json())
            .then(data => callback(data));

    },

    remove: (state) => (arr, i) => {
        switch (arr) {
            case 'foods':
                state.foodsArr.splice(i, 1);
                break;
            case 'ingredient':
                state.ingredient.splice(i, 1);
                break;
            case 'sections':
                state.section.splice(i, 1);
                break;
            case 'section':
                state.tapObj.splice(i, 1);
                break;
            case (arr.match(/users|administrator|meal/) || {}).input:
                var object = arr == "meal" ? state.itemsMeal : state.users;
                if (state.search.length > 0) {
                    state.search.splice(i, 1);
                    for (let index in object) {
                        if (object[index].id == i) {
                            if (arr == "meal") {
                                state.itemsMeal.splice(index, 1);
                            } else {
                                state.users.splice(index, 1);
                            }
                        }
                    }
                    for (let index in state.search) {
                        if (state.search[index].id == i) {
                            state.search.splice(index, 1);
                        }
                    }
                } else {
                    if (arr == "meal") {
                        state.itemsMeal.splice(i, 1);
                    } else {
                        state.users.splice(i, 1);
                    }
                }
                break;
        }
    },
};

export default getters;