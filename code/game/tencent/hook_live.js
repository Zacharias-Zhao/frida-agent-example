function jhexdump(array) {
    if (!array) return;
    console.log("---------jhexdump start---------");
    var ptr = Memory.alloc(array.length);
    for (var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    console.log(hexdump(ptr, {offset: 0, length: array.length, header: false, ansi: false}));
    console.log("---------jhexdump end---------");
}

function dumpByteArray(obj) {
    console.log("---------dumpByteArray start---------");
    let obj_ptr = ptr(obj.$h).readPointer();
    let buf_ptr = obj_ptr.add(Process.pointerSize * 3);
    let size = obj_ptr.add(Process.pointerSize * 2).readU32();
    console.log(hexdump(buf_ptr, {offset: 0, length: size, header: false, ansi: false}));
    console.log("---------dumpByteArray end---------");
}

function getByte_LogArgs() {
    Java.perform(function () {
        var gson = Java.use('com.google.gson.Gson');
        var ByteDataCls = Java.use("com.tencent.starprotocol.ByteData");
        ByteDataCls.getByte.overload("android.content.Context", "long", "long", "long", "long", "java.lang.Object", "java.lang.Object", "java.lang.Object", "java.lang.Object").implementation = function (context, num1, num2, num3, num4, obj1, obj2, obj3, obj4) {
            console.log(context, num1, num2, num3, num4);
            console.log("obj1", obj1.$className, gson.$new().toJson(obj1))
            console.log("obj2", obj2.$className, gson.$new().toJson(obj2))
            console.log("obj3", obj3.$className, gson.$new().toJson(obj3))
            console.log("obj4", obj4.$className, gson.$new().toJson(obj4))
            dumpByteArray(obj4);
            var resp = this.getByte(context, num1, num2, num3, num4, obj1, obj2, obj3, obj4)
            jhexdump(resp);
            return resp
        }
    })
}

function main() {
    f()
}

setImmediate(main)
