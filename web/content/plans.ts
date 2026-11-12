import type { L4 } from '@/lib/i18n';

/** y = included, n = not included, u = unlimited, a number = quantity per month */
export type Cell = 'y' | 'n' | 'u' | number;
export type Tier = { n: string; p: number; v: Cell[]; d: L4 };
export type Plan = { name: L4; img: string; pos: string; blurb: L4; rows: L4[]; tiers: [Tier, Tier, Tier] };

export const PLAN_UI = {
  best: ['Best value', 'คุ้มที่สุด', '最超值', 'Лучший выбор'],
  per: ['per month', 'ต่อเดือน', '每月', 'в месяц'],
  choose: ['Choose', 'เลือก', '选择', 'Выбрать'],
  unlimited: ['Unlimited', 'ไม่จำกัด', '不限', 'Безлимит'],
  title: ['Nexthype · Digital agency in Rawai, Phuket', 'Nexthype · ดิจิทัลเอเจนซี ราไวย์ ภูเก็ต', 'Nexthype · 普吉岛拉威数字营销代理', 'Nexthype · Digital-агентство на Пхукете'],
} satisfies Record<string, L4>;

const MP: L4 = ['Media planner', 'Media Planner', '媒体策划', 'Медиапланирование'];
const CAP: L4 = ['Captions', 'แคปชัน', '文案', 'Тексты'];
const POSTS: L4 = ['Posts and artwork', 'โพสต์ / Artwork', '帖子与设计图', 'Посты и дизайн'];
const REELS: L4 = ['Reels or stories', 'Reels / Story', 'Reels / Story', 'Reels / Stories'];

/* ── Monthly plans, straight from the Nexthype price list (v4) ──
   values: y = included, n = not included, u = unlimited, numbers = per month.
   Chinese and Russian tier descriptions reuse the wording from Nexthype's own price list. */
