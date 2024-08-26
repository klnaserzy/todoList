import { backgroundImages as backgroundImagePath } from "./fetchBackgroundImg.js";
import { pexels_API_KEY } from "./API_KEY.js";

const a = pexels_API_KEY;
console.log(a.length);

// DOM 元素
const photographer = document.getElementById("photographer");
const nowDate = document.getElementById("nowDate");
const yearMon = document.getElementById("yearMon");

// 定義月份名稱
const allMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 背景圖片數據

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
        nextImage.src = backgroundImagePath[nextIndex].imgPath;
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
                document.body.style.backgroundImage = `url(${backgroundImagePath[background_Image_index]["imgPath"]})`;
                photographer.innerHTML = `<a href="${backgroundImagePath[background_Image_index]["photographer_url"]}" target="_blank">photographer: ${backgroundImagePath[background_Image_index]["photographer"]}</a>`;
                preloadImages(); // 預加載下一張背景圖片
            }
        }

        update_time_per_second(); // 呼叫更新時間函數
        update_background(); // 呼叫更新背景函數

    }, 1000); // 設定每秒執行一次
}

update_time_and_background();  // 呼叫更新時間和背景函數

// 定義 API Key 和相關參數
// 原本在使用的api 但會暴露api key 改為用express
// const api_key = "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ";
// const searchQuery = "nature";
// const per_page = 10;
// const pexelsUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${per_page}`;
//
//取得pexels的圖片
// fetch(pexelsUrl, { header })
//     .then(response => {
//         console.log("狀態: ", response.status);
    
//         if(response.ok){
//             const limit = response.headers.get("X-Ratelimit-Limit");
//             const remaining = response.headers.get("X-Ratelimit-Remaining");
//             const reset = response.headers.get("X-Ratelimit-Remaining");
    
//             console.log("每月配額: ", limit);
//             console.log("剩餘次數: ", remaining);
//             console.log("每月重置: ", reset);
    
//             return response.json();
//         }else{
//             console.log("請求失敗: ", response.status, response.status.statusText);
//             get_backgroundImagePath();
//       }
//     })
//     .then(data => {
//         const {photos} = data;
//         photos.forEach(el => {
//             backgroundImagePath.push({
//                 "imgPath": el.src.landscape,
//                 "photographer": el.photographer,
//                 "photographer_url": el.photographer_url
//             })
//         });
//         console.log(backgroundImagePath);
//     })
//     .catch(error => {
//         console.log("網路錯誤: ", error);
//         get_backgroundImagePath();
//     });