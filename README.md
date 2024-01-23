# Clicker Game
## 개요
  + **게임 이름** : Clicker Game
  + **제작** : 손지영
  + **제작 기간** :
  + **설명** : 물체를 클릭하여, 포인트를 모으고 모은 포인트로 자동화 시스템을 구매하여 포인트를 계속해서 모으는 방식
  + **사용 툴** : HTML, CSS, JavaScript
## 만들게 된 이유
  누구나 간단하게 즐길 수 있고, 진입장벽이 낮은 단순한 게임을 만들어보고 싶었습니다.
  
  단순한 클릭용 게임에 펫 육성 요소를 더하면 다른 미니게임들을 추가해도 큰 어색함이 없기 때문에

  펫 육성 + 클리커 게임으로 시작하고, 여유가 된다면 소소한 미니게임들을 추가해 볼 생각입니다.
## 기획
  Clicker Game 중 가장 인지도가 높은 Cookie Clicker 게임을 참고하였습니다.
  
  1. 정면에 있는 펫(물체)을 클릭하면 애정도(포인트)가 1 오른다.
  2. 애정도 일정 수치 이상 쌓이면 자동화 시스템(총 5개) 혹은 클릭 당 애정도를 증가시킬 수 있다.
  3. 자동화 시스템은 총 5개로 각 15, 100, 1100, 12000, 130000의 애정도가 필요하다.
  4. 각 단계는 1초당 0.1, 1, 8, 47, 260 순으로 애정도가 오른다.
  5. 자동화 시스템을 한 번 구매하면 그 시스템의 비용은 전 비용의 *1.15배가 된다.
       + (예시 : 15 => 22 => 33 -소숫점 제외-)
  6. 클릭 당 애정도는 업그레이드 할 때마다 2배씩 증가한다.(2배 => 4배 => 6배 ...)
  7. 클릭 당 애정도 업그레이드 비용은 전 단계의 *2의 비용이다.

  시스템을 추가할 여유가 된다면 펫의 단계를 나누어서 애정도에 따라 알 -> 새끼 -> 1단계 성장 -> 2단계 성장 으로 나눌 예정입니다. 

  ### 초기 구상
  <img width="752" alt="초기구상" src="https://github.com/Sonjiyo/clickerGame/assets/147456475/442c5f97-2efd-4161-b994-136bc8bc8b5f">
  
