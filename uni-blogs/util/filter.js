import Vue from 'vue'

// 时间戳
const formatTime = (timestamp) => {
    var date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')       
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
Vue.filter('handleTime', (val) => {
	if(val) {
		return formatTime(val)
	}
})