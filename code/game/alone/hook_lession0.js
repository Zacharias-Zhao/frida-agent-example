// 6.18.0
function hookSigned() {
    Java.perform(function () {
        var ClassName = "com.bilibili.nativelibrary.SignedQuery";
        var Bilibili = Java.use(ClassName);
        Bilibili.$init.implementation = function (v1, v2) {
            console.log(v1)
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            this.$init(v1, v2)
        }
    });
}

function hookSignedR() {
    Java.perform(function () {
        var ClassName = "com.bilibili.nativelibrary.SignedQuery";
        Java.openClassFile("/data/local/tmp/r0gson.dex").load();
        const gson = Java.use('com.r0ysue.gson.Gson');
        var Bilibili = Java.use(ClassName);
        Bilibili.r.implementation = function (v1) {
            console.log("v1:" + gson.$new().toJson(v1))
            var result = this.r(v1)
            console.log("result", result)
        }
    });
}


// 使用Frida主动调用这个函数，而不是每次依靠对App进行点击/滑动操作来触发此函数。
// 防止使用trace类脚本时, 手机Native函数与JAVA层的交互尤其频繁导致打印出一些无用的参数。
function callFunction() {
    Java.perform(function () {
        var ClassName = "com.bilibili.nativelibrary.LibBili";
        var Bilibili = Java.use(ClassName);
        var TreeMap = Java.use("java.util.TreeMap");
        var map = TreeMap.$new();

        map.put("appkey", "1d8b6e7d45233436");
        map.put("autoplay_card", "11");
        map.put("banner_hash", "10687342131252771522");
        map.put("build", "6180500");
        map.put("c_locale", "zh_CN");
        map.put("channel", "shenma117");
        map.put("column", "2");
        map.put("device_name", "MIX2S");
        map.put("device_type", "0");
        map.put("flush", "6");
        map.put("ts", "1612693177");

        var result = Bilibili.s(map);
        // 打印结果，不需要做什么额外处理，这儿会隐式调用toString。
        console.log("\n返回结果：", result);
        return result;
    });
}

function hook_update() {
    var libbili = Module.findBaseAddress("libbili.so");
    if (libbili) {
        // 0x22b0 是 MD5Update 函数的地址，+1是因为指令是thumb模式
        var md5_update = libbili.add(0x22b0 + 1);
        Interceptor.attach(md5_update, {
            onEnter: function (args) {
                // 这儿必须指定hexdump的length，hexdump默认长度256不足以显示全部内容
                // 参数0为存放结果的buffer指针，参数1为明文，参数2为明文的长度
                console.log("function is enter");
                this.buffer = args[0]
                console.log("buffer:\n", hexdump(this.buffer, {length: args[2].toInt32()}))
                console.log("args0:\n", Memory.readCString(args[1]));
            },
            onLeave: function (retval) {
                console.log("function is leaving");
                console.log("buffer:\n", hexdump(this.buffer))
            }
        })
    }
}


function main() {
    // hookSignedR()
    hook_update()    // 插桩so中的方法
    callFunction()   // 调用函数自然就会打印
}

setImmediate(main)