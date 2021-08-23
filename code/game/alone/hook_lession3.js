function callSign() {
    Java.perform(function () {
        var NetCrypto = Java.use("com.izuiyou.network.NetCrypto");
        var JavaString = Java.use("java.lang.String");

        var plainText = "r0ysue";
        var plainTextBytes = JavaString.$new(plainText).getBytes("UTF-8");

        var result = NetCrypto.a("12345", plainTextBytes);
        console.log(result);
    });
}

function inline_hook() {
    var libcrypto_addr = Module.findBaseAddress('libnet_crypto.so');
    console.log("so base address ->", libcrypto_addr)
    var address_addr = libcrypto_addr.add(0x65541);
    console.log("address_addr ->", address_addr)
    Interceptor.attach(address_addr, {
        onEnter: function (args) {
            // console.log('called from:\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
            this.args0 = args[0]
            this.args1 = args[1]
            this.args2 = args[2]
            this.r2 = this.context.r2
            console.log("inline hook inner")
            console.log("args0:\n", hexdump(this.args0));
            console.log("args1:\n", this.args1.toInt32());
            console.log("args2:\n", hexdump(this.args2));
        },
        onLeave: function (retval) {
            console.log("now is retval")
            console.log("args0:\n", hexdump(this.args0));
            console.log("args1:\n", this.args1.toInt32());
            console.log("args2:\n", hexdump(this.args2));
            console.log("r2:\n", hexdump(this.r2));
        }
    })
}

function call_65540() {
    var base_addr = Module.findBaseAddress("libnet_crypto.so");
    // 函数在内存中的地址
    var real_addr = base_addr.add(0x65541)
    var md5_function = new NativeFunction(real_addr, "int", ["pointer", "int", "pointer"])
    // 参数1 明文字符串的指针
    var input = "r0ysue";
    var arg1 = Memory.allocUtf8String(input);
    // 参数2 明文长度
    var arg2 = input.length;
    // 参数3，存放结果的buffer
    var arg3 = Memory.alloc(16);
    md5_function(arg1, arg2, arg3);
    console.log(hexdump(arg3, {length: 0x10}));
}


function main() {
    inline_hook()
    callSign()
}

setImmediate(main)