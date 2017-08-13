### gallery-by-react  

***  

#### 说明 
* 这个项目是看完课程[React实践图片画廊应用](http://www.imooc.com/learn/652)后完成的(非原创)
* 讲师的该项目github地址[materliu/gallery-by-react](https://github.com/materliu/gallery-by-react) 
* 使用脚手架[create-react-app](https://github.com/facebookincubator/create-react-app)搭建  
* 在线demo[gallery-by-react](http://cheqianxiao.github.io/gallery-by-react)  
#### 笔记  
* **定义组件的方式**   

	第一种方式： 函数式，用来定义无状态组件   

		function Welcome(props) {
		  return <h1>Hello, {props.name}</h1>;
		}

	第二种方式： ES6的Class，官方推荐方式   

		class MyComponent extends React.Component {
		  constructor(props) {
		    super(props);
		    this.state = { /* initial state, this is ES6 syntax (classes) */ };
		  }
		}

	第三种方式： ES5 React.createClass    

		var MyComponent = React.createClass({
		  getInitialState() {
		    return { /* initial state */ };
		  },
		});

* **获取原生DOM**   

		class CustomTextInput extends React.Component {
		  constructor(props) {
		    super(props);
		    this.focus = this.focus.bind(this);
		  }

		  focus() {
		    // Explicitly focus the text input using the raw DOM API
		    this.textInput.focus();
		  }

		  render() {
		    // Use the `ref` callback to store a reference to the text input DOM
		    // element in an instance field (for example, this.textInput).
		    return (
		      <div>
		        <input
		          type="text"
		          ref={(input) => { this.textInput = input; }} />
		        <input
		          type="button"
		          value="Focus the text input"
		          onClick={this.focus}
		        />
		      </div>
		    );
		  }
		}

	ref属性的值为一个回调函数，在组件载入和移除时调用。  

* **state和props的区别**    

state作为组件自身的状态，props是父组件传递给子组件的属性。

* **获得[a,b]之间的随机整数**   

  		Math.ceil(Math.random() * (b - a) + a)

* **随机取0或1**  

  		Math.floor(Math.random() * 2) 

* **图片位置范围**  

 ![图片位置范围示意图](http://7xq6lv.com1.z0.glb.clouddn.com/gallery_stage.png)  
 淡黄色区域为舞台区域  

 粉红色区域为上侧图片存在的范围  
