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
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [el]
    }
  }
  return;
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

function preformUnitOfWork(work) {
  // 1. 创建DOM
  if(!work.dom) {
    const dom = (work.dom = work.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(work.type));

    console.log(work)
    work.parent.dom.append(dom);
    
    Object.keys(work.props).forEach(key => {
      if (key !== 'children') {
        dom[key] = work.props[key];
      }
    });
  }

  // 3. 处理链表
  const children = work.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      sibling: null,
      parent: work,
      dom: null,
    }

    if(index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
  
  // 4. 返回下一个处理的值
  if (work.child) {
    return work.child;
  }

  if (work.sibling) {
    return work.sibling;
  }

  return work.parent?.sibling;
}

let nextUnitOfWork = null;
function workLoop(deadline) {
  let isYield = false;
  while(!isYield && nextUnitOfWork) {
    isYield = deadline.timeRemaining() < 1;
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
}

export default React;