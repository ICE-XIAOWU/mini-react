function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextElement(child) : child;
      }),
    },
  };
}

function render(el, container) {
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type);

  // 处理props -> id class...
  Object.keys(el.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = el.props[key];
    }
  });

  // 处理children
  const children = el.props.children;
  children.forEach(child => {
    render(child, container);
  });

  container.append(dom);
}

const React = {
  render,
  createElement,
}

export default React;