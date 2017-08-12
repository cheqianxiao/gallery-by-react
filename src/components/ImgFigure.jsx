import React from 'react'  

class ImgFigure extends React.Component {
	render(){
		let {url,title,desc} = this.props.data
		let {pos,rotate,isInverse,isCenter} = this.props.imgSetting
		let styleObj = {}
		styleObj = pos
		return (
			<figure className="img-figure" style={styleObj}>
				<img src={url} alt={title}/>
				<figcaption>
					<h2 className="img-title">{title}</h2>
					<div className="img-back">{desc}</div>
				</figcaption>
			</figure>
			)
	}
}

export default ImgFigure