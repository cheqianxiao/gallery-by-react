import React from 'react'  

class ControlNav extends React.Component {
	render(){
		return <nav className="controller-nav">
		    {this.props.data.map((img,index)=><span className="controller-unit" key={index}></span>)}
		</nav>
	}
}

export default ControlNav