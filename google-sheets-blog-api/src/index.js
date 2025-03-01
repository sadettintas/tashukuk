import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';

// Çevre değişkenlerini yükle
dotenv.config();

// Express uygulamasını oluştur
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API rotaları
app.use('/api/blogs', blogRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.json({
    message: 'Google Sheets Blog API',
    endpoints: {
      getAllBlogs: '/api/blogs',
      getBlogById: '/api/blogs/:id'
    }
  });
});

// 404 - Sayfa bulunamadı
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Sayfa bulunamadı'
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
  console.log(`API: http://localhost:${PORT}/api/blogs`);
}); 