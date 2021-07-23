// 8.9.9 and 8.0.0.15
function hook_decrypt() {
    Java.perform(function x() {
            console.log("java perform");
            var Util4Common = Java.use("com.tencent.qqmusiccommon.util.Util4Common");
            Util4Common.decryptData.overload('[B', 'int').implementation = function (v1, v2) {
                console.log("v2:" + v2);
                var result = this.decryptData(v1, v2);
                console.log("result:" + bytesToString(result));
                return result
            };
        }
    );
}

function bytesToString(arr) {
    var str = '';
    arr = new Uint8Array(arr);
    for (var i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;

}

setImmediate(hook_decrypt);