export const PLANS: Plan[] = [
  { name:['Real estate','อสังหาริมทรัพย์','房地产','Недвижимость'], img:'/assets/cut-estate.webp', pos:'50% 50%',
    blurb:['Villas, condos and developments that sell on image.','วิลล่า คอนโด และโครงการที่ขายด้วยภาพลักษณ์','靠形象成交的别墅、公寓与开发项目。','Виллы, кондо и проекты, которые продаёт образ.'],
    rows:[MP,['Mood and tone','Mood & Tone','Mood & Tone','Mood & Tone'],POSTS,['Captions and articles','แคปชัน / บทความ','文案与文章','Тексты и статьи'],['Video clips','ตัดต่อวิดีโอ (คลิป)','视频剪辑（条）','Видеоклипы'],['Billboards or signs','ป้ายบิลบอร์ด','广告牌','Билборды и баннеры'],['Brochures','โบรชัวร์','宣传册','Брошюры'],['3D support','ซัพพอร์ตงาน 3D','3D 支持','3D-поддержка']],
    tiers:[
      {n:'Essential', p:28000, v:['y','y',10,'y','n',1,'n','n'], d:['Build awareness for a new project with steady, engaging content.','เริ่มสร้างการรับรู้ให้โครงการ ด้วยคอนเทนต์ที่ดึงดูดผู้สนใจ','为您的项目建立品牌知名度，创作吸引潜在客户的内容。','Начните строить узнаваемость бренда вашего проекта с привлекательным контентом.']},
      {n:'Growth', p:38000, v:['y','y',15,'y',2,3,1,'y'], d:['For projects that need to close sales month after month.','สำหรับโครงการที่ต้องการปิดการขายต่อเนื่องทุกเดือน','适合需要持续稳定销售的项目。','Идеально для проектов, стремящихся к стабильным продажам.']},
      {n:'Prestige', p:65000, v:['y','y',20,'y',3,5,2,'y'], d:['Full service for luxury developments that expect the highest standard.','ดูแลครบวงจร สำหรับโครงการลักชัวรีที่ต้องการมาตรฐานสูงสุด','为豪华项目提供全方位服务，标准最高。','Полный сервис для люксовых проектов с высочайшими стандартами.']}]},
  { name:['Food & beverage','อาหารและเครื่องดื่ม','餐饮','Рестораны и бары'], img:'/assets/cut-dining.webp', pos:'45% 50%',
    blurb:['Restaurants, cafés and bars that want full tables.','ร้านอาหาร คาเฟ่ และบาร์ ที่อยากให้โต๊ะเต็มทุกวัน','想要每天满座的餐厅、咖啡馆和酒吧。','Рестораны, кафе и бары, которым нужны полные залы.'],
    rows:[MP,POSTS,CAP,['Menu design updates','อัปเดตเมนู','菜单设计更新','Обновления меню'],['Promotion artwork','ภาพโปรโมชัน','促销设计','Промо-дизайн'],REELS],
    tiers:[
      {n:'Taste', p:22000, v:['y',12,'y',1,2,'n'], d:['For a new restaurant or café getting its name known.','สำหรับร้านอาหารหรือคาเฟ่เปิดใหม่ ที่อยากให้คนรู้จัก','适合新开餐厅或咖啡馆建立品牌知名度。','Идеально для новых ресторанов и кафе, строящих узнаваемость.']},
      {n:'Flavor', p:32000, v:['y',15,'y',2,4,2], d:['Keeps regulars coming back and brings new tables in.','ให้ลูกค้าประจำกลับมา และดึงลูกค้าใหม่เข้าร้าน','适合需要持续吸引顾客的餐厅。','Для ресторанов, желающих стабильного потока клиентов.']},
      {n:'Signature', p:52000, v:['y',20,'y','u',6,4], d:['Full marketing for fine dining rooms and growing groups.','การตลาดเต็มรูปแบบ สำหรับร้าน Fine Dining และร้านที่กำลังขยายสาขา','为精致餐厅或连锁店提供全面营销服务。','Полный маркетинг для ресторанов высокого класса или сетей.']}]},
  { name:['Automotive','ยานยนต์','汽车','Авто'], img:'/assets/cut-auto.webp', pos:'50% 50%',
    blurb:['Showrooms and dealers, from daily drivers to supercars.','โชว์รูมและดีลเลอร์ ตั้งแต่รถทั่วไปจนถึงซูเปอร์คาร์','从日常用车到超跑的展厅与经销商。','Автосалоны и дилеры, от повседневных авто до суперкаров.'],
    rows:[MP,['Car artwork','Artwork รถยนต์','汽车设计图','Дизайн для авто'],CAP,['Photo retouching','รีทัชภาพรถ','照片精修','Ретушь фото'],['Reels or video','Reels / วิดีโอ','Reels / 视频','Reels / видео'],['For-sale graphics','กราฟิก For Sale','销售图','Графика для продажи']],
    tiers:[
      {n:'Drive', p:25000, v:['y',10,'y',5,'n',5], d:['For showrooms and dealers building their presence online.','สำหรับโชว์รูมและดีลเลอร์ที่เริ่มสร้างตัวตนออนไลน์','适合展厅或经销商建立线上存在感。','Идеально для автосалонов, строящих онлайн-присутствие.']},
      {n:'Turbo', p:38000, v:['y',15,'y',10,2,10], d:['For dealers who want stock to move faster.','สำหรับดีลเลอร์ที่อยากขายรถได้เร็วขึ้น','为想要更快销售汽车的经销商提供出色内容。','Для дилеров, желающих продавать быстрее с помощью яркого контента.']},
      {n:'Supercar', p:58000, v:['y',20,'y','u',4,'u'], d:['Full service for premium showrooms that trade on image.','ดูแลครบวงจร สำหรับโชว์รูมพรีเมียมที่ภาพลักษณ์คือทุกอย่าง','为高端展厅提供全方位服务。','Полный сервис для премиум-автосалонов.']}]},
  { name:['Beauty & wellness','ความงามและสุขภาพ','美容与健康','Красота и велнес'], img:'/assets/cut-beauty.webp', pos:'50% 25%',
    blurb:['Clinics, spas and wellness brands.','คลินิก สปา และแบรนด์เวลเนส','诊所、水疗与健康品牌。','Клиники, спа и велнес-бренды.'],
    rows:[MP,POSTS,['Promotion designs','ออกแบบโปรโมชัน','促销设计','Промо-дизайн'],['Before and after','ภาพ Before & After','前后对比图','До и после'],REELS,['Review artwork','ภาพรีวิวลูกค้า','客户评价图','Отзывы клиентов']],
    tiers:[
      {n:'Glow', p:20000, v:['y',10,2,2,'n','n'], d:['For a new clinic or spa filling its first appointment books.','สำหรับคลินิกหรือสปาเปิดใหม่ ที่ต้องการลูกค้ากลุ่มแรก','适合新开诊所或水疗中心建立客户群。','Для новых клиник или спа, строящих базу клиентов.']},
      {n:'Radiance', p:30000, v:['y',15,4,4,2,2], d:['Consistent content that turns followers into bookings.','คอนเทนต์สม่ำเสมอ เปลี่ยนผู้ติดตามให้เป็นการจอง','适合需要持续内容来吸引预约的美容品牌。','Для бьюти-брендов, привлекающих записи через контент.']},
      {n:'Luxe', p:48000, v:['y',20,6,'u',4,'u'], d:['Full service for premium clinics and wellness brands.','ดูแลครบวงจร สำหรับคลินิกและแบรนด์เวลเนสระดับพรีเมียม','为高端诊所或健康品牌提供全方位服务。','Полный сервис для премиум-клиник и велнес-брендов.']}]},
  { name:['Retail & products','ค้าปลีกและสินค้า','零售与产品','Ритейл и товары'], img:'/assets/cut-retail.webp', pos:'50% 50%',
    blurb:['Online shops, SMEs and product brands.','ร้านออนไลน์ SME และแบรนด์สินค้า','网店、中小企业和产品品牌。','Интернет-магазины, МСБ и продуктовые бренды.'],
    rows:[MP,['Product artwork','Artwork สินค้า','产品设计图','Дизайн для товаров'],CAP,['Promotion banners','แบนเนอร์โปรโมชัน','促销横幅','Промо-баннеры'],['Product retouching','รีทัชภาพสินค้า','产品精修','Ретушь товаров'],['Reels or TikTok','Reels / TikTok','Reels / TikTok','Reels / TikTok']],
    tiers:[
      {n:'Launch', p:22000, v:['y',12,'y',2,5,'n'], d:['For online shops and SMEs selling through social media.','สำหรับร้านออนไลน์และ SME ที่ขายผ่านโซเชียลมีเดีย','适合希望通过社交媒体增加销售的网店或中小企业。','Для интернет-магазинов и МСБ, растущих через социальные сети.']},
      {n:'Scale', p:34000, v:['y',16,'y',4,10,2], d:['For brands growing sales online and in store.','สำหรับแบรนด์ที่อยากโตทั้งออนไลน์และหน้าร้าน','适合希望同时提升线上和线下销售的品牌。','Для брендов, растущих онлайн и офлайн.']},
      {n:'Empire', p:55000, v:['y',20,'y',6,'u',4], d:['Full service for premium brands ready to lead their category.','ดูแลครบวงจร สำหรับแบรนด์พรีเมียมที่พร้อมเป็นผู้นำตลาด','为准备主导市场的高端品牌提供全方位服务。','Полный сервис для премиум-брендов, готовых доминировать.']}]},
];
