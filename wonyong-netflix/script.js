const API_KEY = 'cf99290ae20012c7f24c9c8f18b51d8b';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;

const moviesContainer = document.getElementById('moviesContainer');
const loading = document.getElementById('loading');

// 영화 데이터 가져오기
async function fetchMovies() {
    try {
        loading.classList.add('show');
        moviesContainer.innerHTML = '';

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        loading.classList.remove('show');

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showError('현재 상영 중인 영화가 없습니다.');
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        loading.classList.remove('show');
        showError('영화 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
}

// 영화 카드 표시
function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    if (!dateString) return '개봉일 정보 없음';
    
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
}

// 영화 카드 생성
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/2f2f2f/ffffff?text=No+Image';

    card.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" 
             onerror="this.src='https://via.placeholder.com/500x750/2f2f2f/ffffff?text=No+Image'">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-release-date">${formatDate(movie.release_date)}</p>
        </div>
    `;

    // 카드 클릭 이벤트 (선택사항)
    card.addEventListener('click', () => {
        console.log('Selected movie:', movie.title);
        // 여기에 상세 페이지로 이동하는 로직을 추가할 수 있습니다
    });

    return card;
}

// 에러 메시지 표시
function showError(message) {
    moviesContainer.innerHTML = `
        <div class="error-message show">
            <p>${message}</p>
        </div>
    `;
}

// 페이지 로드 시 영화 데이터 가져오기
document.addEventListener('DOMContentLoaded', fetchMovies);

