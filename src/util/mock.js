import Mock from "mockjs";

//教师--进入
Mock.mock("/test", {
  "code": 0,
  "message": "message",
  "list|23": [
    {
      "id": "exglN61RI04done",       //班级id
      "name": "2017级财务班"          //年级班级名称
    }
  ]
});


//判断身份
Mock.mock("/wcsCard/index/getUserInfo", {
  "code": 0,
  "message": "message",
  "data": {
    "id": 3978,
    "userid": "LohOS5xzrXcdone",
    "name": "汪洋",
    "head": "",
    "cellphone": "",
    "departid": "exglN61RI04done",
    "wxuserid": "campus_7258100",
    "otherDepartid": null,
    "otherWxdepartid": null,
    "isSubscribe": 0,
    "userNo": "0001",
    "type": 2,
    "gender": 0,
    "joinDate": "2018-03-20 00:00:00",
    "admintype": null,
    "email": null,
    "duty": null,
    "techTitle": null,
    "politics": null,
    "workPlace": null,
    "status": 0,
    "objectid": "mecupxmasjune3dgodone",
    "stuList": [
      {
        "id": 3978,
        "userid": "LohOS5xzrXcdone",
        "name": "汪洋",
        "head": "",
        "cellphone": "",
        "departid": "exglN61RI04done",
        "wxuserid": "campus_7258100",
        "otherDepartid": null,
        "otherWxdepartid": null,
        "isSubscribe": 0,
        "userNo": "0001",
        "type": 1,
        "gender": 0,
        "joinDate": "2018-03-20 00:00:00",
        "admintype": null,
        "email": null,
        "duty": null,
        "techTitle": null,
        "politics": null,
        "workPlace": null,
        "status": 0,
        "objectid": "mecupxmasjune3dgodone"
      },
      {
        "id": 4064,
        "userid": "NgmDCV2clPcdone",
        "name": "鲁潘",
        "head": "",
        "cellphone": "",
        "departid": "L363QXP17pcdone",
        "wxuserid": "campus_7258176",
        "otherDepartid": null,
        "otherWxdepartid": null,
        "isSubscribe": 0,
        "userNo": "0057",
        "type": 1,
        "gender": 0,
        "joinDate": "2018-03-20 00:00:00",
        "admintype": null,
        "email": null,
        "duty": null,
        "techTitle": null,
        "politics": null,
        "workPlace": null,
        "status": 0,
        "objectid": "mecupxmasjune3dgodone"
      }
    ],
    "gradeAndClass": "2017级财务班",
    "isInSch": 0
  }
});
//教师--进入
Mock.mock("/wcsApp/teacher/manageClassList?userid=UgbxFT0Kzf4done", {
  "code": 0,
  "message": "message",
  "data": {
    "list|3": [
      {
        "departid": "exglN61RI04done",       //班级id
        "departname": "2017级财务班"          //年级班级名称
      }
    ]
  }
});
//教师--班级考勤
Mock.mock("/wcsApp/teacher/todayAttendanceInfo", {
  "code": 0,
  "message": "message",
  "data": {
    "staySchoolCount": 50,       //在校
    "notToSchoolCount": 10,       //未到校
    "leaveSchoolCount": 63,       //离校
    "attendance": 30,       //正常出勤
    "late": 3,       //迟到
    "earlyRetreat": 1,       //早退
    "absent": 1,       //缺卡
    "attendanceList": [            // 正常学生列表集合
      {
        "studentName": "张三",
        "lateTime": "8:00",   //打卡时间
      }
    ],
    "lateList": [            // 迟到学生列表集合
      {
        "studentName": "张三",
        "lateTime": "8:05",   //打卡时间
        "howLong": "5分钟" //迟到了多长时间
      }
    ],
    "earlyRetreatList|3": [            // 早退学生列表集合
      {
        "studentName": "张三",
        "lateTime": "18:05",   //打卡时间
        "howLong": "5分钟" //早退了多长时间
      }
    ],
    "absentList|2": [             // 缺卡学生列表集合
      {
        "studentName": "张三", //学生姓名
        "studentId": "1241415", //学生id
        "absentTime": "9:00",      //缺卡时间
      }
    ]
  }
});
//教师--补卡
Mock.mock("/wcsApp/teacher/repairAttendance", {
  "msg": "success",
  "code": 0
});
//教师--出勤名单
Mock.mock("/wcsApp/teacher/attendanceStuList", {
  "code": 0,
  "message": "message",
  "data": {
    "resultList|53": [
      {
        "studentName": "张三", //学生姓名
        "studentId": "13125sdgwq", //学生id
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100",//学生头像
        "leaveSchoolTime": "14:00" //离校时间
      }
    ]
  }
});
//教师--出入记录
Mock.mock("/wcsApp/teacher/stuAttendanceRecordList", {
  "code": 0,
  "message": "message",
  "data": {
    "resultList|20": [
      {
        "studentName": "张三", //学生姓名
        "studentId": "13125sdgwq", //学生id
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100",//学生头像
        "late": 3,       //迟到
        "earlyRetreat": 2,       //早退
        "absent": 1,       //缺卡
      }
    ]
  }
});
//教师--出入记录详情
Mock.mock("/wcsApp/teacher/stuAttendanceRecordDetailsList", {
  "code": 0,
  "message": "message",
  "data": {
    "resultList|5": [
      {
        "picPath": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100",//学生出入的时候拍的照片
        "attendanceTime": "2018-04-24 09:31:30",       //打开时间
        "attendanceType": 1,       //进出状态    1 进校 2 出校
        "abnormalType": 1,       //异常类型 1 迟到 2 早退 3 缺卡
      }
    ]
  }
});
//教师--我的--出入记录
Mock.mock("/wcsApp/teacher/teacherAttendanceInfo", {
  "code": 0,
  "message": "message",
  "data": {
    "resultList|10": [
      {
        "picPath": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100",//出入的时候拍的照片
        "attendanceTime": "2018-04-24 09:31:30",       //打卡时间
        "attendanceType": 1,       //进出状态    1 进校 2 出校
      },
      {
        "picPath": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100",//出入的时候拍的照片
        "attendanceTime": "2018-04-24 09:31:30",       //打卡时间
        "attendanceType": 2,       //进出状态    1 进校 2 出校
      }
    ]
  }
});
//教师--我的--早到榜
Mock.mock("/wcsApp/teacher/earlyRank", {
  "msg": "success",
  "code": 0,
  "data": {
    "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
    "attendanceTime": "09:01:30", //打卡时间
    "name": "谭鹏老师", //老师名次
    "rank": 5, //离校
    "rankList": [{ //学校早到榜前10名，
      "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
      "attendanceTime": "09:02:30", //打卡时间
      "name": "张三老师", //老师名次
      "rank": 1
    },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:03:30", //打卡时间
        "name": "李四老师", //老师名次
        "rank": 2
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:04:30", //打卡时间
        "name": "王五老师", //老师名次
        "rank": 3
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:35:30", //打卡时间
        "name": "赵六老师", //老师名次
        "rank": 4
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:36:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 5
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:37:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 6
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:38:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 7
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:39:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 8
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:41:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 9
      },
      { //学校早到榜前10名，
        "head": "http://p.qlogo.cn/bizmail/YehUlsEv8C6HdJgiccA8YF9w31icvyVCnf8icelFeJjIzzG1FSMrYm66w/100", //头像
        "attendanceTime": "09:31:30", //打卡时间
        "name": "谭鹏老师", //老师名次
        "rank": 10
      }
    ]
  }
});


