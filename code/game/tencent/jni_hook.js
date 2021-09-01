let jni_struct_array = [
    "reserved0", "reserved1", "reserved2", "reserved3", "GetVersion", "DefineClass", "FindClass", "FromReflectedMethod", "FromReflectedField", "ToReflectedMethod", "GetSuperclass", "IsAssignableFrom", "ToReflectedField", "Throw", "ThrowNew",
    "ExceptionOccurred", "ExceptionDescribe", "ExceptionClear", "FatalError", "PushLocalFrame", "PopLocalFrame", "NewGlobalRef", "DeleteGlobalRef", "DeleteLocalRef", "IsSameObject", "NewLocalRef", "EnsureLocalCapacity", "AllocObject", "NewObject",
    "NewObjectV", "NewObjectA", "GetObjectClass", "IsInstanceOf", "GetMethodID", "CallObjectMethod", "CallObjectMethodV", "CallObjectMethodA", "CallBooleanMethod", "CallBooleanMethodV", "CallBooleanMethodA", "CallByteMethod", "CallByteMethodV",
    "CallByteMethodA", "CallCharMethod", "CallCharMethodV", "CallCharMethodA", "CallShortMethod", "CallShortMethodV", "CallShortMethodA", "CallIntMethod", "CallIntMethodV", "CallIntMethodA", "CallLongMethod", "CallLongMethodV", "CallLongMethodA",
    "CallFloatMethod", "CallFloatMethodV", "CallFloatMethodA", "CallDoubleMethod", "CallDoubleMethodV", "CallDoubleMethodA", "CallVoidMethod", "CallVoidMethodV", "CallVoidMethodA", "CallNonvirtualObjectMethod", "CallNonvirtualObjectMethodV",
    "CallNonvirtualObjectMethodA", "CallNonvirtualBooleanMethod", "CallNonvirtualBooleanMethodV", "CallNonvirtualBooleanMethodA", "CallNonvirtualByteMethod", "CallNonvirtualByteMethodV", "CallNonvirtualByteMethodA", "CallNonvirtualCharMethod",
    "CallNonvirtualCharMethodV", "CallNonvirtualCharMethodA", "CallNonvirtualShortMethod", "CallNonvirtualShortMethodV", "CallNonvirtualShortMethodA", "CallNonvirtualIntMethod", "CallNonvirtualIntMethodV", "CallNonvirtualIntMethodA",
    "CallNonvirtualLongMethod", "CallNonvirtualLongMethodV", "CallNonvirtualLongMethodA", "CallNonvirtualFloatMethod", "CallNonvirtualFloatMethodV", "CallNonvirtualFloatMethodA", "CallNonvirtualDoubleMethod", "CallNonvirtualDoubleMethodV",
    "CallNonvirtualDoubleMethodA", "CallNonvirtualVoidMethod", "CallNonvirtualVoidMethodV", "CallNonvirtualVoidMethodA", "GetFieldID", "GetObjectField", "GetBooleanField", "GetByteField", "GetCharField", "GetShortField", "GetIntField",
    "GetLongField", "GetFloatField", "GetDoubleField", "SetObjectField", "SetBooleanField", "SetByteField", "SetCharField", "SetShortField", "SetIntField", "SetLongField", "SetFloatField", "SetDoubleField", "GetStaticMethodID",
    "CallStaticObjectMethod", "CallStaticObjectMethodV", "CallStaticObjectMethodA", "CallStaticBooleanMethod", "CallStaticBooleanMethodV", "CallStaticBooleanMethodA", "CallStaticByteMethod", "CallStaticByteMethodV", "CallStaticByteMethodA",
    "CallStaticCharMethod", "CallStaticCharMethodV", "CallStaticCharMethodA", "CallStaticShortMethod", "CallStaticShortMethodV", "CallStaticShortMethodA", "CallStaticIntMethod", "CallStaticIntMethodV", "CallStaticIntMethodA", "CallStaticLongMethod",
    "CallStaticLongMethodV", "CallStaticLongMethodA", "CallStaticFloatMethod", "CallStaticFloatMethodV", "CallStaticFloatMethodA", "CallStaticDoubleMethod", "CallStaticDoubleMethodV", "CallStaticDoubleMethodA", "CallStaticVoidMethod",
    "CallStaticVoidMethodV", "CallStaticVoidMethodA", "GetStaticFieldID", "GetStaticObjectField", "GetStaticBooleanField", "GetStaticByteField", "GetStaticCharField", "GetStaticShortField", "GetStaticIntField", "GetStaticLongField",
    "GetStaticFloatField", "GetStaticDoubleField", "SetStaticObjectField", "SetStaticBooleanField", "SetStaticByteField", "SetStaticCharField", "SetStaticShortField", "SetStaticIntField", "SetStaticLongField", "SetStaticFloatField",
    "SetStaticDoubleField", "NewString", "GetStringLength", "GetStringChars", "ReleaseStringChars", "NewStringUTF", "GetStringUTFLength", "GetStringUTFChars", "ReleaseStringUTFChars", "GetArrayLength", "NewObjectArray", "GetObjectArrayElement",
    "SetObjectArrayElement", "NewBooleanArray", "NewByteArray", "NewCharArray", "NewShortArray", "NewIntArray", "NewLongArray", "NewFloatArray", "NewDoubleArray", "GetBooleanArrayElements", "GetByteArrayElements", "GetCharArrayElements",
    "GetShortArrayElements", "GetIntArrayElements", "GetLongArrayElements", "GetFloatArrayElements", "GetDoubleArrayElements", "ReleaseBooleanArrayElements", "ReleaseByteArrayElements", "ReleaseCharArrayElements", "ReleaseShortArrayElements",
    "ReleaseIntArrayElements", "ReleaseLongArrayElements", "ReleaseFloatArrayElements", "ReleaseDoubleArrayElements", "GetBooleanArrayRegion", "GetByteArrayRegion", "GetCharArrayRegion", "GetShortArrayRegion", "GetIntArrayRegion",
    "GetLongArrayRegion", "GetFloatArrayRegion", "GetDoubleArrayRegion", "SetBooleanArrayRegion", "SetByteArrayRegion", "SetCharArrayRegion", "SetShortArrayRegion", "SetIntArrayRegion", "SetLongArrayRegion", "SetFloatArrayRegion",
    "SetDoubleArrayRegion", "RegisterNatives", "UnregisterNatives", "MonitorEnter", "MonitorExit", "GetJavaVM", "GetStringRegion", "GetStringUTFRegion", "GetPrimitiveArrayCritical", "ReleasePrimitiveArrayCritical", "GetStringCritical",
    "ReleaseStringCritical", "NewWeakGlobalRef", "DeleteWeakGlobalRef", "ExceptionCheck", "NewDirectByteBuffer", "GetDirectBufferAddress", "GetDirectBufferCapacity", "GetObjectRefType"
]

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


