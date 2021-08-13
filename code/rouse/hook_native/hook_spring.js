/*
异或还原
明文 ^ 密钥 = 密文
密文 ^ 密钥 = 明文

明文16进制 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31

秘文进制 e0 6b 37 a1 75 d7 f6 d4 ef 19 c6 c3 57 a0 f9 b4 73 ee c8 d1 b3 30 1a 0a 09 52 06 8c 1f 7c

密钥 0x31 ^ 0xe0 以此类推

from base64 import b64decode
a = b64decode("5Gh2/y6Poq2/WIeLJfmh6yesnK7ndnJeWREFjRx8".encode()) -> 密文
print(a)

密文 ^ 密钥 = 明文
 */


// 指针 参数程序内改变，需要函数离开时在打印下这个指针
function hook_B90() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xB90 = libnative_addr.add(0xB90);
    console.log("addr_0xB90 ->", addr_0xB90)

    Interceptor.attach(addr_0xB90, {
        onEnter: function (args) {
            // 参数1 输入的明文
            this.args0 = args[0]
            // 参数2 明文的长度
            this.args1 = args[1]
            // 参数3 are you sure 字符串
            this.args2 = args[2]

            console.log("calling addr_0xB90")
            console.log("args1:", hexdump(args[0]))
            console.log("args2:", args[1].toInt32())
            console.log("args3:", Memory.readCString(args[2]))

        },
        onLeave: function (retval) {
            console.log("now is retval")
            // 原文 30个1 16进制31 31 31 31 31 31 31-> 秘文 e0 6b 37 a1 75 d7 f6 d4 ef 19 c
            // 此时数据已经改变
            console.log("args1:", hexdump(this.args0))
            console.log("args2:", this.args1)
            console.log("args3:", Memory.readCString(this.args2))
            console.log("retval", retval.toInt32())
        }
    })
}

function hook_D90() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xD90 = libnative_addr.add(0xD90);
    console.log("addr_0xD90 ->", addr_0xD90)

    Interceptor.attach(addr_0xD90, {
        onEnter: function (args) {
            console.log("calling addr_0xD90")
            this.args0 = args[0]
            // 参数1 异或后的明文
            console.log("args0:", Memory.readByteArray(args[0], 30))
            // 参数2 异或后的明文的长度
            console.log("args1:", args[1].toInt32())

        },
        onLeave: function (retval) {
            console.log("now is retval")
            // base64加密明文后的结果
            console.log("retval", Memory.readCString(retval))
            // args0没有变化
            console.log("args0", Memory.readByteArray(this.args0, 30))
        }
    })
}

function hook_x0() {
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0x8B0 = libnative_addr.add(0x8B0);
    /*
    inline hook 函数的参数寄存器地址，地址要写bl指令后面的函数地址，不能写寄存器的地址。
    BL              sub_B90                             地址为0x8B0
    ADD             X0, SP, #0xA0+palinText             地址为0x8B4
    BL              .strlen
    */
    console.log("addr_0x8B0 ->", addr_0x8B0)
    Interceptor.attach(addr_0x8B0, {
        onEnter: function (args) {
            console.log(Memory.readByteArray(this.context.x0, 50));
            // console.log(hexdump(this.c   ontext.x0));
        },
        onLeave: function (retval) {
        }
    })
}


function hook_x9() {
    // hook寄存器地址，得到对比的正确的base64
    var libnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libnative_addr)
    var addr_0xB30 = libnative_addr.add(0xB30);
    console.log("addr_0xB30 ->", addr_0xB30)
    Interceptor.attach(addr_0xB30, {
        onEnter: function (args) {
            console.log(Memory.readCString(this.context.x9));
            // console.log(Memory.readByteArray(this.context.x9, 50));
            // console.log(hexdump(this.context.x9));
        },
        onLeave: function (retval) {
        }
    })
}


var destAddr = '';  //定位xsp地址

function hook_x9_v2() {
    var so_addr = Module.findBaseAddress("libnative-lib.so");
    if (so_addr) {
        console.log("so_addr:", so_addr);

        var addr_b90 = so_addr.add(0xB90);
        /*
        我们知道v29是xsp+0h，而dest是xsp+38h，而dest又作为参数传入了sub_b90，这里我直接hook sub_b90，得到xsp+38h，
        然后再在v29初始化结束之后输出xsp的值：xsp+38h的地址减去0x38，即可得到v29。
        sub_B90的参数1为输入明文，点击第一个参数会显示[xsp+38h]
        */
        var sub_b90 = new NativeFunction(addr_b90, 'int', ['pointer', 'int', 'pointer']);
        Interceptor.attach(sub_b90, {
            onEnter: function (args) {
                destAddr = args[0];
                console.log('onEnter B90');
                console.log(Memory.readCString(destAddr))
            },
            //在hook函数之后执行的语句
            onLeave: function (retval) {
                console.log('onLeave B90');
            }
        });

        // v29初始化结束，任何一个地方都行
        var addr_b2c = so_addr.add(0xb2c);
        console.log("The addr_b2c:", addr_b2c);
        Java.perform(function () {
            Interceptor.attach(addr_b2c, {
                onEnter: function (args) {
                    console.log("addr_b2c OnEnter :", Memory.readByteArray(destAddr.sub(0x38), 64));
                }
            })
        })
    }
}


function hook_D58() {
    Java.perform(function () {
        var libnative = Module.findBaseAddress("libnative-lib.so");
        console.log("libnative: " + libnative);
        // 获取异或的字节，开了会报错，但是可以获取
        var ishook = true;
        var EOR = libnative.add(0xD58);
        var eor = [];
        var eorlen = 0;
        Interceptor.attach(EOR, {
            onEnter: function (args) {
                if (ishook) {
                        if (eorlen < 30) {
                        eor.push(this.context.x12);
                        eorlen += 1;
                    } else {
                        ishook = false;
                        console.log(eor);
                    }
                }
            }
        })
    })
}

function main() {
    hook_x9()
    hook_D58()
}


setImmediate(main)