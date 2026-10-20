const API_URL = 'https://api4.binance.com/api/v3/ticker/24hr';
let cryptoData = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentTab = 'all'; // 'all' 또는 'fav'
let searchQuery = '';

const tbody = document.getElementById('crypto-table-body');
const tabAll = document.getElementById('tab-all');
const tabFav = document.getElementById('tab-fav');
const searchInput = document.getElementById('search-input');

// API에서 데이터 가져오기
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // USDT 마켓 데이터만 필터링
        cryptoData = data.filter(item => item.symbol.endsWith('USDT'));
        renderTable();
    } catch (error) {
        console.error('API 데이터를 불러오는데 실패했습니다:', error);
    }
}

// 숫자를 읽기 쉽게 포맷팅하는 함수
function formatNumber(numStr) {
    const num = parseFloat(numStr);
    if (num >= 1000) {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (num >= 1) {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    } else {
        return num.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    }
}

// 테이블 렌더링
function renderTable() {
    let filteredData = cryptoData;

    // 1. 탭 필터링 적용
    if (currentTab === 'fav') {
        filteredData = filteredData.filter(item => favorites.includes(item.symbol));
    }

    // 2. 검색어 필터링 적용
    if (searchQuery) {
        filteredData = filteredData.filter(item => item.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 데이터가 없을 경우 처리
    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`;
        return;
    }

    // 3. HTML 생성 및 적용
    const rows = filteredData.map(item => {
        const isFav = favorites.includes(item.symbol);
        const priceChange = parseFloat(item.priceChangePercent);
        
        let colorClass = '';
        let sign = '';
        if (priceChange > 0) {
            colorClass = 'positive';
            sign = '+';
        } else if (priceChange < 0) {
            colorClass = 'negative';
        }

        return `
            <tr>
                <td class="fav-icon ${isFav ? 'active' : ''}" onclick="toggleFavorite('${item.symbol}')">
                    ${isFav ? '★' : '☆'}
                </td>
                <td class="bold">${item.symbol}</td>
                <td>${formatNumber(item.lastPrice)}</td>
                <td class="bold ${colorClass}">${sign}${priceChange.toFixed(2)}%</td>
                <td>${formatNumber(item.highPrice)}</td>
                <td>${formatNumber(item.lowPrice)}</td>
            </tr>
        `;
    });

    tbody.innerHTML = rows.join('');
}

// 관심 항목 토글 (추가/삭제)
window.toggleFavorite = function(symbol) {
    if (favorites.includes(symbol)) {
        // 이미 관심항목이면 제거
        favorites = favorites.filter(fav => fav !== symbol);
    } else {
        // 관심항목에 추가
        favorites.push(symbol);
    }
    
    // LocalStorage 업데이트
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // 즉시 화면 갱신
    renderTable();
};

// 탭 이벤트 리스너 (전체보기)
tabAll.addEventListener('click', () => {
    currentTab = 'all';
    tabAll.classList.add('active');
    tabFav.classList.remove('active');
    renderTable();
});

// 탭 이벤트 리스너 (관심항목)
tabFav.addEventListener('click', () => {
    currentTab = 'fav';
    tabFav.classList.add('active');
    tabAll.classList.remove('active');
    renderTable();
});

// 검색창 이벤트 리스너
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTable();
});

// 초기 데이터 로딩
fetchData();

// 매 1초(1000ms)마다 데이터 갱신
setInterval(fetchData, 1000);