function getJNIFunctionAdress(func_name) {
    // 通过函数名获取到对应的jni函数地址
    let jnienv_addr = Java.vm.getEnv().handle.readPointer()
    let offset = jni_struct_array.indexOf(func_name) * Process.pointerSize;
    return Memory.readPointer(jnienv_addr.add(offset))
}

function hook_jni(func_name) {
    let listener = null;
    switch (func_name) {
        case "SetByteArrayRegion":
            listener = Interceptor.attach(getJNIFunctionAdress(func_name), {
                onEnter: function (args) {
                    console.log(`env->${func_name} called from ${Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n")}`);
                    this.arg_array = args[1];
                },
                onLeave: function (retval) {
                    jbhexdump(this.arg_array);
                    console.log("SetByteArrayRegion onLeave");
                }
            })
        default:
            listener = Interceptor.attach(getJNIFunctionAdress(func_name), {
                onEnter: function (args) {
                    console.log(`env->${func_name} called from ${Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n")}`);
                }
            })
    }
    return listener;
}

function jbhexdump(array) {
    console.log("---------jbhexdump start---------");
    let env = Java.vm.getEnv();
    let size = env.getArrayLength(array);
    let data = env.getByteArrayElements(array);
    console.log(hexdump(data, {offset: 0, length: size, header: false, ansi: false}));
    env.releaseByteArrayElements(array, data, 0);
    console.log("---------jbhexdump end---------");
}

function inline_hook() {
    let hook_flag = false;
    let base_addr = Module.getBaseAddress("libpoxy_star.so");
    Interceptor.attach(base_addr.add(0xD9AC).add(1), {
        onEnter: function(args){
            hook_flag = true;
            this.hook_jni_interceptor = hook_jni("SetByteArrayRegion");
        },
        onLeave: function (retval) {
            hook_flag = false;
            this.hook_jni_interceptor.detach();
            console.log(`onLeave sub_D9AC`);
            jbhexdump(retval);
        }
    });

    Interceptor.attach(base_addr.add(0xAAE88).add(1), {
        onEnter: function (args) {
            if(hook_flag){
                console.log(`call sub_AAE88`);
                this.arg_0 = args[0];
                console.log("sub_AAE88 arg_0", hexdump(args[0].readPointer()));
            }
        },
        onLeave: function (retval) {
            console.log("sub_AAE88 onLeave arg_0", hexdump(this.arg_0.readPointer()));
        }
    });
    Interceptor.attach(base_addr.add(0xABDBC).add(1), {
        onEnter: function (args) {
            if(hook_flag){
                console.log(`call sub_ABDBC`);
                this.arg_0 = args[0];
                console.log("sub_ABDBC arg_0", hexdump(args[0].readPointer()));
            }
        },
        onLeave: function (retval) {
            console.log("sub_ABDBC onLeave arg_0", hexdump(this.arg_0.readPointer()));
        }
    });
}

freeze_funcs();
inline_hook();
call_getByte();


