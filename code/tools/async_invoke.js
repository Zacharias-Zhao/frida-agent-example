function main() {
    Java.perform(function () {
        console.log('inter frida');

        Java.openClassFile("/data/local/tmp/r0gson.dex").load();
        Java.openClassFile("/data/local/tmp/androidasync.dex").load();
        const gson = Java.use('com.r0ysue.gson.Gson').$new();

        var HttpServerRequestCallback = Java.use('com.koushikdutta.async.http.server.HttpServerRequestCallback');
        var RequestTestCallback = Java.registerClass({
            name: "RequestCallback",
            implements: [HttpServerRequestCallback],
            methods: {
                onRequest: function (request, response) {
                    response.send('hello, is ok!')
                }
            }
        });

        var SignRequestCallback = Java.registerClass({
            name: "SearchRequestCallback",
            implements: [HttpServerRequestCallback],
            methods: {
                onRequest: function (request, response) {
                    var offset = request.getQuery().getString('offset');
                    var token = request.getQuery().getString('token');
                    var q = request.getQuery().getString('q');
                    var h_ts = request.getQuery().getString('h_ts');
                    console.log(offset, token, q, h_ts, '=============');


                    // 第一种 原生构建
                    // var Map = Java.use('java.util.HashMap');
                    // var map1 = Map.$new();
                    // map1.put("h_av", "4.5.3");
                    // map1.put("h_dt", "0");
                    // map1.put("h_os", "27");
                    // map1.put("h_app", "zuiyou");
                    // map1.put("h_model", "Nexus 5X");
                    // map1.put("h_did", "81ca900b72f3eda3");
                    // map1.put("h_nt", "1");
                    // map1.put("h_m", "250417922");
                    // map1.put("h_ch", "google_play");
                    // map1.put("android_id", "81ca900b72f3eda3");
                    // map1.put("offset", offset);
                    // map1.put("token", token);
                    // map1.put("h_ts", h_ts);
                    // map1.put("q", q);


                    // 第一种 json创建
                    var map1 = {
                        "h_av": "4.5.3",
                        "h_dt": "0",
                        "h_os": "27",
                        "h_app": "zuiyou",
                        "h_model": "Nexus 5X",
                        "h_did": "81ca900b72f3eda3",
                        "h_nt": "1",
                        "h_m": "250417922",
                        "h_ch": "google_play",
                        "h_ts": h_ts,
                        "offset": offset,
                        "android_id": "81ca900b72f3eda3",
                        "q": q,
                        "token": token,
                    };
                    var NetCrypto = Java.use('com.izuiyou.network.NetCrypto');
                    var result = NetCrypto.a("http://api.izuiyou.com/search/topic", map1.toString());
                    console.log(gson.toJson(result));
                    response.send(gson.toJson(result))
                }
            }
        });


        var Aplication = Java.use('android.app.Application');
        Aplication.attachBaseContext.implementation = function () {
            try {
                var AsyncHttpServer = Java.use('com.koushikdutta.async.http.server.AsyncHttpServer');
                var asynchttpserver = AsyncHttpServer.$new();
                asynchttpserver.get('/', RequestTestCallback.$new());
                asynchttpserver.get('/get_sign', SignRequestCallback.$new());
                asynchttpserver.listen(5555);
                console.log('AsyncHttpServer start ok!:')
            } catch (e) {
                console.log('AsyncHttpServer start error:', e)
            }
            this.attachBaseContext.apply(this, arguments);
        }


    })
}
setImmediate(main, 5);