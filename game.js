const autoBtn = document.querySelector('.autoBtn');
const upgradeBtn = document.querySelector('.upgradeBtn');
const shop1 = document.querySelector('.shop1');
const shop2 = document.querySelector('.shop2');
const cursor = document.querySelector('.cursor');
const charater = document.querySelector('.charater');
const effect = document.querySelector('.effect');
const progressbarText = document.querySelector('.progressbar span');
const progressbar = document.querySelector('.bar');
const buyBtn = document.querySelector('.buyBtn');

let point = 0;
let maxPoint = 1000;
let increase =107;
let increaseW = document.querySelector('.progressbar').offsetWidth/maxPoint;
progressbarText.textContent=`${point}/${maxPoint}`;

//탭전환
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

//마우스 모양 변경
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
//마우스를 쥐었다 피는 모양
charater.addEventListener('mousedown', e=>{
   cursor.classList.remove('fa-hand-paper');
   cursor.classList.add('fa-hand-rock');
})
charater.addEventListener('mouseup', e=>{
   cursor.classList.add('fa-hand-paper');
   cursor.classList.remove('fa-hand-rock');
})
charater.addEventListener('click', e=>{
   //클릭시 하트 이펙트
   const mouseX = e.clientX;
   const mouseY = e.clientY;
   effect.style.left = mouseX + 'px';
   effect.style.top = mouseY + 'px';
   effect.style.opacity='1';
   setTimeout(() => {
      effect.style.top = (mouseY-50) + 'px';
      effect.style.opacity='0';
   }, 100);

   //클릭당 포인트 증가
   if(point==maxPoint) return;
   point+=increase;
   if(point>=maxPoint) point=maxPoint;
   resetProgress();
})

function resetProgress(){
   progressbarText.textContent=`${point}/${maxPoint}`;
   progressbar.style.width=`${point*increaseW}px`;
}

// 클릭 업그레이드
let ClickPoint = 500; //기본값 500
document.querySelector('.clickPrice').textContent=`비용 : ♥ ${ClickPoint}`;
buyBtn.addEventListener('click', ()=>{
   if(ClickPoint>point){
      alert('애정도가 부족합니다.');
      return;
   }
   point-=ClickPoint;
   increase*=2;
   ClickPoint*=3;
   document.querySelector('.clickPrice').textContent=`비용 : ♥ ${ClickPoint}`;
   resetProgress();
})