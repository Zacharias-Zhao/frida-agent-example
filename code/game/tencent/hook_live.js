function dumpByteArray(obj) {
    // 使用hex打印java层的byte数组
    console.log("---------dumpByteArray start---------");
    let obj_ptr = ptr(obj.$h).readPointer();
    let buf_ptr = obj_ptr.add(Process.pointerSize * 3);
    let size = obj_ptr.add(Process.pointerSize * 2).readU32();
    console.log(hexdump(buf_ptr, {offset: 0, length: size, header: false, ansi: false}));
    console.log("---------dumpByteArray end---------");
}

function jhexdump(array) {
    if (!array) return;
    console.log("---------jhexdump start---------");
    var ptr = Memory.alloc(array.length);
    for (var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    console.log(hexdump(ptr, {offset: 0, length: array.length, header: false, ansi: false}));
    console.log("---------jhexdump end---------");
}

function jbhexdump(array) {
    console.log("---------jbhexdump start---------");
    let env = Java.vm.getEnv();
    let size = env.getArrayLength(array);
    let data = env.getByteArrayElements(array, 0);
    console.log(hexdump(data, {offset: 0, length: size, header: false, ansi: false}));
    env.releaseByteArrayElements(array, data, 0);
    console.log("---------jbhexdump end---------");
}

function getByte_LogArgs() {
    Java.perform(function () {
        let gson = Java.use('com.google.gson.Gson');
        let ByteDataCls = Java.use("com.tencent.starprotocol.ByteData");
        ByteDataCls.getByte.overload("android.content.Context", "long", "long", "long", "long", "java.lang.Object", "java.lang.Object", "java.lang.Object", "java.lang.Object").implementation = function (context, num1, num2, num3, num4, obj1, obj2, obj3, obj4) {
            console.log(context, num1, num2, num3, num4);
            console.log("obj1", obj1.$className, gson.$new().toJson(obj1))
            console.log("obj2", obj2.$className, gson.$new().toJson(obj2))
            console.log("obj3", obj3.$className, gson.$new().toJson(obj3))
            console.log("obj4", obj4.$className, gson.$new().toJson(obj4))
            dumpByteArray(obj4)
            let resp = this.getByte(context, num1, num2, num3, num4, obj1, obj2, obj3, obj4)
            // hexdump [object, objectc]
            console.log(hexdump(resp.readPointer()))
            return resp
        }
    })
}

function freeze_funcs() {
    let lrand48_addr = Module.findExportByName("libc.so", "lrand48");
    Interceptor.attach(lrand48_addr, {
        onLeave: function (retval) {
            retval.replace(7)
        }
    });
    let tm_s = 1626403551;
    let tm_us = 5151606;
    let gettimeofday_addr = Module.findExportByName("libc.so", "gettimeofday");
    Interceptor.attach(gettimeofday_addr, {
        onEnter: function (args) {
            this.tm_ptr = args[0];
        },
        onLeave: function (retval) {
            this.tm_ptr.writeLong(tm_s);
            // 0x4? why
            this.tm_ptr.add(0x4).writeLong(tm_us);
        }
    });
}

function call_getByte() {
    Java.perform(function () {
        let LongCls = Java.use("java.lang.Long");
        let StringCls = Java.use("java.lang.String");
        // 字符串数组
        let ReflectArrayCls = Java.use('java.lang.reflect.Array')
        let ByteDataCls = Java.use("com.tencent.starprotocol.ByteData");
        let ctx = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        let num_1 = LongCls.$new(1).longValue();
        let num_2 = LongCls.$new(0).longValue();
        let num_3 = LongCls.$new(0).longValue();
        let num_4 = LongCls.$new(0).longValue();
        let obj1 = ReflectArrayCls.newInstance(StringCls.class, 9);
        ReflectArrayCls.set(obj1, 0, "dl_10303");
        ReflectArrayCls.set(obj1, 1, "1");
        ReflectArrayCls.set(obj1, 2, "66666666666666666666666666666666");
        ReflectArrayCls.set(obj1, 3, "getCKey");
        ReflectArrayCls.set(obj1, 4, "888888888888888888888888888888888888");
        ReflectArrayCls.set(obj1, 5, "1626403551515");
        ReflectArrayCls.set(obj1, 6, "");
        ReflectArrayCls.set(obj1, 7, "8.3.95.26016");
        ReflectArrayCls.set(obj1, 8, "com.tencent.qqlive");
        let obj2 = StringCls.$new("");
        let obj3 = StringCls.$new("66666666666666666666666666666666");
        // byte数组
        let obj4 = Java.array('B', [49, 54, 50, 54, 52, 48, 51, 53, 53, 49, 44, 110, 48, 48, 51, 57, 101, 121, 49, 109, 109, 100, 44, 110, 117, 108, 108]);
        let ByteDataIns = ByteDataCls.getInstance()
        let byte = ByteDataIns.getByte(ctx, num_1, num_2, num_3, num_4, obj1, obj2, obj3, obj4);
        // jhexdump(byte)
        Interceptor.detachAll();
    })
}

function inline_hook() {
    let base_addr = Module.getBaseAddress("libpoxy_star.so");
    Interceptor.attach(base_addr.add(0xD9AC).add(1), {
        onLeave: function (retval) {
            console.log(`onLeave sub_D9AC`);
            jbhexdump(retval)
        }
    });
}

function main() {
    freeze_funcs()
    inline_hook()
    call_getByte()
}

setImmediate(main);