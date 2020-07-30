<template>
	<view class="home">
		<!-- 轮播 -->
		<swiper circular indicator-dots>
			<swiper-item v-for="(item, index) of imgs" :key="index">
				<image :src="item.image" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<!-- 发起提问 -->
		<view class="flex flex-between bg-gray pad">
			<view class="send_left">
				我想问
			</view>
			<view class="f-small flex flex-center-y">
				<icon type="info" size="12" color="#ccc" class="mar-r-s"/>描述你的技术问题
			</view>
		</view>
		
		<view class="pad box-sizing pad-tb-b flex flex-around">
			<view class="flex flex-center-x">
				<button size="mini" @click="navToAnswer('answer')">发起提问</button>
			</view>
			<view class="flex flex-center-x">
				<button size="mini" @click="navToAnswer('share')">分享经验</button>
			</view>
		</view>
		
		<!-- 我的提问 -->
		<view class="flex flex-between bg-gray pad">
			<view class="send_left">
				我的提问
			</view>
			<view class="f-small flex flex-center-y">
				<icon type="info" size="12" color="#ccc" class="mar-r-s"/>问题总计
			</view>
		</view>
		
		<view class="send" v-for="(item, index) of answerDatas" @click="navTo(item._id)">
			<view class="pad send_content box-sizing">
				<view class="desc flex flex-between f-small">
					<view class="desc_item green">
						语言：{{item.lang}}
					</view>
					<view class="desc_item green">
						{{item.time | handleTime}}
					</view>
				</view>
				<view class="question underline pad-tb txt-indent word-break f-bold f-20">
					问题{{index + 1}}：{{item.content}}
				</view>
				<view class="answer mar-tb txt-indent f-small txt-space">
					回答1：加我微私聊。
				</view>
			</view>
			<Block></Block>
		</view>
	</view>
</template>

<script>
	import Block from '@/components/block.vue'
	export default {
		components: {
			Block
		},
		data() {
			return {
				imgs: [],
				answerDatas: []
			}
		},
		onLoad() {
			this.getImgs()
		},
		onShow() {
			this.getAnswer()
		},
		methods: {
			// 获取轮播图片
			async getImgs() {
				const { data: res } = await this.$myRequest({
					url: '/api/carousel'
				})
				this.imgs = res.data
			},
			
			// 跳转到问题详情页
			navTo() {
				uni.navigateTo({
					url: '/pages/answer/info'
				})
			},
			
			// 跳转到提问页面
			navToAnswer(type) {
				uni.navigateTo({
					url: '/pages/answer/answer?type='+type
				})
			},
			
			// 获取提问列表
			async getAnswer() {
				const { data: res } = await this.$myRequest({
					url: '/api'
				})
				this.answerDatas = res.data
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/base.css';
	image {
		width: 100%;
		height: 350rpx;
	}
	.send_content {
		width: 100%;
	}
</style>
