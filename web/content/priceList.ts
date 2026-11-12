import type { L4 } from '@/lib/i18n';

export type PriceItem = { n: L4; p: string; d?: L4 };
export type PriceGroup = { id: string; name: L4; items: PriceItem[] };

/* ── Single projects: {n: name, p: price, d: optional note} ── */
export const PRICE_LIST: PriceGroup[] = [
  { id:'price-brand', name:['Brand identity','สร้างแบรนด์','品牌形象','Айдентика'], items:[
    {n:['Brand Seed','Brand Seed','Brand Seed','Brand Seed'], p:'฿16,000', d:['2 logo concepts, mockups, logo file and copyright. 7–15 days','โลโก้ 2 แนวทาง ม็อกอัพ ไฟล์โลโก้และลิขสิทธิ์ 7–15 วัน','2 个标志方案、使用示例、标志文件及版权。7–15 天','2 концепции, мокапы, файл логотипа и права. 7–15 дней']},
    {n:['Brand Standard','Brand Standard','Brand Standard','Brand Standard'], p:'฿42,000', d:['3 concepts, logo usage book, 8–10 mockups. 12–20 days','3 แนวทาง คู่มือใช้งานโลโก้ ม็อกอัพ 8–10 ชิ้น 12–20 วัน','3 个方案、标志使用手册、8–10 个示例。12–20 天','3 концепции, руководство по логотипу, 8–10 мокапов. 12–20 дней']},
    {n:['Brand Universe','Brand Universe','Brand Universe','Brand Universe'], p:'฿62,000', d:['Brand book, online guidelines, full commercial rights. 18–30 days','Brand Book แนวทางสื่อสารออนไลน์ ลิขสิทธิ์เชิงพาณิชย์ 18–30 วัน','品牌手册、线上传播指南、完整商业版权。18–30 天','Брендбук, онлайн-гайдлайны, полные коммерческие права. 18–30 дней']}]},
  { id:'price-photo', name:['Photo and video','ถ่ายภาพและวิดีโอ','摄影与视频','Фото и видео'], items:[
    {n:['Car photo shoot','ถ่ายภาพรถยนต์','汽车拍摄','Фотосъёмка авто'], p:'฿1,200', d:['Per car. 10–15 retouched photos','ต่อคัน ได้ภาพรีทัช 10–15 ภาพ','每辆，含 10–15 张精修照片','За авто, 10–15 отретушированных фото']},
    {n:['Car showcase video','วิดีโอโชว์รถ','汽车展示视频','Видеообзор авто'], p:'฿1,500', d:['Per 30–60 second clip, music included','ต่อคลิป 30–60 วินาที รวมเพลงประกอบ','每条 30–60 秒，含配乐','За клип 30–60 секунд с музыкой']},
    {n:['Subtitles','ซับไตเติล','字幕','Субтитры'], p:'+฿300'},
    {n:['Voice-over','เสียงพากย์','配音','Закадровый голос'], p:'+฿500'},
    {n:['For-sale graphic','กราฟิก For Sale','汽车销售图','Графика для продажи авто'], p:'฿1,500', d:['Per image, or ฿800 each in bulk','ต่อภาพ หรือภาพละ ฿800 เมื่อสั่งหลายภาพ','每张，批量订购每张 ฿800','За изображение, пакетом по ฿800']},
    {n:['Video edit, 30 s to 1 min','ตัดต่อวิดีโอ 30 วินาที – 1 นาที','标准剪辑（30 秒–1 分钟）','Монтаж видео (30 с–1 мин)'], p:'฿600–1,800'},
    {n:['Motion graphic or animation','Motion Graphic / แอนิเมชัน','动态图形 / 动画','Моушн-графика / анимация'], p:'฿1,800+'}]},
  { id:'price-design', name:['Design','ออกแบบ','设计','Дизайн'], items:[
    {n:['Ad image, basic','ภาพโฆษณา Basic','基础广告图','Рекламное изображение, базовое'], p:'฿1,500'},
    {n:['Ad image with retouch and lighting','ภาพโฆษณา Full (รีทัช + ปรับแสง)','完整广告图（修图 + 调光）','Рекламное изображение с ретушью и светом'], p:'฿2,500'},
    {n:['Billboard','ป้ายบิลบอร์ด','广告牌设计','Дизайн билборда'], p:'฿6,000–40,000'},
    {n:['Guerrilla sign','ป้ายกองโจร','游击广告牌','Уличный баннер'], p:'฿600–1,200'},
    {n:['Packaging','แพ็กเกจจิ้ง','包装设计','Дизайн упаковки'], p:'฿4,000–18,000'},
    {n:['Merchandise, shirts and caps','ของที่ระลึก เสื้อ หมวก','周边产品（衬衫、帽子等）','Мерч (футболки, кепки)'], p:'฿1,800–18,000'},
    {n:['Business card','นามบัตร','名片设计','Визитная карточка'], p:'฿1,800–2,800'}]},
  { id:'price-digital', name:['Digital and print','ดิจิทัลและสิ่งพิมพ์','数字与印刷','Цифровое и печать'], items:[
    {n:['Website UI design','ออกแบบ UI เว็บไซต์','网站 UI 设计','UI-дизайн сайта'], p:'฿55,000–160,000'},
    {n:['App UX/UI design','ออกแบบ UX/UI แอปพลิเคชัน','应用 UX/UI 设计','UX/UI-дизайн приложения'], p:'฿80,000–160,000'},
    {n:['Company profile, up to 10 pages','Company Profile ไม่เกิน 10 หน้า','公司简介（最多 10 页）','Презентация компании, до 10 стр.'], p:'฿9,000'},
    {n:['Company profile, up to 16 pages','Company Profile ไม่เกิน 16 หน้า','公司简介（最多 16 页）','Презентация компании, до 16 стр.'], p:'฿14,500'},
    {n:['Company profile, up to 24 pages','Company Profile ไม่เกิน 24 หน้า','公司简介（最多 24 页）','Презентация компании, до 24 стр.'], p:'฿19,500'},
    {n:['Resume, Thai','เรซูเม่ ภาษาไทย','简历（泰语）','Резюме на тайском'], p:'฿1,800'},
    {n:['Resume, English','เรซูเม่ ภาษาอังกฤษ','简历（英语）','Резюме на английском'], p:'฿2,200'}]},
];
