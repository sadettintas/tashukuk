import axios from 'axios';
import slugify from 'slugify';

// Local API URL - Production vs Development
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.tashukuk.com/api/blogs'  // Production URL
  : 'http://localhost:5002/api/blogs';    // Development URL - Local Google Sheets API server

// Mock data for fallback when API is not available (e.g., GitHub Pages)
const MOCK_BLOGS = [
  {
    id: '1',
    title: 'Türk Hukukunda Yeni Düzenlemeler',
    content: 'Türk hukuk sisteminde son dönemde yapılan değişiklikler ve yeni düzenlemeler hakkında detaylı bir inceleme. Bu yazımızda, özellikle iş hukuku ve ticaret hukuku alanlarında getirilen yenilikleri ele alıyoruz. Yeni düzenlemelerin vatandaşlara ve iş dünyasına etkileri neler olacak? Hangi haklar genişletildi, hangi yükümlülükler değişti? Tüm bu soruların cevaplarını bu yazımızda bulabilirsiniz.',
    publishDate: '15 Şubat 2023',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    title: 'İş Hukukunda İşçi Hakları',
    content: 'İş hukukunda işçilerin sahip olduğu temel haklar ve bu hakların korunması için izlenmesi gereken yollar. İşçi-işveren ilişkilerinde sıkça karşılaşılan sorunlar ve çözüm önerileri. İş sözleşmesinin feshi, kıdem tazminatı, ihbar tazminatı gibi konularda bilmeniz gerekenler. İşyerinde karşılaşabileceğiniz haksız uygulamalara karşı yasal haklarınızı öğrenin ve hukuki süreçleri nasıl başlatabileceğinizi keşfedin.',
    publishDate: '3 Mart 2023',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    title: 'Aile Hukuku ve Boşanma Süreçleri',
    content: 'Aile hukuku kapsamında boşanma süreçleri, nafaka, velayet ve mal paylaşımı konularında bilmeniz gerekenler. Anlaşmalı ve çekişmeli boşanma arasındaki farklar nelerdir? Boşanma davası açmadan önce hangi belgeleri hazırlamalısınız? Çocukların velayeti nasıl belirlenir? Nafaka miktarı neye göre hesaplanır? Bu yazımızda, boşanma sürecinde karşılaşabileceğiniz tüm hukuki konuları detaylı bir şekilde ele alıyoruz.',
    publishDate: '17 Nisan 2023',
    imageUrl: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '4',
    title: 'Gayrimenkul Hukuku ve Tapu İşlemleri',
    content: 'Gayrimenkul alım-satım süreçleri, tapu işlemleri ve gayrimenkul yatırımlarında dikkat edilmesi gereken hukuki konular. Tapu devri nasıl yapılır? Gayrimenkul alırken hangi belgeleri kontrol etmelisiniz? İpotekli bir gayrimenkulün alım-satımında nelere dikkat edilmeli? Kat irtifakı ve kat mülkiyeti arasındaki farklar nelerdir? Bu yazımızda, gayrimenkul işlemlerinde karşılaşabileceğiniz tüm hukuki süreçleri ve dikkat edilmesi gereken noktaları açıklıyoruz.',
    publishDate: '29 Mayıs 2023',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '5',
    title: 'Ticaret Hukuku ve Şirket Kuruluşu',
    content: 'Ticaret hukuku kapsamında şirket kuruluşu, şirket türleri ve ticari işletmelerin hukuki yapıları hakkında bilgiler. Limited şirket ve anonim şirket arasındaki farklar nelerdir? Şirket kuruluşu için hangi belgeler gereklidir? Ortaklık sözleşmesi nasıl hazırlanır? Şirket yönetiminde sorumluluklar nasıl belirlenir? Bu yazımızda, ticari işletme kurmayı düşünenler için tüm hukuki süreçleri ve gerekli bilgileri detaylı bir şekilde ele alıyoruz.',
    publishDate: '12 Haziran 2023',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
];

// Tüm blog yazılarını getir
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    
    if (!response.data) {
      throw new Error("API çağrısı başarısız.");
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('Blog verileri alınırken hata oluştu:', error);
    console.log('Mock veri kullanılıyor...');
    return MOCK_BLOGS; // API bağlantısı başarısız olursa mock veriyi kullan
  }
};

// ID'ye göre blog yazısı getir
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    
    if (!response.data) {
      throw new Error("API çağrısı başarısız.");
    }
    
    return response.data.data || response.data;
  } catch (error) {
    console.error('Blog verisi alınırken hata oluştu:', error);
    // Mock veriden ID'ye göre blog yazısını bul
    if (id) {
      const blog = MOCK_BLOGS.find(blog => blog.id === id);
      if (blog) return [blog];
    }
    return MOCK_BLOGS; // ID yoksa veya bulunamazsa tüm mock veriyi döndür
  }
};

// SEO dostu slug oluştur
export const createSlug = (text) => {
  return slugify(text, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'tr',
    trim: true
  });
};

// Blog verilerini formatla
export const formatBlogData = (blogs) => {
  return blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    slug: createSlug(blog.title),
    excerpt: blog.content.substring(0, 150) + '...',
    content: blog.content,
    author: 'Taş Hukuk Bürosu',
    date: blog.publishDate,
    category: 'Hukuk',
    image: blog.imageUrl || '/images/placeholder/blog1.jpg',
    tags: ['Hukuk'],
    url: `/blog/${createSlug(blog.title)}`
  }));
}; 