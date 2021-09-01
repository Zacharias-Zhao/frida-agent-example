function hookxPre() {
    Java.perform(function () {
        var AuthorizeHelper = Java.use("com.mfw.tnative.AuthorizeHelper");
        AuthorizeHelper.xPreAuthencode.implementation = function (v1, v2, v3) {
            console.log("v1:", v1)
            console.log("v2:", v2)
            console.log("v3:", v3)
            var result = this.xPreAuthencode(v1, v2, v3)
            console.log("result", result)
            return result
        }
    });
}

function hook_sub_312E0() {
    var libbili_addr = Module.findBaseAddress('libmfw.so');
    console.log("so base address ->", libbili_addr)
    var addr_0x312E0 = libbili_addr.add(0x312E0 + 1);
    console.log("addr_0x312E0 ->", addr_0x312E0)

    Interceptor.attach(addr_0x312E0, {
        onEnter: function (args) {
            console.log("calling addr_0x312E0")
            console.log("args0:", hexdump(args[0]))
            // args[1] is buffer/指针 此时为空，用来存储数据
            this.buffer = args[1]
            console.log("args1:", hexdump(this.buffer))
            console.log("args2:", args[2].toInt32())
        },
        onLeave: function (retval) {
            console.log("function is leaving")
            // buffer 存放结果
            console.log("args1:", hexdump(this.buffer))
        }
    })
}


function call_312E0() {
    var libbili_addr = Module.findBaseAddress('libmfw.so');
    console.log("so base address ->", libbili_addr)
    var addr_0x1C96 = libbili_addr.add(0x312E1);
    console.log("addr_0xB90 ->", addr_0x1C96)

    var FunctionName = new NativeFunction(addr_0x1C96, 'int', ['pointer', 'pointer', 'int']);
    var input = "heyhu"
    var args0 = Memory.allocUtf8String(input)
    var args1 = Memory.alloc(0x40)
    var args2 = input.length
    console.log("input.length:", input.length)
    FunctionName(args0, args1, args2)
    console.log(hexdump(args1))
}

/*
有时候数据不一定看数据的字符串显示, 也可以看中间的数据的hex16进制表示 比如hash算法的结果
e2e5fd90  ee d6 b5 eb 49 a6 9a fd 01 b6 df 52 9e 5c dd 79  ....I......R.\.y
e2e5fda0  68 42 72 6e 00 00 00 00 00 00 00 00 00 00 00 00  hBrn............
 */

function main() {
    hook_sub_312E0()
    call_312E0()
}

setImmediate(main)