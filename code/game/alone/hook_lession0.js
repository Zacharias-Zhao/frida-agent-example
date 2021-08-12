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

        map.put("ad_extra", "E1133C23F36571A3F1FDE6B325B17419AAD45287455E5292A19CF51300EAF0F2664C808E2C407FBD9E50BD48F8ED17334F4E2D3A07153630BF62F10DC5E53C42E32274C6076A5593C23EE6587F453F57B8457654CB3DCE90FAE943E2AF5FFAE78E574D02B8BBDFE640AE98B8F0247EC0970D2FD46D84B958E877628A8E90F7181CC16DD22A41AE9E1C2B9CB993F33B65E0B287312E8351ADC4A9515123966ACF8031FF4440EC4C472C78C8B0C6C8D5EA9AB9E579966AD4B9D23F65C40661A73958130E4D71F564B27C4533C14335EA64DD6E28C29CD92D5A8037DCD04C8CCEAEBECCE10EAAE0FAC91C788ECD424D8473CAA67D424450431467491B34A1450A781F341ABB8073C68DBCCC9863F829457C74DBD89C7A867C8B619EBB21F313D3021007D23D3776DA083A7E09CBA5A9875944C745BB691971BFE943BD468138BD727BF861869A68EA274719D66276BD2C3BB57867F45B11D6B1A778E7051B317967F8A5EAF132607242B12C9020328C80A1BBBF28E2E228C8C7CDACD1F6CC7500A08BA24C4B9E4BC9B69E039216AA8B0566B0C50A07F65255CE38F92124CB91D1C1C39A3C5F7D50E57DCD25C6684A57E1F56489AE39BDBC5CFE13C540CA025C42A3F0F3DA9882F2A1D0B5B1B36F020935FD64D58A47EF83213949130B956F12DB92B0546DADC1B605D9A3ED242C8D7EF02433A6C8E3C402C669447A7F151866E66383172A8A846CE49ACE61AD00C1E42223");
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
                this.buffer = args[0]
                console.log("buffer:", hexdump(this.buffer))
                console.log("args0:", hexdump(args[1], {length: args[2].toInt32()}));
            },
            onLeave: function (retval) {
                console.log("function is leaving");
                console.log("buffer:", hexdump(this.buffer))
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