function setcookie(n, v, e) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * e * 60 * 60 * 1e3);
    var expires = "; expires=" + d.toUTCString();
    console.log(expires), document.cookie = n + "=" + v + expires + ";path=/"
}

function getAPI() {
    return "http://monita.pelindo.co.id:1336"
}

function getWS() {
    return "ws://monita.pelindo.co.id:1234"
}

function cookiename() {
    return "marine"
}

function getCookie(cname) {
    for (var name = cname + "=", ca = document.cookie.split(";"), panj = name.length, i = 0; i < ca.length; i++) {
        for (var c = ca[i];
            " " == c.charAt(0);) return c = c.substring(name.length + 1);
        if (0 == c.indexOf(name)) return c.substring(name.length, c.length)
    }
    return ""
}

function getDataCookies(cname) {
    console.log(cname);
    var hsl = getCookie(cname),
        dt;
    return JSON.parse(atob(hsl))
}

function getTimeZone() {
    var d, tz = (new Date).getTimezoneOffset(),
        tanda = tz < 0 ? "+" : "-",
        a = Math.abs(tz / 60);
    return a = a = a < 10 ? tanda + "0" + a + ":00" : tanda + a + ":00"
}

function encodeMD5(str) {
    var xl, rotateLeft = function (lValue, iShiftBits) {
            return lValue << iShiftBits | lValue >>> 32 - iShiftBits
        },
        addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            return lX8 = 2147483648 & lX, lY8 = 2147483648 & lY, lResult = (1073741823 & lX) + (1073741823 & lY), (lX4 = 1073741824 & lX) & (lY4 = 1073741824 & lY) ? 2147483648 ^ lResult ^ lX8 ^ lY8 : lX4 | lY4 ? 1073741824 & lResult ? 3221225472 ^ lResult ^ lX8 ^ lY8 : 1073741824 ^ lResult ^ lX8 ^ lY8 : lResult ^ lX8 ^ lY8
        },
        _F = function (x, y, z) {
            return x & y | ~x & z
        },
        _G = function (x, y, z) {
            return x & z | y & ~z
        },
        _H = function (x, y, z) {
            return x ^ y ^ z
        },
        _I = function (x, y, z) {
            return y ^ (x | ~z)
        },
        _FF = function (a, b, c, d, x, s, ac) {
            return a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac)), addUnsigned(rotateLeft(a, s), b)
        },
        _GG = function (a, b, c, d, x, s, ac) {
            return a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac)), addUnsigned(rotateLeft(a, s), b)
        },
        _HH = function (a, b, c, d, x, s, ac) {
            return a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac)), addUnsigned(rotateLeft(a, s), b)
        },
        _II = function (a, b, c, d, x, s, ac) {
            return a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac)), addUnsigned(rotateLeft(a, s), b)
        },
        convertToWordArray, wordToHex = function (lValue) {
            var wordToHexValue = "",
                wordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) wordToHexValue += (wordToHexValue_temp = "0" + (lByte = lValue >>> 8 * lCount & 255).toString(16)).substr(wordToHexValue_temp.length - 2, 2);
            return wordToHexValue
        },
        x = [],
        k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21,
        temp;
    for (a = 1732584193, b = 4023233417, c = 2562383102, d = 271733878, xl = (x = function (str) {
            for (var lWordCount, lMessageLength = str.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2, lNumberOfWords = 16 * ((lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64 + 1), lWordArray = new Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0; lByteCount < lMessageLength;) lBytePosition = lByteCount % 4 * 8, lWordArray[lWordCount = (lByteCount - lByteCount % 4) / 4] = lWordArray[lWordCount] | str.charCodeAt(lByteCount) << lBytePosition, lByteCount++;
            return lBytePosition = lByteCount % 4 * 8, lWordArray[lWordCount = (lByteCount - lByteCount % 4) / 4] = lWordArray[lWordCount] | 128 << lBytePosition, lWordArray[lNumberOfWords - 2] = lMessageLength << 3, lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29, lWordArray
        }(str)).length, k = 0; k < xl; k += 16) AA = a, BB = b, CC = c, DD = d, a = _FF(a, b, c, d, x[k + 0], 7, 3614090360), d = _FF(d, a, b, c, x[k + 1], 12, 3905402710), c = _FF(c, d, a, b, x[k + 2], 17, 606105819), b = _FF(b, c, d, a, x[k + 3], 22, 3250441966), a = _FF(a, b, c, d, x[k + 4], 7, 4118548399), d = _FF(d, a, b, c, x[k + 5], 12, 1200080426), c = _FF(c, d, a, b, x[k + 6], 17, 2821735955), b = _FF(b, c, d, a, x[k + 7], 22, 4249261313), a = _FF(a, b, c, d, x[k + 8], 7, 1770035416), d = _FF(d, a, b, c, x[k + 9], 12, 2336552879), c = _FF(c, d, a, b, x[k + 10], 17, 4294925233), b = _FF(b, c, d, a, x[k + 11], 22, 2304563134), a = _FF(a, b, c, d, x[k + 12], 7, 1804603682), d = _FF(d, a, b, c, x[k + 13], 12, 4254626195), c = _FF(c, d, a, b, x[k + 14], 17, 2792965006), a = _GG(a, b = _FF(b, c, d, a, x[k + 15], 22, 1236535329), c, d, x[k + 1], 5, 4129170786), d = _GG(d, a, b, c, x[k + 6], 9, 3225465664), c = _GG(c, d, a, b, x[k + 11], 14, 643717713), b = _GG(b, c, d, a, x[k + 0], 20, 3921069994), a = _GG(a, b, c, d, x[k + 5], 5, 3593408605), d = _GG(d, a, b, c, x[k + 10], 9, 38016083), c = _GG(c, d, a, b, x[k + 15], 14, 3634488961), b = _GG(b, c, d, a, x[k + 4], 20, 3889429448), a = _GG(a, b, c, d, x[k + 9], 5, 568446438), d = _GG(d, a, b, c, x[k + 14], 9, 3275163606), c = _GG(c, d, a, b, x[k + 3], 14, 4107603335), b = _GG(b, c, d, a, x[k + 8], 20, 1163531501), a = _GG(a, b, c, d, x[k + 13], 5, 2850285829), d = _GG(d, a, b, c, x[k + 2], 9, 4243563512), c = _GG(c, d, a, b, x[k + 7], 14, 1735328473), a = _HH(a, b = _GG(b, c, d, a, x[k + 12], 20, 2368359562), c, d, x[k + 5], 4, 4294588738), d = _HH(d, a, b, c, x[k + 8], 11, 2272392833), c = _HH(c, d, a, b, x[k + 11], 16, 1839030562), b = _HH(b, c, d, a, x[k + 14], 23, 4259657740), a = _HH(a, b, c, d, x[k + 1], 4, 2763975236), d = _HH(d, a, b, c, x[k + 4], 11, 1272893353), c = _HH(c, d, a, b, x[k + 7], 16, 4139469664), b = _HH(b, c, d, a, x[k + 10], 23, 3200236656), a = _HH(a, b, c, d, x[k + 13], 4, 681279174), d = _HH(d, a, b, c, x[k + 0], 11, 3936430074), c = _HH(c, d, a, b, x[k + 3], 16, 3572445317), b = _HH(b, c, d, a, x[k + 6], 23, 76029189), a = _HH(a, b, c, d, x[k + 9], 4, 3654602809), d = _HH(d, a, b, c, x[k + 12], 11, 3873151461), c = _HH(c, d, a, b, x[k + 15], 16, 530742520), a = _II(a, b = _HH(b, c, d, a, x[k + 2], 23, 3299628645), c, d, x[k + 0], 6, 4096336452), d = _II(d, a, b, c, x[k + 7], 10, 1126891415), c = _II(c, d, a, b, x[k + 14], 15, 2878612391), b = _II(b, c, d, a, x[k + 5], 21, 4237533241), a = _II(a, b, c, d, x[k + 12], 6, 1700485571), d = _II(d, a, b, c, x[k + 3], 10, 2399980690), c = _II(c, d, a, b, x[k + 10], 15, 4293915773), b = _II(b, c, d, a, x[k + 1], 21, 2240044497), a = _II(a, b, c, d, x[k + 8], 6, 1873313359), d = _II(d, a, b, c, x[k + 15], 10, 4264355552), c = _II(c, d, a, b, x[k + 6], 15, 2734768916), b = _II(b, c, d, a, x[k + 13], 21, 1309151649), a = _II(a, b, c, d, x[k + 4], 6, 4149444226), d = _II(d, a, b, c, x[k + 11], 10, 3174756917), c = _II(c, d, a, b, x[k + 2], 15, 718787259), b = _II(b, c, d, a, x[k + 9], 21, 3951481745), a = addUnsigned(a, AA), b = addUnsigned(b, BB), c = addUnsigned(c, CC), d = addUnsigned(d, DD);
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
}
var data = [],
    listPoint = [];

function Crawler(id, tree) {
    return data = [], listPoint = [], run(id, tree)
}

function run(id, tree) {
    return data = [], listPoint = [], getSameId(id, tree), data ? (getLastChildren(id, data), listPoint ? Promise.resolve(listPoint) : void 0) : Promise.reject(null)
}

function getLastChildren(id, dataFiletered) {
    this.data = [];
    let hasChildren = !1;
    if (dataFiletered.forEach(el => {
            el.children ? (this.data.push(...el.children), hasChildren = !0) : (listPoint.push(el), this.data.length > 0 && (hasChildren = !0))
        }), !hasChildren) return console.log(listPoint.length), !0;
    getLastChildren(id, this.data)
}

function getSameId(id, record) {
    let currentIndex = 0,
        gotcha = 0,
        hasChildren = !1;
    if (this.cdata = [], record.forEach((el, i) => {
            el.id == id ? (gotcha = 1, data.push(el), this.cdata.length > 0 && (hasChildren = !0)) : (el.children && this.cdata.push(...el.children), hasChildren = !0)
        }), !hasChildren) return !0;
    getSameId(id, this.cdata)
}