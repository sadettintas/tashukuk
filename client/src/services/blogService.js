import axios from 'axios';
import slugify from 'slugify';

// Google Sheets API configuration
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID || "1hsNY6LN82zEK8eQBY0x55Cq8538dYz8cUy4Y4jObr3U";
const SHEET_NAME = process.env.REACT_APP_GOOGLE_SHEET_NAME || "BlogPosts";
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || "AIzaSyDJvk4A_K5SVv78Rl4AumnadNGGS7hG4HI";

// Google Sheets API URL
const SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Mock data for development and fallback
const MOCK_BLOGS = [
  {
    id: "1",
    title: "Türkiye'de İş Hukuku: Temel Haklar ve Sorumluluklar",
    content: "İş hukuku, işçi ve işveren arasındaki ilişkileri düzenleyen hukuk dalıdır. Türkiye'de iş hukuku, 4857 sayılı İş Kanunu başta olmak üzere çeşitli kanun ve yönetmeliklerle düzenlenmektedir. İşçilerin temel hakları arasında adil ücret, güvenli çalışma koşulları, izin hakları ve sosyal güvenlik bulunmaktadır. İşverenler ise iş sağlığı ve güvenliği önlemlerini almak, zamanında ücret ödemek ve ayrımcılık yapmamakla yükümlüdür. İş sözleşmelerinin hazırlanması, fesih süreçleri ve tazminat hesaplamaları gibi konularda hukuki danışmanlık almak, hem işçiler hem de işverenler için büyük önem taşımaktadır.",
    publishDate: "2023-05-15",
    imageUrl: "/images/placeholder/blog1.jpg"
  },
  {
    id: "2",
    title: "Gayrimenkul Hukuku: Alım-Satım Süreçleri ve Dikkat Edilmesi Gerekenler",
    content: "Gayrimenkul alım-satım işlemleri, hukuki açıdan dikkat gerektiren süreçlerdir. Tapu devri, imar durumu, takyidat sorgulaması ve vergi yükümlülükleri gibi konular, işlemin güvenli bir şekilde tamamlanması için önemlidir. Özellikle kat irtifakı ve kat mülkiyeti arasındaki farklar, yapı kullanma izin belgesi ve iskan durumu, alıcıların dikkat etmesi gereken hususlardır. Ayrıca, gayrimenkul üzerindeki ipotekler, hacizler ve şerhler de alım-satım kararını etkileyebilecek faktörlerdir. Profesyonel hukuki danışmanlık almak, bu süreçte karşılaşılabilecek riskleri minimize etmek için en doğru adımdır.",
    publishDate: "2023-06-22",
    imageUrl: "/images/placeholder/blog2.jpg"
  },
  {
    id: "3",
    title: "Aile Hukuku: Boşanma Süreçleri ve Velayet Düzenlemeleri",
    content: "Aile hukuku, evlilik, boşanma, velayet ve nafaka gibi aile ilişkilerini düzenleyen hukuk dalıdır. Türkiye'de boşanma davaları, anlaşmalı veya çekişmeli olarak iki şekilde yürütülebilir. Anlaşmalı boşanmada, eşlerin mal paylaşımı, velayet ve nafaka konularında anlaşmış olmaları gerekir. Çekişmeli boşanmada ise bu konular mahkeme tarafından karara bağlanır. Velayet düzenlemelerinde çocuğun üstün yararı esas alınır ve genellikle bir ebeveyne verilirken, diğer ebeveyne kişisel ilişki kurma hakkı tanınır. Nafaka ise, ekonomik durumu daha iyi olan eşin diğer eşe veya çocuklara sağladığı maddi destektir. Aile hukuku davalarında uzman bir avukatla çalışmak, sürecin daha sağlıklı ilerlemesini sağlar.",
    publishDate: "2023-07-10",
    imageUrl: "/images/placeholder/blog3.jpg"
  },
  {
    id: "4",
    title: "Ticaret Hukuku: Şirket Kuruluşu ve Yönetimi",
    content: "Ticaret hukuku, ticari işletmeler, şirketler ve ticari sözleşmeleri düzenleyen hukuk dalıdır. Türkiye'de şirket kuruluşu, anonim şirket, limited şirket, kollektif şirket gibi farklı türlerde gerçekleştirilebilir. Her şirket türünün kendine özgü kuruluş prosedürleri, sermaye gereksinimleri ve yönetim yapıları bulunmaktadır. Şirket yönetiminde, yönetim kurulu veya müdürler kurulu gibi organların sorumlulukları, karar alma mekanizmaları ve pay sahiplerinin hakları önemli konulardır. Ayrıca, ticari sözleşmelerin hazırlanması, uyuşmazlıkların çözümü ve şirket birleşme-devralma süreçleri de ticaret hukukunun kapsamına girer. Doğru hukuki danışmanlık, şirketlerin yasal yükümlülüklerini yerine getirmelerini ve potansiyel riskleri yönetmelerini sağlar.",
    publishDate: "2023-08-05",
    imageUrl: "/images/placeholder/blog4.jpg"
  },
  {
    id: "5",
    title: "Ceza Hukuku: Temel İlkeler ve Savunma Hakları",
    content: "Ceza hukuku, suçları, cezaları ve ceza yargılamasını düzenleyen hukuk dalıdır. Türk Ceza Kanunu ve Ceza Muhakemesi Kanunu, bu alanın temel yasal düzenlemeleridir. Ceza hukukunun temel ilkeleri arasında kanunsuz suç ve ceza olmaz ilkesi, masumiyet karinesi ve şüpheden sanık yararlanır ilkesi bulunmaktadır. Savunma hakları ise, adil yargılanma hakkının önemli bir parçasıdır ve susma hakkı, müdafi yardımından yararlanma hakkı ve delillere erişim hakkı gibi hakları içerir. Ceza davalarında, soruşturma ve kovuşturma aşamalarında izlenecek prosedürler, delillerin toplanması ve değerlendirilmesi, ve itiraz yolları gibi konular büyük önem taşır. Uzman bir ceza avukatıyla çalışmak, savunma haklarının etkin bir şekilde kullanılmasını sağlar.",
    publishDate: "2023-09-18",
    imageUrl: "/images/placeholder/blog5.jpg"
  }
];

