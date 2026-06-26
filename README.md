# U_CAFE 

本專案為 U_CAFE 網站，前端使用 React + Vite，後端使用 Python FastAPI 提供公開資料 API。

##  Demo 網址

👉 https://u-cafe.vercel.app/

## 技術棧

- ⚡ [Vite](https://vitejs.dev/)
-  React 19
-  React Router v7
-  Python FastAPI
-  React Toastify（提示訊息）
-  Slick Carousel（輪播元件）
-  Font Awesome（圖示庫）

## 本地開發方式
```bash
cd frontend
npm install
npm run dev
```

## Python FastAPI 後端

公開資料 API 已改由 `backend/` 提供。先開一個終端機啟動後端：

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

後端預設網址：

```txt
http://localhost:8000
```

API 文件：

```txt
http://localhost:8000/docs
```

再開另一個終端機啟動前端：

```bash
cd frontend
npm run dev
```

如果後端不是跑在 `http://localhost:8000`，可以在 `frontend/.env` 設定：

```env
VITE_API_BASE_URL=http://localhost:8000
```

前端有提供範例檔：

```bash
cd frontend
cp .env.example .env
```
