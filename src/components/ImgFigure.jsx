import React from 'react'  

class ImgFigure extends React.Component {
	handleClick(){
		if(this.props.imgSetting.isCenter){
			this.props.inverse()
		}else {
			this.props.center()
		}
	}
	render(){
		let {imgUrl,title,desc} = this.props.data
		let {pos,rotate,isInverse,isCenter} = this.props.imgSetting
		let styleObj = {}
		styleObj = pos;
		//如果有旋转角度
		if(rotate){
			(['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((val,index)=>{
				styleObj[val] = 'rotate('+rotate+'deg)'
			})
		}
		isCenter && (styleObj['zIndex'] = 11)
		let imgClassName = 'img-figure'
		//如果需要翻转
		isInverse && (imgClassName+=' is-inverse')
		return (
			<figure className={imgClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={imgUrl} alt={title}/>
				<figcaption>
					<h2 className="img-title">{title}</h2>
					<div className="img-back">{desc}</div>
				</figcaption>
			</figure>
			)
	}
}

export default ImgFigure