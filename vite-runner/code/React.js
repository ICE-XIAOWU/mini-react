export const ElementType = Object.freeze({
  /** 文本类型 */
  TEXT_ELEMENT: 'TEXT_ELEMENT',
});

function createTextElement(text) {
  return {
    type: ElementType.TEXT_ELEMENT,
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

  requestIdleCallback(workLoop);
}

function createDom(type) {
  return type === ElementType.TEXT_ELEMENT ? document.createTextNode("") : document.createElement(type);
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key];
    }
  });
}

function initChild(fiber) {
  const children = fiber.props.children;
  let prevChild = null;

  children.forEach((child, index) => {
    // 创建一个新的对象，保存parent
    const newFiber = {
      type: child.type,
      props: child.props,
      dom: null,
      child: null,
      sibling: null,
      parent: fiber,
    }

    if(index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }

    prevChild = newFiber;
  })
}

function performUnitOfWork(fiber) {
  if(!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));

    fiber.parent.dom.append(dom)

    updateProps(dom, fiber.props);
  }

  // 设置链表关系
  initChild(fiber);
  // 返回下一个要执行的任务
  if(fiber.child) {
    return fiber.child
  }

  if(fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

let nextUnitOfWork = null;
function workLoop(deadline) {
  let shouldIsYield = false;
  while (!shouldIsYield && nextUnitOfWork) {
    shouldIsYield = deadline.timeRemaining() < 1;
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  requestIdleCallback(workLoop);
}

const React = {
  render,
  createElement,
}

export default React;