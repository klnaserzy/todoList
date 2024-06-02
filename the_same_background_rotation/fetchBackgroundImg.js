// 背景圖片數據
const backgroundImagePath = [];
// 定義一個函數，用於執行 fetch 並返回處理後的資料
async function fetchAndProcessData() {
    try {
        const response = await fetch('./background_image_path.json');
        const data = await response.json();
        const { imageDatas } = data;
        
        const backgroundImagePath = [];
        imageDatas.forEach(imageData => {
            backgroundImagePath.push(imageData);
        });

        return backgroundImagePath;
    } catch (error) {
        console.log("error: ", error);
        return [];
    }
}

// 在原始的 JavaScript 檔案中調用函數，將結果賦值給變數
const backgroundImages = await fetchAndProcessData();

// 將變數導出
export { backgroundImages };