// Tüm blog yazılarını getir
export const getAllBlogs = async () => {
  // In development mode, always use mock data
  if (isDevelopment) {
    console.log('Development mode: Using mock blog data');
    return MOCK_BLOGS;
  }
  
  try {
    console.log("Fetching from Google Sheets API:", SHEETS_API_URL);
    const response = await fetch(SHEETS_API_URL);
    
    if (!response.ok) {
      throw new Error("Google Sheets API çağrısı başarısız.");
    }
    
    const data = await response.json();
    console.log("Google Sheets API response:", data);
    const rows = data.values;
    
    // İlk satır başlık satırı olduğu için onu atlayıp diğer satırları işliyoruz
    const blogs = rows.slice(1).map((row, index) => ({
      id: (index + 1).toString(),
      title: row[0] || 'Başlık Yok',
      content: row[1] || 'İçerik Yok',
      publishDate: row[2] || 'Tarih Yok',
      imageUrl: row[3] || null
    }));
    
    return blogs;
  } catch (error) {
    console.error('Blog verileri alınırken hata oluştu:', error);
    console.log('Mock veri kullanılıyor...');
    return MOCK_BLOGS; // API bağlantısı başarısız olursa mock veriyi kullan
  }
};

// ID'ye göre blog yazısı getir
export const getBlogById = async (id) => {
  try {
    // Tüm blogları getir ve ID'ye göre filtrele
    const allBlogs = await getAllBlogs();
    const blog = allBlogs.find(blog => blog.id === id);
    
    if (blog) {
      return [blog];
    } else {
      throw new Error("Blog bulunamadı");
    }
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