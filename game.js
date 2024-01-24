const autoBtn = document.querySelector('.autoBtn');
const upgradeBtn = document.querySelector('.upgradeBtn');
const shop1 = document.querySelector('.shop1');
const shop2 = document.querySelector('.shop2');
const cursor = document.querySelector('.cursor');
const charater = document.querySelector('.charater');
const effect = document.querySelector('.effect');
const progressbarText = document.querySelector('.progressbar span');
const progressbar = document.querySelector('.bar');

let point = 0;
let maxPoint = 100;
let increase = 5;
let increaseW = document.querySelector('.progressbar').offsetWidth/maxPoint;
progressbarText.textContent=`${point}/${maxPoint}`;

autoBtn.addEventListener('click', ()=>{
   autoBtn.classList.add('active');
   upgradeBtn.classList.remove('active');
   shop1.style.display="flex";
   shop2.style.display="none";
})
upgradeBtn.addEventListener('click', ()=>{
   autoBtn.classList.remove('active');
   upgradeBtn.classList.add('active');
   shop1.style.display="none";
   shop2.style.display="flex";
})
charater.addEventListener('mouseover', e=>{
   cursor.style.display='block';
})
charater.addEventListener('mouseout', ()=>{
   cursor.style.display='none';
});
charater.addEventListener('mousemove', e=>{
   const mouseX = e.clientX;
   const mouseY = e.clientY;
   cursor.style.left = mouseX + 'px';
   cursor.style.top = mouseY + 'px';
});
charater.addEventListener('click', e=>{
   const mouseX = e.clientX;
   const mouseY = e.clientY;
   effect.style.left = mouseX + 'px';
   effect.style.top = mouseY + 'px';
   effect.style.opacity='1';
   setTimeout(() => {
      effect.style.top = (mouseY-50) + 'px';
      effect.style.opacity='0';
   }, 100);
   if(point>=maxPoint)return;
   point+=increase;
   progressbarText.textContent=`${point}/${maxPoint}`;
   progressbar.style.width=`${point*increaseW}px`;
})
charater.addEventListener('mousedown', e=>{
   cursor.classList.remove('fa-hand-paper');
   cursor.classList.add('fa-hand-rock');
})
charater.addEventListener('mouseup', e=>{
   cursor.classList.add('fa-hand-paper');
   cursor.classList.remove('fa-hand-rock');
})