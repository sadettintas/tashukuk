import express from 'express';
import { getAllBlogs, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

// Tüm blog yazılarını getir
router.get('/', getAllBlogs);

// ID'ye göre blog yazısı getir
router.get('/:id', getBlogById);

export default router; 