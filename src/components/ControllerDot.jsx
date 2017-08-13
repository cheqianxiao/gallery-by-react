import React from 'react'  

class ControllerDot extends React.Component {
	handleClick(){
		if(this.props.imgSetting.isCenter){
			this.props.inverse()
		}else {
			this.props.center()
		}
	}
	render(){
		let className = "controller-unit"
		if(this.props.imgSetting.isCenter){
			className += ' is-center'
			if(this.props.imgSetting.isInverse){
				className += ' is-inverse'
			}
		}
		return  <span className={className} onClick={this.handleClick.bind(this)}></span>
	}
}

export default ControllerDot