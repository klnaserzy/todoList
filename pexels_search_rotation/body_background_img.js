// DOM 元素
const photographer = document.getElementById("photographer");
const nowDate = document.getElementById("nowDate");
const yearMon = document.getElementById("yearMon");

// 定義月份名稱
const allMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 背景圖片數據
const backgroundImagePath = [
    {
        "imgUrl": "./background_image/pexels-photo-15061262.webp",
        "photographer": "Marcel Löffler",
        "photographer_url": "https://www.pexels.com/@marcel-loffler-366529953/"
    }
];

// 當文檔加載完成時執行
window.onload = function() {
    // 從 Express 服務器獲取數據
    fetch('http://localhost:3000')
        .then(response => response.json())
        .then(data => {
            const {photos} = data;
            // 將從 Express 獲取的圖片數據添加到 backgroundImagePath 中
            photos.forEach(el => {
                backgroundImagePath.push({
                    "imgUrl": el.src.landscape,
                    "photographer": el.photographer,
                    "photographer_url": el.photographer_url
                })
            });
            console.log(backgroundImagePath); // 輸出 backgroundImagePath 到控制台
        })
        .catch(error => {
            // 如果發生錯誤，記錄錯誤信息並執行 get_backgroundImagePath 函數
            console.error('Error fetching environment variables:', error);
            get_backgroundImagePath();            
        });
};

// 練習fetch 當未能從 Pexels 獲取圖片時，從本地 JSON 文件中獲取
const get_backgroundImagePath = () => {
    fetch('./background_image_path.json')  //背景json檔案 其實數量不多可以直接用陣列儲存
        .then(response => response.json())
        .then(data => {
            const {imageDatas} = data;
            // 將從本地 JSON 文件獲取的圖片數據添加到 backgroundImagePath 中
            imageDatas.forEach(imageData => {
                backgroundImagePath.push(imageData);
            })
        })
        .catch(error=> {
            console.log("error: ", error);         
        });
};

// 更新時間和背景圖片
const update_time_and_background = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const set_background_change_time = 30;  //設定背景變換的秒數
    let change_background_timer = 0;  //計時器
    let background_Image_index = 0;

    // 更新年月日顯示
    yearMon.textContent = `${allMonth[month]} ${date}, ${year}`;

    // 預加載下一張背景圖片
    const preloadImages = () => {
        const nextIndex = (background_Image_index + 1) % backgroundImagePath.length;
        const nextImage = new Image();
        nextImage.src = backgroundImagePath[nextIndex].imgUrl;
    };

    preloadImages(); // 呼叫預加載函數

    // 每秒執行更新時間和背景圖片
    setInterval(() => {
        // 更新時間
        const update_time_per_second = () => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();
            let timeSet = ``;

            timeSet = hour < 10 ? `0${hour}:` : `${hour}:`;
            timeSet += minute < 10 ? `0${minute}:` : `${minute}:`;
            timeSet += second < 10 ? `0${second}` : `${second}`;
            
            nowDate.textContent = timeSet; // 更新時間顯示
        }

        // 更新背景圖片
        const update_background = () => {
            if(!(++change_background_timer % set_background_change_time)){
                change_background_timer = 0;
                ++background_Image_index;
                background_Image_index %= backgroundImagePath.length;
                // 更改背景圖片和攝影師信息
                document.body.style.backgroundImage = `url(${backgroundImagePath[background_Image_index]["imgUrl"]})`;
                photographer.innerHTML = `<a href="${backgroundImagePath[background_Image_index]["photographer_url"]}" target="_blank">photographer: ${backgroundImagePath[background_Image_index]["photographer"]}</a>`;
                preloadImages(); // 預加載下一張背景圖片
            }
        }

        update_time_per_second(); // 呼叫更新時間函數
        update_background(); // 呼叫更新背景函數

    }, 1000); // 設定每秒執行一次
}

update_time_and_background(); // 呼叫更新時間和背景函數