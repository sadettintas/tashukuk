# Google Sheets Blog API

Google Sheets'teki blog verilerini çeken ve JSON formatında sunan bir Node.js API.

## Özellikler

- Google Sheets API ile entegrasyon
- Express.js ile REST API
- CORS desteği
- Çevre değişkenleri ile yapılandırma
- Blog verilerini JSON formatında sunma

## Kurulum

1. Repo'yu klonlayın:
```bash
git clone <repo-url>
cd google-sheets-blog-api
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Google Sheets API kimlik bilgilerini ayarlayın:
   - [Google Cloud Console](https://console.cloud.google.com/)'dan bir proje oluşturun
   - Google Sheets API'yi etkinleştirin
   - Servis hesabı oluşturun ve JSON formatında kimlik bilgilerini indirin
   - İndirilen dosyayı `google-credentials.json` olarak proje kök dizinine kaydedin

4. `.env` dosyasını düzenleyin:
```
PORT=5000
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SHEET_NAME=Sheet1
```

5. Google Sheets'i hazırlayın:
   - Bir Google Sheets oluşturun ve aşağıdaki sütunları ekleyin:
     - A: ID
     - B: Başlık
     - C: İçerik
     - D: Görsel URL (opsiyonel)
     - E: Yayın Tarihi
   - Sheets ID'sini `.env` dosyasına ekleyin

## Kullanım

Geliştirme modunda başlatmak için:
```bash
npm run dev
```

Üretim modunda başlatmak için:
```bash
npm start
```

## API Endpointleri

- `GET /api/blogs`: Tüm blog yazılarını listeler
- `GET /api/blogs/:id`: ID'ye göre blog yazısı getirir

## Veritabanı Şeması

Google Sheets'teki sütunlar:
- A: ID
- B: Başlık
- C: İçerik
- D: Görsel URL (opsiyonel)
- E: Yayın Tarihi

## Lisans

MIT 