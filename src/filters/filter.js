import Vue from 'vue'

Vue.filter('turnoverType', function (val) {   //进出校过滤
  if (!val) return '';
  let arr = {1:'入校',2:'出校'};
  return  arr[val]
});

Vue.filter('abnormalType', function (val) {    //异常到校过滤
  if (!val) return '';
  let arr = {1:'迟到',2:'早退',3:'缺卡'};
  return  arr[val]
});

Vue.filter('today', function (val) {    //
  if (!val) return '';
  let data = new Date();
  let y = data.getFullYear(); // 2018
  let m = zeroFill(data.getMonth() + 1);//月
  let d = zeroFill(data.getDate());//日
  let date_str = y + '-' + m + '-' + d;
  if(val === date_str){
    return '今天';
  }else{
    let arr = val.split('-');
    return arr[1]+'/'+arr[2];
  }
  function zeroFill(i) {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  }
});

Vue.filter('attendanceTime', function (val) {    //异常到校过滤
  if (!val) return '';
  let arr = val.split(':');
  return  arr[0]+':'+arr[1]
});
