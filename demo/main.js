const div = document.createElement('div');
div.innerHTML = 'Hello World!';
document.body.appendChild(div);

// 卡顿
for (let i = 0; i < 100000000; i++) {
    console.log(i);
}