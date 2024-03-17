const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('pexels');

dotenv.config(); // 從 .env 文件加載環境變量

const app = express(); // 創建 Express 應用程式

// 允許特定域名的 CORS
const allowedOrigins = ['http://localhost:8080'];

app.use(cors({
    origin: function (origin, callback) {
        // 檢查請求的域是否在允許的列表中
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // 允許請求
        } else {
            callback(new Error('Not allowed by CORS')); // 拒絕請求
        }
    }
}));

app.get('/', async (req, res) => {
    const api_key = process.env.API_KEY; // 從環境變量中獲取 Pexels API 金鑰
    const per_page = 10; // 每頁返回的照片數量

    // 使用 Pexels SDK 創建客戶端
    const client = createClient(api_key);
    const query = 'Nature'; // 搜索查詢字串

    // 使用 Pexels API 進行照片搜索
    client.photos.search({ query, per_page})
        .then(photos => {
            res.json(photos); // 將搜索結果作為 JSON 響應發送回客戶端
        });       
});

// 啟動 Express 服務器並監聽指定端口
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// 留著複習
// app.get('/', async (req, res) => {
//     try {
//         const api_key = process.env.API_KEY;
//         const per_page = 10;

//         const client = createClient(api_key);
//         const query = 'Nature';

//         client.photos.search({ query, per_page})
//             .then(photos => {
//                 console.log(photos);
//             });

//         // 使用环境变量中的 API 密钥
//         const pexelsUrl = `https://api.pexels.com/v1/search?query=<span class="math-inline">\{searchQuery\}&per\_page\=</span>{per_page}`;
//         const header = {
//             method: "GET",
//             Authorization: `Bearer ${api_key}`
//         };
    
//         // 使用动态导入导入 node-fetch
//         const fetch = await import('node-fetch');
    
//         // 使用 API 密钥发出请求到其他网站获取数据
//         const response = await fetch.default(pexelsUrl, { header });

//         // 检查响应的状态码
//         if (!response.ok) {
//             if (response.status === 401) {
//                 console.log('Unauthorized: API key is invalid');
//             } else if (response.status === 404) {
//                 console.log('Not found: The requested resource was not found');
//             } else {
//                 console.log(`Failed to fetch data from the API. Status: ${response.status}`);
//             }
//         }

//         // 将响应转换为 JSON 格式
//         const data = await response.json();

//         // 将从其他网站获取的数据作为响应发送回前端
//         res.json(api_key);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });