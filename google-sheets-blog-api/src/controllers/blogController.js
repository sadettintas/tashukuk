import { fetchBlogsFromSheet } from '../services/sheetsService.js';

// Tüm blog yazılarını getir
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await fetchBlogsFromSheet();
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Blog verileri alınırken hata oluştu:', error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası: Blog verileri alınamadı'
    });
  }
};

// ID'ye göre blog yazısı getir
export const getBlogById = async (req, res) => {
  try {
    const blogs = await fetchBlogsFromSheet();
    const blog = blogs.find(blog => blog.id === req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog yazısı bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Blog verisi alınırken hata oluştu:', error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası: Blog verisi alınamadı'
    });
  }
}; 