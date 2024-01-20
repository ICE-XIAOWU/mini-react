let taskId = 1;
function workLoop(deadline) {
  taskId++;
  
  let isYield = false;
  while(!isYield && taskId < 100) {
    isYield = deadline.timeRemaining() <= 1;
    console.log('taskId', taskId, deadline.timeRemaining(), isYield)
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);