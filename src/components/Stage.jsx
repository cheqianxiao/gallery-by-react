import React from 'react'  
import ReactDOM from 'react-dom'
import ImgFigure from './ImgFigure'
import ControllerDot from './ControllerDot'

import data from '../data/imgsData.json'
let imgsData = data.map((val,index)=>{
	return {imgUrl: require('../images/'+val.filename), ...val}
})
//获得区间的一个随机数 
function getRandomInRange(range){
	return Math.ceil(Math.random()*(range[1]-range[0])) + range[0]
}

class Stage extends React.Component{
	constructor(){
		super()
		this.state = {
			imgSettings: []
		}
    this.constant = {}
	}
	
  //舞台加载之后排布每张图片的位置  
  componentDidMount() {
    //获取舞台大小
    let stageDom = this.refs.stage,
	    stageW = stageDom.scrollWidth,
	    stageH = stageDom.scrollHeight,
	    halfStageW = Math.ceil(stageW/2),
	    halfStageH = Math.ceil(stageH/2),
	  //一个imgFigure大小  
		  imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
	    imgW = imgFigureDom.scrollWidth,
	    imgH = imgFigureDom.scrollHeight,
	    halfImgH = Math.ceil(imgH/2),
	    halfImgW = Math.ceil(imgW/2);
    //中心图片的位置  
		this.constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		} 
		//左侧、右侧、上侧图片的top、left取值范围	 
  	this.constant.leftSecRangeX = [-halfImgW, halfStageW - 3*halfImgW]
  	this.constant.rightSecRangeX = [halfStageW + halfImgW, stageW - halfImgW ]
  	this.constant.LRSecRangeY = [-halfImgH,halfStageH-halfImgH]  
  	this.constant.topSecRangeX = [halfStageW-halfImgW,halfStageW + halfImgW]
  	this.constant.topSecRangeY = [-halfImgH,halfStageH - 3*halfImgH]  
  	this.reArrange(0)
  }
  /* 
   * 排布图片位置的函数
   * @param centerIndex 要排在舞台中心的图片索引
   */
  reArrange(centerIndex) {
  	let constant = this.constant
  	let imgSettingsArr = [...this.state.imgSettings]
  	//要放在上侧的图片数量  0或1  随机
  	let imgToppedNum = Math.floor(Math.random()*2)
    //将要居中的图片先从数组中剔除
  	let imgCentered = imgSettingsArr.splice(centerIndex,1)[0]
  	//设置为居中 
  	imgCentered = {
  		pos: constant.centerPos,
  		rotate: 0,
  		isCenter: true,
  		isInverse: false
  	}
  	//再从剩下的图片中随机选imgToppedNum张图片布局在上侧  
  	let imgToppedSpliceIndex = Math.ceil(Math.random()*(imgSettingsArr.length-imgToppedNum))
  	let imgToppedArr = imgSettingsArr.splice(imgToppedSpliceIndex,imgToppedNum)
  	imgToppedArr.forEach((val,index)=>{
  		imgToppedArr[index] = {
  			pos: {
  				left: getRandomInRange(constant.topSecRangeX),
  				top: getRandomInRange(constant.topSecRangeY)
  			},
  			rotate: getRandomInRange([-30,30]),
  			isInverse: false,
  			isCenter: false
  		}
  	})
  	//剩下的图片左右各放一半
  	let halfIndex = imgSettingsArr.length / 2
  	imgSettingsArr.forEach((val,index)=>{
  		let LORSecRangeX = index < halfIndex ?  constant.leftSecRangeX : constant.rightSecRangeX
  		imgSettingsArr[index] = {
  			pos: {
  				left: getRandomInRange(LORSecRangeX),
  				top: getRandomInRange(constant.LRSecRangeY)
  			},
  			//旋转角度为正负30度之间
  			rotate: getRandomInRange([-30,30]),
  			isInverse: false,
  			isCenter: false
  		}
  	})
  	//将剔除的元素再插回去
  	imgToppedArr[0] && imgSettingsArr.splice(imgToppedSpliceIndex,0,imgToppedArr[0])
  	imgSettingsArr.splice(centerIndex,0,imgCentered)  
  	this.setState({
  		imgSettings: imgSettingsArr
  	})
  }
  //翻转图片
  inverse(index){
  	return function(){
  		this.state.imgSettings[index].isInverse = !this.state.imgSettings[index].isInverse
  		this.setState({imgSettings: this.state.imgSettings})
      }.bind(this)
  }
  //居中图片
  center(index){
  	return function(){
  		this.reArrange(index)
  	}.bind(this)
  }
	render() {
		let ImgFigures = []
		let ControllerNav = []
		let that = this
		imgsData.forEach((imgData,index)=>{
			if(!that.state.imgSettings[index]){
				that.state.imgSettings[index] = {
    			pos: {
    				left: 0,
    				top: 0
    			},
    			rotate: 0,
    			isCenter: false,
    			isInverse: false
	    	 }
			}
			
	    ImgFigures.push(<ImgFigure key={index} center={that.center(index)} inverse={that.inverse(index)} data={imgData} ref={"imgFigure"+index} imgSetting={this.state.imgSettings[index]}/>)
	    ControllerNav.push(<ControllerDot key={index} imgSetting={this.state.imgSettings[index]} center={that.center(index)} inverse={that.inverse(index)}/>)
		})
		return (
			<div className="stage" ref="stage">
				<section className="img-sec">
					{ImgFigures}
				</section>
				<nav className="controller-nav">
					{ControllerNav}
				</nav>
		  </div>
		)
	}
}

export default Stage