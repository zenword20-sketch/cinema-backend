const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل CORS لكي يستقبل الطلبات من شاشات التلفزيون والموبايل بدون حظر
app.use(cors());
app.use(express.json());

// مسار فحص حالة السيرفر (Health Check)
app.get('/', (req, res) => {
  res.send('🚀 سيرفر سينما AI الوسيط يعمل 24/7 بنجاح!');
});

// المسار الرئيسي لجلب البث المباشر للأفلام والمسلسلات
app.get('/api/stream', async (req, res) => {
  const { id, title, type, season, episode } = req.query;

  console.log(`[API] طلب بث للعمل: ${title} (ID: ${id})`);

  try {
    // هنا السيرفر الوسيط يتولى توفير الرابط الصافي مع الهيدرات المخصصة
    // مثال لرابط بث مباشر مستقر 1080p
    const streamData = {
      status: "success",
      title: title || "بدون عنوان",
      serverName: "⚡ سيرفر سينما السحابي المباشر 4K",
      streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      }
    };

    return res.json(streamData);
  } catch (error) {
    console.error("خطأ بالسيرفر الوسيط:", error);
    return res.status(500).json({ status: "error", message: "تعذر جلب البث حالياً" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر الوسيط يعمل على المنفذ: ${PORT}`);
});
