<template>
	<view class="answer_page">
		<view class="mar-b">
			<textarea focus maxlength="-1" auto-height class="txt" :placeholder="txtContent" @blur="getContent"></textarea>
		</view>
		<view class="picker">
			<picker mode="selector" :range="langType" @change="chooseLang" :value="currentLang">
				<view class="flex pad-lr box-sizing">
					<view class="lang_title">
						请选择语言类型：
					</view>
					<view class="mar-l lang">
						{{langType[currentLang]}}
					</view>
				</view>
			</picker>
		</view>
		
		<!-- 提交 -->
		<view class="submit flex flex-between box-sizing flex-center-y">
			<view class="item pad-lr">
				<uni-icons type="image" size="20" color="#fff"></uni-icons>
			</view>
			<view class="item">
				<button size="mini" class="mar-lr" @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				// placeholder内容
				txtContent: '',
				// 判断是提问还是分享
				type: '',
				// 提交的问题
				txt: '',
				// 可选择语言
				langType: ['CSS', 'JS', 'Vue', '其他'],
				currentLang: 0,
				// 定时器
				timer: null
			}
		},
		onLoad(options) {
			if (options.type == 'answer') {
				this.type = 'answer'
				this.txtContent = '描述一下遇到的问题'
			} else {
				this.type = 'share'
				this.txtContent = '分享一下我的技术经验'
			}
		},
		methods: {
			// 获取富文本内容
			getContent(event) {
				this.txt = event.detail.value
			},
			
			// 选择语言
			chooseLang(e) {
				this.currentLang = e.detail.value
			},
			
			// 提交内容
			submit(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(async ()=>{
					if (this.txt == '') {
						return uni.showToast({
							icon: 'none',
							title: '内容不能为空'
						})
					}
					
					if (this.type == 'answer') {
						const { data: res } = await this.$myRequest({
							url: '/api/send/answer',
							method: 'post',
							data: {
								username: '吴剑雄',
								time: new Date().getTime(),
								lang: this.langType[this.currentLang],
								content: this.txt
							}
						})
						if (res.code == 200) {
							let delay = 800
							uni.showToast({
								icon: 'success',
								title: '发送成功',
								duration: delay,
								success: () => {
									setTimeout(()=>{
										uni.navigateBack({
											delta: 1
										})
									}, delay)
								}
							})
						}
					}
					if (this.type == 'share') {
						console.log('分享暂未实现')
						return
						this.$myRequest({
							url: '/api/send/share',
							method: 'post',
							data: {
								txt: this.txt,
								
							}
						})
					}
					this.txt = ''
				}, 100)
			}
		}
	}
</script>

<style scoped>
	@import '../../static/css/base.css';

	.txt {
		width: 94%;
		min-height: 300rpx;
		background-color: #eee;
		margin: 20rpx auto;
		text-indent: 1em;
	}

	.submit {
		z-index: 100;
		background-color: #21a675;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 10rpx 0;
	}
	.lang {
		background-color: #21a675;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
	}
	.lang_title {
		line-height: 60rpx;
	}
</style>
