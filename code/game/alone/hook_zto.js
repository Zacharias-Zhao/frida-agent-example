// version 10.07.2006121636
// 请求
function f() {
    Java.perform(function () {
        console.log("hook starting....")
        var ByteString = Java.use("com.android.okhttp.okio.ByteString");
        var nameClass = Java.use("zte.com.market.service.b.a.d")
        nameClass.e.implementation = function () {
            var result = this.e();
            console.log("result:", ByteString.of(result).hex());
            return result
        }
    })
}

// 响应
function x() {
    Java.perform(function () {
        var ByteString = Java.use("com.android.okhttp.okio.ByteString");
        var nameClass = Java.use("zte.com.market.service.b.a.a")
        nameClass.a.overload('[B').implementation = function (v1) {
            var result = this.a(v1);
            console.log("v1:->", v1);
            console.log("v1:", ByteString.of(v1).hex());
            console.log("result:->", result);
            return result
        }
    })
}


function main() {
    // x()
    // f()
}

setImmediate(main)