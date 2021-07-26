// 32位寄存器位R 64位寄存器为X
// com.yaotong.crackme

function hook_content() {
    // hook寄存器地址，得到对比的正确的base64
    var libcrackme_addr = Module.findBaseAddress('libcrackme.so');
    console.log("so base address ->", libcrackme_addr)
    var addr_0x12A8 = libcrackme_addr.add(0x12A8);
    console.log("addr_0x12A8 ->", addr_0x12A8)
    Interceptor.attach(addr_0x12A8, {
        onEnter: function (args) {
            console.log(JSON.stringify(this.context))
            console.log(Memory.readCString(this.context.r2));
        },
        onLeave: function (retval) {
        }
    })
}

// ----------------------------------crack2---------------------------------------------


function hook_str() {
    var str_addr = Module.findExportByName("libc.so", "strstr")
    console.log("str_addr address ->", str_addr)
    Interceptor.attach(str_addr, {
        onEnter: function (args) {
            console.log("str1", args[0], "str2", Memory.readCString(args[1]))
        },
        onLeave: function (retval) {
        }
    })
}

function replace_str() {
    var str_addr = Module.findExportByName("libc.so", "strstr")
    var strstr = new NativeFunction(str_addr, 'pointer', ['pointer', 'pointer']);
    // 方法参数替换
    Interceptor.replace(strstr, new NativeCallback(function (args1, args2) {
        var retval = strstr(args1, args2);
        if (Memory.readCString(args2) === "frida") {
            return null;
        } else {
            return retval
        }
    }, 'pointer', ['pointer', 'pointer']));

}

/*
&unk_50B0; 被ollvm混淆过直接读取地址查看内存被解密过后的字符串，地址为unk后面的地址，或者点进去看，那么此例子为0x50B0
v16 = aGlago; 点进去看：.data:0000509D aGlago   DCB "GLAGO",0x24,0
 */
function decrypt_str(address) {
    var native_addr = Module.findBaseAddress('libnative-lib.so');
    var encrypt_address = native_addr.add(address)
    console.log("decrypt str:->", ptr(encrypt_address).readCString())
}

function call_function(s) {
    Java.perform(function () {
        var mainClass = Java.use("com.kanxue.reflectiontest.MainActivity")
        var str = Java.use("java.lang.String").$new(s)
        var result = mainClass.check(str)
        console.log("result", result)
        return result
    })
}

// ----------------------------------拓展---------------------------------------------

function patch_crack() {
    var libcrackme_addr = Module.findBaseAddress('libcrackme.so');
    var left = libcrackme_addr.add(0x12A8);
    console.log("left address ->", left)
    console.log("left ->", hexdump(left))

    var maxPatchSize = 64;
    Memory.patchCode(left, maxPatchSize, function (code) {
        console.log("code", code)
        var cw = new ArmWriter(code, {pc: left});
        cw.putBytes([
            0x7a, 0x68, 0x61, 0x6f,
            0x73, 0x68, 0x6f, 0x75,
            0x78, 0x69, 0x6e, 0x6e
        ]);
        cw.flush()
    });

    console.log("addr_0x12A8_after ->", Memory.readCString(left))
}

function main() {
    replace_str()
    call_function("kanxue00000000000000")
    decrypt_str(0x5100)
}

setImmediate(main)