//教师--我的消费
Mock.mock("/wcsApp/consume/billRecord", {
  "code": 0,
  "message": "message",
  "data": {
    "balance": "888.88",//我的余额
    "resultList": [ //我的账单详情
      {
        "money": "-1000",
        "time": "2018-04-24 09:31:03",
        "useType": "1",
        "local": "学校食堂"
      },
      {
        "money": "+10000",
        "time": "2018-04-23 09:31:30",
        "useType": "2",
        "local": "学校食堂"
      },
      {
        "money": "-888",
        "time": "2018-04-01 09:31:03",
        "useType": "1",
        "local": "学校超市"
      },
      {
        "money": "-555",
        "time": "2018-04-01 09:31:03",
        "useType": "1",
        "local": "学校超市"
      }
    ]
  }
});

//家长--出入记录
Mock.mock("/wcsCard/index/list", {
  "msg": "success",
  "code": 0,
  "page": {
    "total": 2,
    "size": 10,
    "pages": 1,
    "current": 1,
    "records": [
      {
        "id": 5990,
        "userid": null,
        "usertype": 0,
        "cardno": null,
        "picSrc": "http://hnst-channel.oss-cn-shanghai.aliyuncs.com/alleyway/00000716/20170815/c55632c0cc6b49d087f4788566f5b609",
        "objectid": null,
        "time": "2018-04-23 09:31",
        "type": 0
      },
      {
        "id": 5989,
        "userid": null,
        "usertype": 0,
        "cardno": null,
        "picSrc": null,
        "objectid": null,
        "time": "2018-04-24 09:31",
        "type": 0
      }
    ]
  }
});


