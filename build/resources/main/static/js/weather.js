// 날씨
document.addEventListener('DOMContentLoaded', function() {
    <!-- 날씨 API 불러오기 -->
    // const weatherContainer = document.getElementById('weather-container');
    const weatherTitle = document.getElementById('weather-title');
    const defaultLocation = '서울';
    weatherTitle.textContent = `${defaultLocation} 현재 날씨`;
    fetchWeather(defaultLocation);
    const currentWeather = document.getElementById('current-weather');
    const currentDateEl = document.getElementById('current-date');

    function fetchWeather(location) {
        const weatherTitle = document.getElementById('weather-title');
        weatherTitle.textContent = `${location} 현재 날씨`;
        fetch(`/api/weather?location=${encodeURIComponent(location)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 접속 오류 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // 날짜별로 날씨 정보를 집계
                // const weatherMap = {};
                // data.list.forEach(item => {
                //   const date = new Date(item.dt * 1000);
                //   const options = {weekday: 'short', month: 'short', day: 'numeric'};
                //   const formattedDate = date.toLocaleDateString('ko-KR', options);
                //
                //   if (!weatherMap[formattedDate]) {
                //     weatherMap[formattedDate] = {
                //       tempSum: 0,
                //       count: 0,
                //       weatherDescription: item.weather[0].description,
                //       iconCode: item.weather[0].icon
                //     };
                //   }
                //   weatherMap[formattedDate].tempSum += item.main.temp;
                //   weatherMap[formattedDate].count += 1;
                // });
                //
                // // 평균 온도 계산 및 출력
                // const weatherItems = Object.keys(weatherMap).map(date => {
                //   const weatherInfo = weatherMap[date];
                //   const averageTemp = (weatherInfo.tempSum / weatherInfo.count).toFixed(1);
                //   const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo.iconCode}@2x.png`;
                //
                //   return `
                //     <div class="weather-item">
                //         <div class="day">${date}</div>
                //         <div class="temp">${averageTemp}°C</div>
                //         <img src="${iconUrl}" alt="날씨 아이콘" class="weather-icon"/>
                //         <div>${weatherInfo.weatherDescription}</div>
                //     </div>
                // `;
                // }).join('');
                //
                // weatherContainer.innerHTML = weatherItems;

                const today = new Date();
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                const formattedDate = today.toLocaleDateString('ko-KR', options);

                // 현재 날씨를 보여주는 부분
                const currentItem = data.list[0];
                currentWeather.innerHTML = `
                <div class="current-temp">${currentItem.main.temp}°C</div>
                <div class="current-description">${currentItem.weather[0].description}</div>
                <img src="http://openweathermap.org/img/wn/${currentItem.weather[0].icon}@2x.png" alt="날씨 아이콘" class="weather-icon"/>
            `;
                currentDateEl.innerHTML = `<div>${formattedDate}</div>`;
            })
            .catch(error => console.error('날씨 정보를 가져오지 못했습니다:', error));
    }

    fetchWeather('서울');

    document.getElementById('search-button').addEventListener('click', function () {
        const locationInput = document.getElementById('location-input').value;
        if (locationInput) {
            fetchWeather(locationInput);
        } else {
            alert('지역 이름을 입력하세요.');
        }
    });

    document.getElementById('location-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
});



// 검색
document.getElementById('search-button').addEventListener('click', function () {
    const locationInput = document.getElementById('location-input').value;
    const weatherTitle = document.getElementById('weather-title');

    if (locationInput) {
        weatherTitle.textContent = `${locationInput} 현재 날씨`;
        fetchWeather(locationInput);
    } else {
        alert('지역을 입력하세요.');
    }
});

document.getElementById('location-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const locationInput = document.getElementById('location-input').value;
        const weatherTitle = document.getElementById('weather-title');

        if (locationInput) {
            weatherTitle.textContent = `${locationInput} 현재 날씨`;
            fetchWeather(locationInput);
        } else {
            alert('지역을 입력하세요.');
        }
    }
});