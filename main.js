// v1 直接使用原生方式处理
// const dom = document.createElement('div');
// dom.id = 'app';
// document.body.querySelector('#root').append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = 'app';
// dom.append(textNode);

// v2版本：react -> vDom -> js Object

// 需要的东西：type props children
// const textEl = {
//   type: 'TEXT_ELEMENT',
//   props: {
//     nodeValue: 'app',
//   },
//   // 赋值原因：在后续的检测中可以不用去判断是否有值以及类型，处理会更加方便
//   children: []
// };

// const el = {
//   type: 'div',
//   props: {
//     id: 'app',
//   },
//   children: [textEl],
// };

// const dom = document.createElement(el.type);
// dom.id = el.props.id;
// document.body.querySelector('#root').append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);


// v3版本：优化重构代码 动态创建DOM
// function createTextElement(text) {
//   return {
//     type: 'TEXT_ELEMENT',
//     props: {
//       nodeValue: text,
//       children: []
//     },
//   };
// }

// function createElement(type, props, children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children,
//     },
//   };
// }

// const textEl = createTextElement('app1');
// const App = createElement('div', { id: 'app' }, textEl);

// const dom = document.createElement(App.type);
// dom.id = App.props.id;
// document.body.querySelector('#root').append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

// v4版本：动态的添加DOM节点
import ReactDOM from './code/ReactDom.js';
import App from './App.js';

ReactDOM.createRoot(document.querySelector('#root')).render(App);