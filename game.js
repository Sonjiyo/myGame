const autoBtn = document.querySelector('.autoBtn');
const upgradeBtn = document.querySelector('.upgradeBtn');
const shop1 = document.querySelector('.shop1');
const shop2 = document.querySelector('.shop2');
const cursor = document.querySelector('.cursor');
const charater = document.querySelector('.charater');
const progressbarText = document.querySelector('.progressbar span');
const progressbar = document.querySelector('.bar');
const buyBtn = document.querySelector('.buyBtn');
const renameBtn = document.querySelector('.renameBtn');
const autoItems = document.querySelectorAll('.items');
const autoPrices = document.querySelectorAll('.items .price');
const autoSteps = document.querySelectorAll('.items .step');
const perUps = document.querySelectorAll('.perUp');
const autoPrice = [15,100,1100,12000,130000];
const autoStep = [0,0,0,0,0];
const perUp = [0.1, 1.0, 8.0, 47.0, 260.0];

let maxPoint = 1000;
let increase =100;
let increaseW = document.querySelector('.progressbar').offsetWidth/maxPoint;
let point = 0;
let cnt = 0;
// if(localStorage.getItem('point')!=undefined){
//    point = localStorage.getItem('point');
//    progressbar.style.width=`${point*increaseW}px`;
// }
progressbarText.textContent=`${point}/${maxPoint.toLocaleString('ko-KR')}`;

//alert창
function customAlert(text){
   const modal = document.querySelector('.modal');
   const alert = document.querySelector('.alert');
   const alertMsg = document.querySelector('.alertMsg');
   const alertBtn = document.querySelector('.alertBtn');

   alertMsg.textContent = text;
   modal.style.display='block';
   alert.classList.add('active');

   alertBtn.addEventListener('click', ()=>{
      modal.style.display='none';
      alert.classList.remove('active');
   })
}

//펫이름 설정
document.querySelector('.petName span').innerHTML =  localStorage.getItem("name")==undefined ? '펫이름' :localStorage.getItem("name");

//펫이름 변경
let isNameChange = false;
renameBtn.addEventListener('click', ()=>{
   if(!isNameChange){
      document.querySelector('.renameBtn i').classList.remove('fa-edit');
      document.querySelector('.renameBtn i').classList.add('fa-check-square');
      const name = document.querySelector('.petName span').textContent;
      document.querySelector('.petName span').innerHTML = `<input type="text" value="${name}">`;
   }else{
      document.querySelector('.renameBtn i').classList.add('fa-edit');
      document.querySelector('.renameBtn i').classList.remove('fa-check-square');
      const name = document.querySelector('.petName input').value;
      document.querySelector('.petName span').innerHTML = `${name}`;
      localStorage.setItem("name",name);
   }
   isNameChange = !isNameChange;
})

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
   const mouseX = e.pageX;
   const mouseY = e.pageY;
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
   const mouseX = e.pageX;
   const mouseY = e.pageY;
   const effect = document.createElement('i');
   effect.classList.add('fas');
   effect.classList.add('fa-heart');
   effect.classList.add('effect');
   document.body.appendChild(effect);

   effect.style.left = mouseX + 'px';
   effect.style.top = mouseY + 'px';
   effect.classList.add('active');
   setTimeout(() => {
      effect.classList.remove('active');
      effect.remove();
   }, 300);

   //클릭당 포인트 증가
   point+=increase;
   if(point>=maxPoint) {
      cnt++;
      if(cnt>=6) {
         point=maxPoint;
         resetProgress();
         customAlert('펫이 모두 성장했습니다.');
         return;
      }
      maxPoint*=5;
      increaseW = document.querySelector('.progressbar').offsetWidth/maxPoint;
      document.querySelector('.charater').innerHTML = `<img src="./img/${cnt}차성장.png" alt="${cnt}차성장">`;
   }
      resetProgress();

   localStorage.setItem('point',point);
})

function resetProgress(){
   progressbarText.textContent=`${parseInt(point).toLocaleString('ko-KR')}/${maxPoint.toLocaleString('ko-KR')}`;
   progressbar.style.width=`${point*increaseW}px`;
}

// 클릭 업그레이드
let ClickPoint = 500; //기본값 500
document.querySelector('.clickPrice').textContent=`비용 : ♥ ${ClickPoint.toLocaleString('ko-KR')}`;
buyBtn.addEventListener('click', ()=>{
   if(ClickPoint>point){
      customAlert('업그레이드를 위한 충분한 애정도가 없습니다.');
      return;
   }
   point-=ClickPoint;
   increase*=2;
   ClickPoint*=3;
   document.querySelector('.clickPrice').textContent=`비용 : ♥ ${ClickPoint.toLocaleString('ko-KR')}`;
   resetProgress();
})

//자동화 업그레이드
for(let i=0; i<autoItems.length; i++){
   autoItems[i].addEventListener('click', ()=>{
      if(point<autoPrice[i]){
         customAlert('업그레이드를 위한 충분한 애정도가 없습니다.');
         return;
      }
      point-=autoPrice[i];
      autoPrice[i]=parseInt(autoPrice[i]*1.5);
      autoPrices[i].textContent = autoPrice[i].toLocaleString('ko-KR');
      autoSteps[i].textContent=++autoStep[i];
      if(i==0){
         perUps[i].textContent = `1초당 ♥ ${(perUp[i]*(autoStep[i]+1)).toFixed(1)}`;
      }else{
         perUps[i].textContent = `1초당 ♥ ${(perUp[i]*(autoStep[i]+1)).toLocaleString('ko-KR')}`;
      }
      resetProgress();
   })
   // 0.1, 1, 8, 47, 260
}

// 자동화 작동

let interval = setInterval(() => {
   for(let i=0; i<autoStep.length; i++){
      point += autoStep[i]*perUp[i];
      if(point>=maxPoint){
         point = maxPoint;
      }
      resetProgress();
   }
}, 1000);

// 미니게임
document.querySelector('.fbBtn').addEventListener('click',()=>{
   document.querySelector('.flappyBird').style.display='block';
})
document.querySelector('.flappyBird .exitBtn').addEventListener('click', ()=>{
   document.querySelector('.flappyBird').style.display='none';
})


document.querySelector('.test1').addEventListener('click',()=>{
   customAlert('준비중입니다.');
})
document.querySelector('.test2').addEventListener('click',()=>{
   customAlert('준비중입니다.');
})