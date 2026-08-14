export type Category = "single" | "blend" | "drip";

export interface Variant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  en: string;
  origin: string;
  category: Category;
  roast: number; // 1-5
  process: string;
  altitude: string;
  variety: string;
  flavors: string[];
  score: number; // SCA 杯测分
  badge?: string;
  desc: string;
  brew: { temp: string; ratio: string; grind: string };
  variants: Variant[];
  image: string;
}

export interface CartItem {
  productId: string;
  variant: number;
  qty: number;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  single: "单品产地",
  blend: "意式拼配",
  drip: "挂耳咖啡",
};

export const ROAST_LABEL = ["", "浅烘焙", "中浅烘焙", "中度烘焙", "中深烘焙", "深烘焙"];

export const FREE_SHIPPING_AT = 199;
export const SHIPPING_FEE = 12;

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/accf4968-a78b-4f1f-8644-b4a99a77086b/_result.png";

export const PRODUCTS: Product[] = [
  {
    id: "yirgacheffe-g1",
    name: "耶加雪菲 G1 · 科契尔",
    en: "Ethiopia Yirgacheffe Kochere",
    origin: "埃塞俄比亚 · 耶加雪菲产区",
    category: "single",
    roast: 2,
    process: "水洗处理",
    altitude: "1900 – 2100 m",
    variety: "当地原生种 Heirloom",
    flavors: ["茉莉花", "佛手柑", "柠檬红茶"],
    score: 87.5,
    badge: "招牌热卖",
    desc: "来自科契尔小镇周边小农的 G1 级樱桃，水洗处理让花香干净透亮。入口是茉莉与佛手柑交织的高扬香气，尾韵收在一杯温热的柠檬红茶里，酸质明亮而圆润，是很多人「喝懂精品咖啡」的第一支豆子。",
    brew: { temp: "91 – 92°C", ratio: "1 : 15", grind: "中细研磨（白砂糖大小）" },
    variants: [
      { label: "咖啡豆 200g", price: 78 },
      { label: "咖啡豆 450g", price: 152 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/0b84e58a-ba9e-417b-8f7a-ab246af4a3c0/_result.png",
  },
  {
    id: "kenya-aa",
    name: "肯尼亚 AA TOP · 涅里",
    en: "Kenya AA TOP Nyeri",
    origin: "肯尼亚 · 涅里产区",
    category: "single",
    roast: 2,
    process: "双重水洗干净处理",
    altitude: "1700 – 1800 m",
    variety: "SL28 / SL34",
    flavors: ["黑加仑", "乌梅", "红糖"],
    score: 88.0,
    badge: "杯测之选",
    desc: "涅里高地红火山土壤孕育的 AA TOP 批次，SL28 与 SL34 带来标志性的黑加仑果汁感。双重水洗让口感异常干净，中段乌梅般的成熟酸质缓缓展开，冷下来后是一整杯红糖水的甜感，层次分明得令人惊喜。",
    brew: { temp: "92 – 93°C", ratio: "1 : 14.5", grind: "中细研磨" },
    variants: [
      { label: "咖啡豆 200g", price: 88 },
      { label: "咖啡豆 450g", price: 172 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/ecc85c69-0d7c-4e73-a8ee-ce449183d4ce/_result.png",
  },
  {
    id: "huila-pink-bourbon",
    name: "哥伦比亚 慧兰 · 粉波旁",
    en: "Colombia Huila Pink Bourbon",
    origin: "哥伦比亚 · 慧兰产区",
    category: "single",
    roast: 3,
    process: "水洗处理 · 延长发酵",
    altitude: "1650 – 1750 m",
    variety: "Pink Bourbon 粉波旁",
    flavors: ["红苹果", "焦糖", "可可碎"],
    score: 86.5,
    desc: "粉波旁是慧兰山区近年最受瞩目的稀有品种，产量稀少、甜感突出。延长发酵赋予它红苹果般的柔嫩果酸，中段转为焦糖与太妃糖的甜，尾韵带一丝可可碎的微苦，平衡得刚刚好，怎么冲都不容易出错。",
    brew: { temp: "90 – 91°C", ratio: "1 : 15", grind: "中度研磨" },
    variants: [
      { label: "咖啡豆 200g", price: 68 },
      { label: "咖啡豆 450g", price: 132 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/9fd70f8c-7edb-429d-8e1d-7231e378fc32/_result.png",
  },
  {
    id: "yunnan-anaerobic",
    name: "云南 保山 · 厌氧日晒",
    en: "Yunnan Baoshan Anaerobic Natural",
    origin: "中国 · 云南保山潞江坝",
    category: "single",
    roast: 2,
    process: "厌氧日晒 · 96 小时",
    altitude: "1400 – 1500 m",
    variety: "卡蒂姆 Catimor 精选株系",
    flavors: ["草莓干", "红酒", "黑糖"],
    score: 85.5,
    badge: "新产季",
    desc: "潞江坝干热河谷的昼夜温差，让咖啡樱桃积累了远超寻常的糖分。96 小时厌氧发酵带来奔放的草莓干与红酒气息，入口甜感扎实如黑糖，口感圆润饱满。这是一支足以刷新你对云南咖啡印象的作品。",
    brew: { temp: "90 – 92°C", ratio: "1 : 15", grind: "中细研磨" },
    variants: [
      { label: "咖啡豆 200g", price: 58 },
      { label: "咖啡豆 450g", price: 112 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/bd0597eb-322a-4ae2-b2b4-0a506f4b4081/_result.png",
  },
  {
    id: "blackwhale-blend",
    name: "黑鲸 · 经典意式拼配",
    en: "Black Whale Espresso Blend",
    origin: "巴西 + 哥伦比亚 + 云南 三区拼配",
    category: "blend",
    roast: 5,
    process: "水洗 / 日晒 双处理拼配",
    altitude: "1100 – 1800 m 混合",
    variety: "黄波旁 · 卡杜拉 · 卡蒂姆",
    flavors: ["黑巧克力", "烤榛果", "枫糖浆"],
    score: 84.0,
    badge: "奶咖绝配",
    desc: "为浓缩与奶咖而生的深烘配方：巴西日晒提供厚重的黑巧克力基底，哥伦比亚水洗撑起结构，少量云南豆补足糖浆般的甜感。油脂丰盈绵密，与牛奶融合后是烤榛果与枫糖的味道，做拿铁几乎无敌。",
    brew: { temp: "93 – 94°C", ratio: "1 : 2（浓缩）", grind: "极细研磨（意式）" },
    variants: [
      { label: "咖啡豆 200g", price: 52 },
      { label: "咖啡豆 450g", price: 98 },
      { label: "咖啡豆 1kg", price: 188 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/693e8994-9627-439e-8b3a-a195f1d1c4a6/_result.png",
  },
  {
    id: "drip-morning",
    name: "晨光挂耳 · 综合装",
    en: "Morning Drip Bag Collection",
    origin: "埃塞俄比亚 + 哥伦比亚 双产地",
    category: "drip",
    roast: 3,
    process: "专业杯测后混合配比",
    altitude: "1650 – 2100 m 混合",
    variety: "Heirloom · 卡杜拉",
    flavors: ["柔和果酸", "坚果", "蜂蜜甜"],
    badge: "办公常备",
    score: 84.5,
    desc: "把精品咖啡装进一只挂耳里：每包含 10g 当周新鲜烘焙的咖啡粉，充氮锁鲜。撕开、挂上、注水 90 秒，办公室里也能喝到耶加雪菲的花香与哥伦比亚的甜。综合装随机搭配两支产地风味，每次都是小惊喜。",
    brew: { temp: "88 – 90°C", ratio: "1 包 : 150ml", grind: "已研磨（挂耳专用）" },
    variants: [
      { label: "10 包综合装", price: 45 },
      { label: "20 包综合装", price: 82 },
      { label: "30 包家庭装", price: 115 },
    ],
    image:
      "https://image.qwenlm.ai/generated-images/0c617938-df8e-43df-961b-a9129aa19acd/_result.png",
  },
];
