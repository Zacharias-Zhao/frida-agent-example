// version 10.11.5.11

// com.tencent.qqmusicplayerprocess.network.a.a.b$b.b -> 返回值
function hook_network_base() {
    Java.perform(function () {
        console.log("hook starting....")
         var String = Java.use('java.lang.String')
        Java.choose('com.tencent.qqmusicplayerprocess.network.base.a', {
            onMatch: function (instance) {
                console.log("instance.value:=>", String.$new(instance.b.value))
            },
            onComplete() {
            }
        })
    })
}


function hook_parser() {
    Java.perform(function () {
        console.log("hook starting....")
        var paserClass = Java.use("com.tencent.qqmusiccommon.util.parser.b")
        paserClass.a.overload('com.google.gson.JsonObject', 'java.lang.String', 'int').implementation = function (v1, v2, v3) {
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            console.log("v1:->", v1)
            var result = this.a(v1, v2, v3);
            return result
        }
    })
}


function hook_cgi_response() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusiccommon.cgi.response.b.a")
        nameClass.a.overload('[B', 'com.tencent.qqmusiccommon.cgi.a.a.c').implementation = function (v1, v2) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            console.log("v1:->", String.$new(v1))
            var result = this.a(v1, v2);
            return result
        }
    })
}


function hook_cgi_abc() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusiccommon.cgi.a.b.c")
        nameClass.a.overload('[B', 'com.tencent.qqmusiccommon.cgi.a.a.c').implementation = function (v1, v2) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            console.log("v1:->", String.$new(v1))
            var result = this.a(v1, v2);
            return result
        }
    })
}

function hook_cgi_response_a() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusiccommon.cgi.response.a")
        nameClass.a.overload('[B', 'com.tencent.qqmusiccommon.cgi.a.a.c').implementation = function (v1, v2) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 如果能转成字符串就是解密后的明文，也就是decode
            // 返回的是明文 此时已经被解密
            console.log("v1:->", String.$new(v1))
            var result = this.a(v1, v2);
            return result
        }
    })
}

function hook_network_agf() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusicplayerprocess.network.a.g")
        nameClass.f.overload('com.tencent.qqmusicplayerprocess.network.d').implementation = function (v1) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 返回的是明文 此时已经被解密
            console.log("v1:->", String.$new(v1.a()))
            var result = this.f(v1);
            return result
        }
    })
}

function hook_network_aga() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusicplayerprocess.network.a.g")
        nameClass.a.overload('com.tencent.qqmusicplayerprocess.network.base.a').implementation = function (v1) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 返回的是明文 此时已经被解密
            console.log("v1:->", v1)
            var result = this.a(v1);
            return result
        }
    })
}

function hook_network_ab() {
    Java.perform(function () {
        console.log("hook starting....")
        var String = Java.use('java.lang.String')
        var nameClass = Java.use("com.tencent.qqmusicplayerprocess.network.a.b")
        nameClass.a.overload('[B', 'int').implementation = function (v1, v2) {
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            // 秘文 can't decode byte
            console.log("v1:->", String.$new(v1))
            console.log("v1:->", v2)
            var result = this.a(v1, v2);
            console.log("result:", String.$new(result))
            return result
        }
    })
}

function main() {
    // hook_network_base()
    // hook_parser()
    // hook_cgi_response()
    //hook_cgi_abc()
    // hook_cgi_response_a()
    // hook_network_agf()
    // hook_network_aga()
    hook_network_ab()
}

setImmediate(main)