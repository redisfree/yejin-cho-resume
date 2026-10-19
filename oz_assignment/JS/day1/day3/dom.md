# JavaScript DOM 조작법 정리

## DOM(Document Object Model) 이란?
DOM은 웹 페이지에 대한 인터페이스로, HTML 문서의 구조와 내용을 객체(Object) 모델로 표현한 것입니다. 브라우저는 HTML 코드를 읽어 트리 구조의 DOM을 생성하며, JavaScript는 이 DOM을 통해 웹 페이지의 요소들을 동적으로 조작(추가, 수정, 삭제)할 수 있습니다.

## Selector(선택자)로 DOM 요소 가져오기
JavaScript에서 특정 HTML 요소를 선택하여 제어하기 위해 선택자 메서드를 사용합니다.
- `document.getElementById('id')`: 특정 ID를 가진 요소를 선택합니다.
- `document.querySelector('selector')`: CSS 선택자를 사용하여 조건에 맞는 첫 번째 요소를 선택합니다. (가장 널리 쓰임)
- `document.querySelectorAll('selector')`: 조건에 맞는 모든 요소를 배열 형태(NodeList)로 가져옵니다.

## Event 란?
이벤트(Event)는 웹 브라우저 안에서 일어나는 어떤 사건(클릭, 키보드 입력, 마우스 이동, 페이지 로드 등)을 의미합니다. 사용자의 동작뿐만 아니라 브라우저의 상태 변화도 이벤트가 될 수 있습니다.

## EventListener(이벤트 리스너)

### EventListener(이벤트 리스너) 란?
특정 DOM 요소에 이벤트가 발생하는지를 계속 듣고(Listen) 있다가, 지정된 이벤트가 발생했을 때 미리 정의해둔 함수(콜백 함수)를 실행시키는 메서드입니다.

### EventListener를 사용하는 목적, 이유
HTML 태그 안에 `onclick="..."` 처럼 직접 작성(인라인 방식)할 수도 있지만, JS 파일에서 `addEventListener`를 사용하면 **HTML 구조와 JavaScript 로직을 분리**할 수 있어 유지보수가 용이해집니다. 또한 하나의 요소에 여러 개의 이벤트를 할당할 수도 있습니다.

### EventListener 정의하기
기본 문법은 다음과 같습니다.
```javascript
요소.addEventListener('이벤트종류', 실행할함수);
```

### EventListener 응용
```javascript
const button = document.querySelector('button');
button.addEventListener('click', function() {
    alert('버튼이 클릭되었습니다!');
});
```

## 마우스 감지란?
사용자가 마우스를 이용하여 웹 페이지와 상호작용하는 다양한 동작(클릭, 이동, 오버 등)을 감지하는 기능입니다.

### 마우스 감지 사용
자주 사용되는 마우스 이벤트의 종류는 다음과 같습니다.
- `click`: 마우스를 클릭했을 때
- `mouseenter` / `mouseover`: 요소 위로 마우스 포인터가 올라갔을 때
- `mouseleave` / `mouseout`: 요소 밖으로 마우스 포인터가 벗어났을 때
- `mousemove`: 요소 위에서 마우스가 움직일 때

## 화살표 함수란?
ES6(ECMAScript 2015)에서 도입된 문법으로, `function` 키워드 대신 화살표(`=>`)를 사용하여 함수를 더 짧고 간결하게 작성하는 방법입니다.

### 화살표 함수 사용
```javascript
// 기존 함수 표현식
const add = function(a, b) {
    return a + b;
};

// 화살표 함수
const add = (a, b) => {
    return a + b;
};

// 매개변수가 1개일 경우 괄호 생략 가능, 반환값만 있으면 중괄호 및 return 생략 가능
const double = x => x * 2;
```