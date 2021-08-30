import base64

import requests
import json


def get_response():
    url = "https://u6.y.qq.com/cgi-bin/musicu.fcg"
    headers = {'User-Agent': 'QQMusic 10110511(android 9)',
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': '*/*'}
    # data = {"comm":{"QIMEI36":"7defc0b66cfc1319f441c11b10001931560f","qimei":"7defc0b66cfc1319f441c11b10001931560f","OpenUDID":"ffffffffc0087f8eba08ef2d0033c587","udid":"ffffffffc0087f8eba08ef2d0033c587","ct":"11","cv":"10110511","v":"10110511","chid":"10025934","os_ver":"8.1.0","aid":"eb9ece4d45a378dc","did":"MzUyNTMwMDgzNDU2ODg5","phonetype":"Pixel XL","devicelevel":"30","tmeAppID":"qqmusic","teenMode":"0","nettype":"1030","wid":"729087110427935744","rom":"google/google/marlin/marlin:8.1.0/OPM4.171019.021.P1/4820305:user/release-keys/","uid":"909156085","sid":"202106281643244459494738","OpenUDID2":"ffffffffc0087f8eba08ef7f51c90a9c","tmeLoginType":"0","hotfix":"100000000","tid":"729087110427935744","v4ip":"106.39.47.66","taid":"0101869FA3B387E65A37A6AA4CDC65C6A7F42C77E079003E75E482A7CE1211FADC729EDE099F25230F9BEAA8","traceid":"11_04459494738_1624869844","gzip":"1"},"music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile":{"module":"music.search.SearchBrokerCgiServer","method":"DoSearchForQQMusicMobile","param":{"query":"815979662","highlight":1,"searchid":"331560717849002972","sub_searchid":0,"search_type":8,"nqc_flag":0,"sin":0,"ein":30,"page_num":1,"num_per_page":15,"cat":2,"grp":1,"remoteplace":"search.android.history","multi_zhida":1,"sem":0}}}
    datas = {"comm":{"QIMEI36":"7defc0b66cfc1319f441c11b10001931560f","qimei":"7defc0b66cfc1319f441c11b10001931560f","OpenUDID":"ffffffffc0087f8eba08ef2d0033c587","udid":"ffffffffc0087f8eba08ef2d0033c587","ct":"11","cv":"10110511","v":"10110511","chid":"10025934","os_ver":"8.1.0","aid":"eb9ece4d45a378dc","did":"MzUyNTMwMDgzNDU2ODg5","phonetype":"Pixel","devicelevel":"30","taid":"0101869FA3B387E65A37A6AA4CDC65C6A7F42C77E079003E75E482A7CE1211FADC729EDE099F25230F9BEAA8","tmeAppID":"qqmusic","teenMode":"0","nettype":"1030","wid":"729087110427935744","rom":"google/google/marlin/marlin:8.1.0/OPM4.171019.021.P1/4820305:user/release-keys/","uid":"4459494738","sid":"202106291020404459494738","OpenUDID2":"ffffffffc0087f8eba08ef7f51c90a9c","tmeLoginType":"0","hotfix":"100000000","tid":"729087110427935744","v4ip":"106.39.47.66","traceid":"11_04459494738_1624933259","gzip":"1"},"music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile":{"module":"music.search.SearchBrokerCgiServer","method":"DoSearchForQQMusicMobile","param":{"query":"815979662","highlight":1,"searchid":"332920762192321012","sub_searchid":0,"search_type":8,"nqc_flag":0,"sin":0,"ein":30,"page_num":1,"num_per_page":15,"cat":2,"grp":1,"remoteplace":"search.android.history","multi_zhida":1,"sem":0}}}
    res = requests.post(url, data=json.dumps(datas), headers=headers)
    base64_str = base64.b64encode(res.content).decode()
    return base64_str


def encrypt(data):
    # url = "http://192.168.0.112:8889"
    url = "http://192.168.0.164:9999"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    res = requests.post(url=url, data=data, headers=headers).text
    print(res)
    # r = json.loads(requests.post(url=url, data=data, headers=headers).text)
    # print(json.dumps(r, ensure_ascii=False, indent=5))
    # print(r['music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile']['data']["body"]["item_user"][0]['encrypt_uin'])


if __name__ == '__main__':
    s = get_response()
    print(s)
    # s = "AAAAAAB4AbVWbWvcRhD+K0WF+xDMSfJdcvbBYdwGl+DGTqlJS4MRe9LqtDmtVpFWJ8vGUEqhpbRN6EtC+kJMSz41gZa+kDSU/pm7c/MvOrsr6U53Z+O46X25Xe3szDwzz8zsgWYzB2ttY0mLk265pnFPa2vakuYgjrT2gWZHGHEWiWVA7L469DByQmLDxuM8bOs690jk3LpVv+WzHqvbgd5b63Zip1/rd97KDOPt7U3GKd3b2Wrub13hr11La3HHNIwa7xhgi7hKGSwTEmjtpmGsNleaK43WkuayqEscB8NncJXEVpcEjpVi0mXyi1xZCXGUZ2o78RTv8QhwCEQxCXo4IoELFw+KHVwzDqVZ0NkFwYltuIIDO8pCDurBvNbCwf7W5mCjhW3S2r9wQXgeu8z3WZo75zMRIfCzm2RWuXHRYLJxSBxPdrGHIpxEPmjPI5nVIYw2ozrV5aEeRswlPtYBNt6re5z6a0kMOJxOxVUpbHWzPs4EPNBpyaWmDnItltQi4gznIYoQjcH0vD4Iyc2EhkoDQVZFCVznWYiLSIq1BC1unITF9gkOeAkmjLCLI4Vm/fLO+hsdaaFmpYOOWZvz59UU2x7iVoQdEmGbgwe2K+wvAlxAVTZmsU5bm7OjzeLmKOYYggaWBDpQRmwWKJBC2B+oKNzYXdIodhAk8kBzfQRFJNhaypbJ7XFCe6JAaBITWxcSundRl3etXj0MemDjtEBKySky5OKTTEmWWxRz5JfZVuoXkEOkdtGFCj20Q4GUQCSCIudnR6bu6f7AOAM4ZNs+HmB/Ct8a1F6V6RVi0swqLkEklLFFpCiEypBUEM7YEHi7yO7LrnSgwd8MrWeyGHqMMyvAqb5jmOZVQ/zMjSvbA968nlzb7ubIVaE0oXoI96FkNMEgxWNBm/Lr6QR46ZVUiec84f+3QosJJT6CySIacJCITnSgDUhMYNzAVlaQi4K4XMtOW92JCq5+UXQuv0WOWoqU0kwWnUqDtrN+/M2Hzx/8Onx6B5iTn2ntG5NEjO5+N370AxyejwBBn/LUfJMPwoL6PsrUoDupHSwiUiMzXl+PG8Z7oU9zIsHAPhNZUp0j1sPTbbZojt7FGkyQFaNpNkxz1VzO20ill6ueAidyuFZkZSAX1VlqSZNwqVJgquueaBySoyybkgmGzD0kziwWy5Ilk9Q8/+DH0dPfhs8+Gd97eN4ELRuXN1ca5rtXydb1+s1QNN7zJQi/43HH2Lq0v+HPJ2j0+YPx9w/B3/G9P0bv3wfODf86Ov74l9GdR//8fX/457dg9rR+n5c792C6ZNN9cS6kbrWL1VzxCurk6svwVqo9wyiymGtxBspBUiZavMhOzK/yY3EXPatHZbaXD3dF5Yknkaj9omgLbo8ffzr67GvwppKWGJ6bWX2mA8ODicIkTUKfIUfnlk0bliqmMOnCVPB0s7HcahWFOBfwNE3zd5cwB6MOGsEu+DkgDpbPxVnfQGyiJN+UMzhkMbfkVYuyCFdV0gxFnMCcm+75wydfjo9uj+9+dPzT0SsiARPlolcozOXDsBgBOIpZAGOeoh7aJ0H1jXjy2CzES+em29J/Ca9ZDDoGjw87gCDCI2gqmjSLkENkPIscD588G3/x+Pir30e3f35x4FLddFFUS6CSFyn7siFfWj0V8uHhv2DdmSQ="
    encrypt(s)