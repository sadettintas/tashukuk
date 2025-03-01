// import { google } from '@googleapis/sheets';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Fix the import statement to use CommonJS style
import pkg from '@googleapis/sheets';
const { google } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CREDENTIALS_PATH = path.join(__dirname, '../../google-credentials.json');

// Google Sheets API'ye bağlanmak için kimlik bilgilerini yükle
const loadCredentials = () => {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    return credentials;
  } catch (error) {
    console.error('Kimlik bilgileri yüklenirken hata oluştu:', error);
    throw new Error('Google Sheets kimlik bilgileri yüklenemedi');
  }
};

// Google Sheets API istemcisini oluştur
const createSheetsClient = () => {
  const credentials = loadCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
};

// Mock data service instead of Google Sheets API
const mockBlogData = [
  {
    id: '1',
    title: 'Türk Hukukunda Yeni Düzenlemeler',
    content: 'Türk hukukunda son dönemde yapılan düzenlemeler, özellikle ticaret hukuku ve vergi hukuku alanlarında önemli değişiklikler getirdi. Bu yazımızda, bu değişikliklerin iş dünyasına ve bireylere etkilerini inceliyoruz. Yeni düzenlemeler, şirketlerin yapılanması, vergi yükümlülükleri ve ticari işlemlerin yürütülmesi konularında önemli yenilikler içeriyor. Bu değişikliklere uyum sağlamak için atılması gereken adımları ve dikkat edilmesi gereken hususları detaylı olarak ele alıyoruz.',
    imageUrl: '/images/blog/hukuk-duzenlemeler.jpg',
    publishDate: '15 Şubat 2023',
  },
  {
    id: '2',
    title: 'İş Hukukunda İşçi Hakları',
    content: 'İş hukukunda işçi hakları, çalışma hayatının en temel konularından biridir. Bu yazımızda, Türk iş hukukunda işçilerin sahip olduğu temel hakları, bu hakların korunması için başvurulabilecek yasal yolları ve işverenlerin yükümlülüklerini detaylı olarak inceliyoruz. İşçi-işveren ilişkilerinde sıkça karşılaşılan sorunlar ve bu sorunların çözümüne yönelik hukuki yaklaşımlar da yazımızda yer alıyor. Ayrıca, son dönemde yapılan yasal düzenlemeler ve yargı kararları ışığında işçi haklarının güncel durumunu değerlendiriyoruz.',
    imageUrl: '/images/blog/isci-haklari.jpg',
    publishDate: '3 Mart 2023',
  },
  {
    id: '3',
    title: 'Gayrimenkul Hukukunda Dikkat Edilmesi Gerekenler',
    content: 'Gayrimenkul alım satımı, kira sözleşmeleri ve imar hukuku gibi konular, gayrimenkul hukukunun temel alanlarını oluşturur. Bu yazımızda, gayrimenkul işlemlerinde dikkat edilmesi gereken hukuki hususları, tapu işlemlerinin nasıl yürütüleceğini ve olası uyuşmazlıklarda izlenecek hukuki süreçleri anlatıyoruz. Gayrimenkul yatırımcıları, ev almak veya satmak isteyenler ve kiracılar için önemli bilgiler ve tavsiyeler içeren bu yazı, gayrimenkul hukukunun karmaşık dünyasında size rehberlik edecek.',
    imageUrl: '/images/blog/gayrimenkul-hukuku.jpg',
    publishDate: '20 Nisan 2023',
  },
  {
    id: '4',
    title: 'Aile Hukukunda Boşanma Süreci',
    content: 'Boşanma, aile hukukunun en zorlu konularından biridir. Bu yazımızda, Türk hukukunda boşanma sürecini, boşanma davalarının nasıl açılacağını, dava sürecinde dikkat edilmesi gereken hususları ve boşanmanın hukuki sonuçlarını detaylı olarak ele alıyoruz. Anlaşmalı ve çekişmeli boşanma arasındaki farklar, mal paylaşımı, velayet, nafaka gibi önemli konularda bilgiler ve mahkeme uygulamaları hakkında güncel bilgiler sunuyoruz. Ayrıca, boşanma sürecinde yaşanabilecek duygusal zorluklar ve bu zorluklarla başa çıkma yöntemleri hakkında da öneriler paylaşıyoruz.',
    imageUrl: '/images/blog/aile-hukuku.jpg',
    publishDate: '8 Mayıs 2023',
  },
  {
    id: '5',
    title: 'Ticaret Hukukunda Şirket Kurulumu',
    content: 'Şirket kuruluşu, ticaret hukukunun önemli konularından biridir. Bu yazımızda, Türkiye\'de şirket kurulumu sürecini, şirket türleri arasındaki farkları, kuruluş için gerekli belgeleri ve işlemleri detaylı olarak anlatıyoruz. Limited şirket, anonim şirket ve diğer şirket türlerinin avantajları ve dezavantajları, vergi yükümlülükleri ve şirket yönetimine ilişkin hukuki düzenlemeler hakkında kapsamlı bilgiler sunuyoruz. Ayrıca, şirket kuruluşu sonrasında dikkat edilmesi gereken hukuki yükümlülükler ve şirket işleyişine dair önemli hususları da ele alıyoruz.',
    imageUrl: '/images/blog/sirket-kurulumu.jpg',
    publishDate: '12 Haziran 2023',
  }
];

// Blog verilerini getir
export const fetchBlogsFromSheet = async () => {
  try {
    // Gerçek API yerine mock veri dönüyoruz
    return mockBlogData;
  } catch (error) {
    console.error('Blog verileri çekilirken hata oluştu:', error);
    throw error;
  }
};
