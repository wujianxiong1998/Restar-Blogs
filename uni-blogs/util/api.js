export const myRequest = (options) => {
	const BASE_URL = 'http://api.wujianxiong.top'
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'get',
			data: options.data || {},
			success: (res) => {
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'loading',
						title: '获取数据失败！'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					icon: 'loading',
					title: '获取接口失败！（检查网络连接）'
				})
				reject(err)
			}
		})
	})
}
