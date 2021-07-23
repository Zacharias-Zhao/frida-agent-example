function main() {
    Java.perform(function x() {
        console.log("java perform");
        var Character = Java.use("java.lang.Character");
        Character.toString.overload('char').implementation = function (x) {
            console.log("x:" + x);
            var ret_value = this.toString(x);
            console.log("ret_value:" + ret_value);
            return ret_value
        };
        // charArray
        var Arrays = Java.use("java.util.Arrays");
        Arrays.toString.overload('[C').implementation = function (x) {
            var ret_value = this.toString(x);

            Java.openClassFile("/data/local/tmp/r0gson.dex").load();
            const gson = Java.use('com.r0ysue.gson.Gson');
            console.log("x" + gson.$new().toJson(x));
            console.log("ret_value:" + ret_value);
            return ret_value
        };
        // bytesArray
        var Arrays = Java.use("java.util.Arrays");
        Arrays.toString.overload('[B').implementation = function (x) {
            var ret_value = this.toString(x);
            console.log('x:' + x);
            Java.openClassFile("/data/local/tmp/r0gson.dex").load();
            const gson = Java.use('com.r0ysue.gson.Gson');
            console.log("x" + gson.$new().toJson(x));

            console.log("ret_value:" + ret_value);
            return ret_value
        };
        // 构造java数组
        var Arrays = Java.use("java.util.Arrays");
        Arrays.toString.overload('[C').implementation = function (x) {
            var ret_value = this.toString(x);
            console.log('x:' + x);
            console.log("ret_value:" + ret_value);
            var newCharArray = Java.array('char', ['一', '去', '二', '三', '里']);
            var newR = Java.use('java.lang.String').$new(newCharArray);
            console.log('newR:' + newR);
            return newR
        };


        var JuiceHandler = null;
        Java.choose('com.r0ysue.a0526printout.Juice', {
            onMatch: function (instance) {
                console.log('fund Juice instance');
                console.log('fund instance call fillEnergy' + instance.fillEnergy());
                JuiceHandler = instance;
            },
            onComplete: function () {
                console.log('Juice search handler onComplete')
            }
        });
        console.log("save juice handle:" + JuiceHandler);
        // 子类 强转父类
        var WaterHandler = Java.cast(JuiceHandler, Java.use('com.r0ysue.a0526printout.Water'));
        console.log('water still :' + WaterHandler.still(WaterHandler));

        /*
        var WaterHandler = null;
        Java.choose('com.r0ysue.a0526printout.Water', {
            onMatch: function (instance) {
                console.log('fund Water instance');
                console.log('fund instance call still' + instance.still(instance));
                WaterHandler = instance;
            },
            onComplete: function () {
                console.log('Water search handler onComplete')
            }
        });
        console.log("save juice handle:" + WaterHandler);
        // 父类 强转子类
        // Cast from 'com.r0ysue.a0526printout.Water' to 'com.r0ysue.a0526printout.Juice' isn't possible
        var JuiceHandler = Java.cast(WaterHandler, Java.use('com.r0ysue.a0526printout.Juice'));
        console.log('juice fillEnergy :' + JuiceHandler.fillEnergy());
    */
    });
}

function interface88() {
    Java.perform(function () {
        var liquid = Java.use('com.r0ysue.a0526printout.liquid');
        var beer = Java.registerClass({
            name: 'com.r0ysue.a0526printout.beer',
            implements: [liquid],
            methods: {
                flow: function () {
                    console.log('look, beer is bubbling');
                    return 'look, beer is bubbling';
                },

            }
        });
        //  beer.$new() 您可以通过调用$new()它来调用构造函数以实例化对象
        console.log('beer.bubble:' + beer.$new().flow())
    })
}

// 使用Java.choose找出实例，就可以使用Java enum类的方法了
function enum8888() {
    Java.perform(function () {
        Java.choose('com.r0ysue.a0526printout.Signal', {
            onMatch: function (instance) {
                console.log("instance.name:", instance.name());
            },
            onComplete: function () {
                console.log("Signal search instance finish")
            }
        })
    })
}

function map888() {
    Java.perform(function () {
        Java.choose('java.util.HashMap', {
            onMatch: function (instance) {
                if (instance.toString().indexOf('ISBN') >= 0) {
                    console.log(instance);
                    console.log("size:" + instance.size());
                    console.log("size:" + instance.size());
                    send(string_to_send); // 将数据发送给kali主机的python代码
                    recv(function (received_json_object) {
                        string_to_recv = received_json_object.my_data;
                        console.log("string_to_recv: " + string_to_recv);
                    }).wait(); //收到数据之后，再执行下去
                }
            },
            onComplete: function () {
                console.log("search complete");
            }
        })
    })

}

setImmediate(main);