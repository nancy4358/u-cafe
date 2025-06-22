import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 測試 API：取得 cafes 表的所有資料
app.get('/cafes', async (req, res) => {
  const { data, error } = await supabase.from('cafes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
