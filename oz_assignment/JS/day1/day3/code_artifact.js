// 계산기 전원 상태를 관리하는 변수
let isPowerOn = false;

// 디스플레이 요소를 선택 (querySelector 활용)
const display = document.querySelector('#display');
const powerBtn = document.querySelector('.on-off');

// 전원 ON/OFF 토글 함수
function togglePower() {
    isPowerOn = !isPowerOn;
    powerBtn.classList.toggle('on');
    
    if (isPowerOn) {
        display.value = '0';
    } else {
        display.value = '';
    }
}

// 화면 초기화 함수 (C 버튼)
function clearDisplay() {
    if (!isPowerOn) return;
    display.value = '0';
}

// 숫자 입력 함수
function appendNumber(number) {
    if (!isPowerOn) return;
    
    if (display.value === '0' || display.value === 'Error') {
        display.value = number;
    } else {
        display.value += number;
    }
}

// 연산자 입력 함수
function appendOperator(operator) {
    if (!isPowerOn) return;
    
    const lastChar = display.value.slice(-1);
    // 연속된 연산자 입력 방지
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// 계산 수행 함수 (Enter 버튼)
function performCalculate() {
    if (!isPowerOn) return;
    
    try {
        // eval() 대신 안전하게 Function 객체를 사용하여 수식 계산 (간단한 계산기에 적합)
        const result = new Function('return ' + display.value)();
        
        // 결과가 무한대이거나 NaN일 경우 예외 처리
        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            // 소수점 4자리까지 표시 후 불필요한 0 제거
            display.value = parseFloat(result.toFixed(4));
        }
    } catch (e) {
        display.value = 'Error';
    }
}