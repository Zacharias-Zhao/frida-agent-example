function frida_NativePointer() {
    Java.perform(function () {
        console.log("");
        //拿到libc.so在内存中的地址
        var pointer = Process.findModuleByName("libc.so").base;

        //读取从pointer地址开始的16个字节
        console.log(pointer.readByteArray(0x10)); // 7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00
        // 从此内存位置读取指针，前四个字节的内容转成地址产生一个新的指针
        console.log("readPointer():" + pointer.readPointer()); // 0x464c457f
        console.log("pointer :" + pointer); //0xe9b47000
        const r = Memory.alloc(4); //分配四个字节的空间地址
        r.writePointer(pointer);
        var buffer = Memory.readByteArray(r, 4);
        console.log(buffer); // 00 70 b4 e
    });
}

setImmediate(frida_NativePointer, 0);