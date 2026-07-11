// WORLD WAR — PASCKAL — vanilla JS (no framework, no build step)

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Accordion (Rules page, if used later) ---------- */
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const head = item.querySelector('.accordion-head');
    const panel = item.querySelector('.accordion-panel');
    if (!head || !panel) return;
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('is-open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Active nav state (top nav + bottom tab bar) ---------- */
  const currentPage = document.body.getAttribute('data-page');
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('data-nav') === currentPage) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Equipment page ---------- */
  const eqTabs = document.getElementById('eqTabs');
  const eqPanels = document.getElementById('eqPanels');
  if (eqTabs && eqPanels) renderEquipment(eqTabs, eqPanels);

  /* ---------- Form Builder (ساخت فرم) — only runs on forms.html ---------- */
  const pickerGrid = document.getElementById('formPickerGrid');
  const wizardBox = document.getElementById('formWizard');
  if (pickerGrid && wizardBox) initFormBuilder(pickerGrid, wizardBox);
});

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach((b) => b.classList.remove('is-active'));
      tabPanels.forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      const panel = document.querySelector(`.tab-panel[data-tab="${target}"]`);
      if (panel) panel.classList.add('is-active');
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

/* ============================================================
   EQUIPMENT DATA — تجهیزات
============================================================ */
const EQUIPMENT = [
  {
    key: 'missiles', title: 'موشک‌ها', icon: '🚀',
    items: [
      { icon:'🚀', name:'موشک قاهر', country:'ایران', flag:'🇮🇷', tags:['فراصوت','قدرت فتح ۵٪','کلاهک ۶ تنی'],
        price:'50,000,000 دلار', desc:['موشک بالستیک ایرانی با کلاهک جنگی ۶ تنی و سرعت فراصوت.'] },
      { icon:'🚀', name:'خرمشهر ۴', nameEn:'Khorramshahr 4', country:'ایران', flag:'🇮🇷', tags:['سال ساخت: 2023','طول: ۱۳ متر','⭐ اقتصادی‌ترین گزینه'],
        price:'10 میلیون دلار', desc:['موشک بالستیک میان‌برد با قابلیت حمل کلاهک‌های مختلف؛ مقرون‌به‌صرفه‌ترین گزینه‌ی این دسته.'] },
      { icon:'🚀', name:'DF-41', country:'چین', flag:'🇨🇳', tags:['سال ساخت: 2016','طول: ۲۱ متر','قاره‌پیما'],
        price:'20 میلیون دلار', desc:['موشک بالستیک قاره‌پیما با قابلیت حمل کلاهک هسته‌ای و برد بسیار بالا؛ از جدیدترین موشک‌های چین.'] },
      { icon:'🔥', name:'فتاح', nameEn:'Fattah', country:'ایران', flag:'🇮🇷', tags:['هایپرسونیک','سرعت +۵ ماخ'],
        price:'50 میلیون دلار', desc:[
          'نخستین موشک هایپرسونیک ایران، با مانورپذیری استثنایی در جو.',
          'مجهز به پیشرانه رم‌جت/استارجت هیبرید و سیستم هدایت پیشرفته.',
          'توانایی نفوذ به پیشرفته‌ترین سامانه‌های پدافندی دشمن.'
        ] },
      { icon:'🌊', name:'کروز تاماهاوک', nameEn:'Tomahawk', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['فقط از زیردریایی','کروز دریایی و سطحی'],
        price:'100,000,000 دلار', desc:[
          'موشک کروز بردبلند با پرواز دقیق و هدایت هوشمند، سرجنگی چندمنظوره برای اهداف سطحی و دریایی.',
          'توانایی عبور از دفاع هوایی و دور زدن سامانه‌های پدافندی دشمن.'
        ] },
      { icon:'🚀', name:'R-36M', country:'روسیه', flag:'🇷🇺', tags:['سال ساخت: 1970','طول: ۳۴.۳ متر','از قوی‌ترین‌های تاریخ'],
        price:'40 میلیون دلار', desc:['موشک بالستیک قاره‌پیما با قابلیت حمل کلاهک هسته‌ای و برد بسیار بالا.'] },
      { icon:'🚀', name:'Minuteman III', country:'ایالات متحده', flag:'🇺🇸', tags:['سال ساخت: 1970','طول: ۱۸.۲ متر','چند‌کلاهکی'],
        price:'30 میلیون دلار', desc:['موشک بالستیک قاره‌پیما با قابلیت حمل چند کلاهک هسته‌ای؛ جزء اصلی نیروی هسته‌ای آمریکا.'] },
    ]
  },
  {
    key: 'fighters', title: 'جنگنده‌ها', icon: '🚩',
    items: [
      { icon:'✈️', name:'F-35 Lightning II', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['نسل ۵','Stealth'],
        price:'90,000,000 دلار', desc:[
          'جنگنده چندمنظوره نسل پنجم با قابلیت پنهانکاری برای نفوذ به دفاع هوایی دشمن.',
          'رادار AESA و سنسورهای EOTS برای شناسایی و رهگیری دقیق اهداف.',
          'قابلیت اشتراک‌گذاری داده در لحظه با سایر یگان‌ها برای برتری اطلاعاتی.'
        ] },
      { icon:'🦅', name:'F-22 Raptor', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['نسل ۵','برتری هوایی'],
        price:'70,000,000 دلار', desc:[
          'جنگنده نسل پنجم با طراحی پنهان‌کار و توانایی برتری هوایی.',
          'موتورهای بردار رانش با قدرت مانور استثنایی در نبردهای نزدیک.'
        ] },
      { icon:'✈️', name:'F-16 Fighting Falcon', country:'آمریکا', flag:'🇺🇸', tags:['سال تولید: 1978','⭐ مناسب‌ترین از نظر تراز قیمت'],
        price:'40 میلیون دلار', desc:['جنگنده چندمنظوره با بهترین ارزش نسبت به قیمت در این دسته.'] },
      { icon:'✈️', name:'Mig-35', country:'روسیه', flag:'🇷🇺', tags:['سال تولید: 2017','نزدیک به F-22'],
        price:'60 میلیون دلار', desc:['برای نمایش قدرت هوایی روسیه ساخته شده؛ مانورپذیری و تجهیزات فوق‌پیشرفته.'] },
      { icon:'✈️', name:'Sukhoi Su-57', country:'روسیه', flag:'🇷🇺', tags:['سال تولید: 2019','رقیب F-35'],
        price:'80 میلیون دلار', desc:['فناوری استتار و رادارگریزی بالا؛ پیشرفته‌ترین جنگنده روسی با عملکرد کمتر از حد انتظار.'] },
      { icon:'✈️', name:'J-20', country:'چین', flag:'🇨🇳', tags:['نسل ۵','Stealth'],
        price:'80,000,000 دلار', desc:['پیشرفته‌ترین جنگنده چین برای عملیات در محیط‌های پدافند هوایی پیشرفته؛ سنسورهای پیشرفته و تسلیحات دوربرد.'] },
    ]
  },
  {
    key: 'defense', title: 'پدافندها', icon: '✨',
    items: [
      { icon:'🛰', name:'S-400', country:'روسیه', flag:'🇷🇺', tags:['سال ساخت: 2007','دوربرد'],
        price:'400 میلیون دلار', desc:['سیستم دفاع هوایی دوربرد برای نابودی هواپیما، موشک کروز و موشک‌های بالستیک کوتاه/میان/بلندبرد.'] },
      { icon:'🛡', name:'Iron Dome — گنبد آهنین', country:'اسرائیل', flag:'🇮🇱', tags:['سال ساخت: 2011','کوتاه‌برد'],
        price:'100 میلیون دلار', desc:['سیستم دفاع موشکی برای رهگیری راکت‌های کوتاه‌برد، به‌ویژه در مناطق پرجمعیت.'] },
      { icon:'🛰', name:'THAAD', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['سال ساخت: 2008','فاز پایانی/ارتفاع بالا'],
        price:'600 میلیون دلار', desc:['رهگیری موشک‌های بالستیک در فاز نهایی و ارتفاعات بالا؛ پوشش مناطق وسیع.'] },
      { icon:'🛡', name:'MIM-104 Patriot', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['دهه ۱۹۸۰','چندمنظوره'],
        price:'500 میلیون دلار', desc:['دفاع هوایی چندمنظوره در برابر هواپیما، موشک کروز و موشک‌های بالستیک تاکتیکی.'] },
      { icon:'🛰', name:'HQ-9', country:'چین', flag:'🇨🇳', tags:['دهه ۱۹۹۰','دوربرد'],
        price:'300 میلیون دلار', desc:['سیستم دفاع هوایی دوربرد در برابر هواپیما، موشک کروز و موشک بالستیک تاکتیکی.'] },
    ]
  },
  {
    key: 'navy', title: 'نیروی دریایی', icon: '🛥',
    items: [
      { icon:'🛢', name:'نفت‌کش', tags:['ظرفیت: ۱۰۰ بشکه نفت','⚠️ بدون این کشتی امکان دریافت نفت از کشور دیگر نیست'],
        price:'30,000,000 دلار', desc:['کشتی جابه‌جایی نفت؛ برای خرید و انتقال نفت از کشورهای دیگر الزامی است.'] },
      { icon:'⚓', name:'ناوشکن دنا', nameEn:'Dena', country:'ایران', flag:'🇮🇷', tags:['کلاس موج','اتوماسیون کامل'],
        price:'200,000,000 دلار', desc:[
          'مدرن‌ترین ناوشکن ایرانی با سامانه‌های تمام‌دیجیتال و رادار آرایه فازی بومی.',
          'موشک سطح‌به‌سطح و پدافند هوایی همزمان؛ مناسب مأموریت‌های دوربرد و فرماندهی ناوگروه.'
        ] },
      { icon:'⚓', name:'رزم‌ناو', tags:['دفاع از ناو'],
        price:'100,000,000 دلار', desc:['ناو محافظ؛ وظیفه‌اش دفاع از ناوگان در برابر تهدیدات است.'] },
      { icon:'🛳', name:'ناو هواپیمابر آبراهام لینکن', nameEn:'Abraham Lincoln', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['هسته‌ای','ظرفیت +۷۵ هواگرد'],
        price:'5 میلیارد دلار', desc:[
          'جدیدترین نسل ناوهای هواپیمابر هسته‌ای آمریکا با دو راکتور A1B.',
          'منجنیق پرتاب الکترومغناطیسی (EMALS) و سامانه فرود پیشرفته AAG.',
          'دفاع چندلایه و امضای راداری کاهش‌یافته نسبت به نسل قبل.'
        ] },
      { icon:'🛳', name:'Admiral Kuznetsov', country:'روسیه', flag:'🇷🇺', tags:['حامل جنگنده Su-33'],
        price:'4 میلیارد دلار', desc:['ناو هواپیمابر روسی با قابلیت حمل جنگنده و هلیکوپتر نظامی و سامانه‌های دفاع هوایی.'] },
      { icon:'🚢', name:'زیردریایی Kilo-class', country:'روسیه', flag:'🇷🇺', tags:['۱۰ اژدر + قابلیت تاماهاوک','کم‌صدا'],
        price:'1,000,000,000 دلار', desc:[
          'زیردریایی دیزلی-برقی با سکوت بالا، مناسب کمین در تنگه‌ها و عملیات ساحلی.',
          '۱۰ اژدر برای جنگ دریایی؛ اصابت کامل اژدرها می‌تواند تا ۸۰٪ یک ناو هواپیمابر را نابود کند.'
        ] },
    ]
  },
  {
    key: 'drones', title: 'پهپادها', icon: '✈️',
    items: [
      { icon:'💥', name:'Shahed-136', country:'ایران', flag:'🇮🇷', tags:['انتحاری / کروز کوچک','ارزان و انبوه'],
        price:'100,000 دلار', desc:['پهپاد انتحاری با هزینه-اثربخشی بالا؛ فاقد توان بازگشت، مناسب فشار بر دفاع‌های نقطه‌ای.'] },
      { icon:'🛩', name:'MQ-9 Reaper', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['سال ساخت: 2007','شناسایی و حمله'],
        price:'10 میلیون دلار', desc:['پهپاد چندمنظوره برای شناسایی، مراقبت و حملات دقیق.'] },
    ]
  },
  {
    key: 'bombers', title: 'بمب‌افکن‌ها', icon: '🏴‍☠️',
    items: [
      { icon:'✈️', name:'Tupolev Tu-160', country:'روسیه', flag:'🇷🇺', tags:['سال ساخت: 1981','بزرگ‌ترین بمب‌افکن جهان'],
        price:'350 میلیون دلار', desc:['قابلیت حمل کلاهک اتمی و خزانه‌ی بزرگ.'] },
      { icon:'✈️', name:'Xian H-6', country:'چین', flag:'🇨🇳', tags:['سال ساخت: 1959','میان‌رده'],
        price:'150 میلیون دلار', desc:['بمب‌افکن میان‌رده تحت لیسانس توپولف-۱۶.'] },
      { icon:'✈️', name:'B-2 Spirit', country:'ایالات متحده آمریکا', flag:'🇺🇸', tags:['Stealth','برد طولانی'],
        price:'1,000,000,000 دلار', desc:[
          'بمب‌افکن استراتژیک با پنهانکاری بالا و برد بسیار طولانی.',
          'توانایی حمل بمب‌های هسته‌ای و متعارف با دقت بالا در نفوذ به خطوط دفاعی دشمن.'
        ] },
    ]
  },
  {
    key: 'helicopter', title: 'بالگرد', icon: '🚁',
    items: [
      { icon:'🚁', name:'بالگرد ترابری', tags:['ظرفیت: ۱٬۰۰۰ سرباز'],
        price:'10,000,000 دلار', desc:['برای جابه‌جایی سرباز و نفرات؛ هر بالگرد تا ۱۰۰۰ سرباز جابه‌جا می‌کند.'] },
    ]
  },
  {
    key: 'bombs', title: 'بمب‌ها', icon: '💣',
    items: [
      { icon:'💣', name:'بمب GLS', tags:['فقط با جنگنده/بمب‌افکن','تخریب بالا'],
        price:'5,000,000 دلار', desc:['بمب استاندارد جنگنده و بمب‌افکن با قدرت تخریب بالا.'] },
      { icon:'☢️', name:'بمب اتم', tags:['قدرت فتح ۲۰٪','⚠️ نیازمند مجوز'],
        price:'500,000,000 دلار', desc:[
          'قابل استفاده با جنگنده یا بمب‌افکن؛ حتی در صورت ساقط شدن حامل، تشعشعات آن باعث بیماری‌های گسترده می‌شود.',
          'استفاده بدون مجوز مجاز نیست.'
        ] },
      { icon:'☢️', name:'کلاهک هسته‌ای', tags:['قدرت فتح ۱۰٪','رهگیری راحت ✅'],
        price:'200,000,000 دلار', desc:['کلاهک هسته‌ای قابل نصب روی موشک‌های بالستیک.'] },
      { icon:'🚀', name:'بالستیک ساده', tags:['برد کم','هر ۱۰ عدد = ۱٪ فتح'],
        price:'500,000 دلار', desc:['موشک بالستیک ساده و ارزان با برد کم؛ برای فتح تدریجی باید به تعداد بالا استفاده شود.'] },
    ]
  },
  {
    key: 'industry', title: 'معادن و پالایشگاه', icon: '🏭',
    items: [
      { icon:'🛢', name:'پالایشگاه نفت', tags:['تولید روزانه: ۱۰ بشکه'],
        price:'50,000,000 دلار', desc:['هر پالایشگاه روزی ۱۰ بشکه نفت تولید می‌کند.'] },
      { icon:'⛏', name:'معدن درآمدزا', tags:['درآمد: 100,000,000 دلار'],
        price:'150,000,000 دلار', desc:['سرمایه‌گذاری بلندمدت با بازگشت سرمایه‌ی بالا.'] },
    ]
  },
  {
    key: 'ground', title: 'نیروی زمینی', icon: '🗽',
    items: [
      { icon:'🪖', name:'سرباز', tags:['هر ۱ میلیون سرباز = ۱ میلیارد دلار','⚠️ سقف: ۱ میلیون سرباز برای هر کشور/گروهک'],
        price:'1 میلیارد دلار / ۱ میلیون نفر', desc:['حداکثر جذب سرباز برای هر کشور یا گروهک ۱ میلیون نفر است؛ بیشتر از این مقدار قابل خرید نیست.'] },
      { icon:'🛡', name:'M1 Abrams', country:'ایالات متحده', flag:'🇺🇸', tags:['سال ساخت: 1980','تانک اصلی'],
        price:'100 میلیون دلار', desc:['تانک اصلی میدان نبرد با زره قوی، قدرت آتش بالا و تحرک خوب.'] },
      { icon:'🛡', name:'T-14 Armata', country:'روسیه', flag:'🇷🇺', tags:['سال ساخت: 2015','برجک بدون سرنشین'],
        price:'80 میلیون دلار', desc:['پلتفرم نسل‌جدید تانک روسی با سیستم دفاع فعال و قدرت آتش بالا.'] },
      { icon:'🛡', name:'Challenger 2', country:'بریتانیا', flag:'🇬🇧', tags:['سال ساخت: 1994','ایمن‌ترین برای خدمه'],
        price:'50 میلیون دلار', desc:['تانک اصلی میدان نبرد بریتانیا با زره بسیار مقاوم و سیستم هدف‌گیری دقیق.'] },
    ]
  },
];

function renderEquipment(tabsEl, panelsEl) {
  tabsEl.innerHTML = EQUIPMENT.map((cat, i) => `
    <button class="tab-btn ${i === 0 ? 'is-active' : ''}" data-tab="${cat.key}">${cat.icon} ${cat.title}</button>
  `).join('');

  panelsEl.innerHTML = EQUIPMENT.map((cat, i) => `
    <div class="tab-panel ${i === 0 ? 'is-active' : ''}" data-tab="${cat.key}">
      <div class="item-grid">
        ${cat.items.map((it) => `
          <div class="item-card">
            <div class="item-head">
              <span class="item-emoji">${it.icon}</span>
              <span class="item-names">
                <b>${it.name}</b>
                <span>${[it.nameEn, it.flag, it.country].filter(Boolean).join(' · ')}</span>
              </span>
            </div>
            ${it.tags && it.tags.length ? `
              <div class="item-block-label">مشخصات</div>
              <div>${it.tags.map((t) => `<span class="eq-tag">${t}</span>`).join('')}</div>
            ` : ''}
            <div class="item-block-label">توضیحات</div>
            ${it.desc.map((d) => `<p class="eq-desc">${d}</p>`).join('')}
            <div class="output-line">💰 قیمت: ${it.price}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  initTabs();
}

/* ============================================================
   FORM DEFINITIONS — ساخت فرم (PASCKAL)
============================================================ */
const MGMT_ID = 'https://rubika.ir/Phhantom';

function genericCompile(form, v) {
  const lines = form.fields
    .filter((f) => !f.skipInOutput)
    .map((f) => `|🔹| - ${f.label} : ${(v[f.key] || '').toString().replaceAll('\n', '\n     ')}`);
  let out = `📋 ${form.title}\n━━━━━━━━━━━━━━━━━━━━━━\n\n${lines.join('\n')}`;
  if (form.trailer) out += `\n\n${form.trailer(v)}`;
  return out;
}

const ADMIN_PLACEHOLDER = '(توسط مدیریت تکمیل می‌شود)';

const WW_FORMS = [
  {
    key: 'war_roll', icon: '🪖', title: 'فرم رول جنگی', sub: 'ثبت رسمی یک عملیات نظامی',
    fields: [
      { key:'attacker', label:'🌍 نام کشور حمله‌کننده', type:'text' },
      { key:'defender', label:'🛡 نام کشور مدافع', type:'text' },
      { key:'attack_type', label:'🎯 نوع حمله', type:'text' },
      { key:'equipment', label:'🚀 تجهیزات به کار رفته', type:'text', hint:'چند مورد رو با ، از هم جدا کن' },
      { key:'description', label:'📝 توضیحات عملیات', type:'textarea', hint:'حداقل ۵ خط، بدون محدودیت در حداکثر' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'sabotage_roll', icon: '💣', title: 'فرم رول خرابکاری', sub: 'ثبت یک عملیات خرابکارانه',
    fields: [
      { key:'executor', label:'🌍 نام کشور اجراکننده', type:'text' },
      { key:'target', label:'🎯 کشور هدف', type:'text' },
      { key:'description', label:'📝 شرح کامل عملیات و نحوه اجرا', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'uprising_roll', icon: '🔥', title: 'فرم رول شورش', sub: 'ثبت یک عملیات براندازی',
    fields: [
      { key:'executor', label:'🌍 نام کشور اجراکننده', type:'text' },
      { key:'target', label:'📍 کشور هدف', type:'text' },
      { key:'description', label:'📝 توضیحات عملیات', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'disease_roll', icon: '🦠', title: 'فرم رول بیماری', sub: 'ثبت یک عملیات بیولوژیک',
    fields: [
      { key:'initiator', label:'🌍 نام کشور آغازکننده', type:'text' },
      { key:'target', label:'📍 کشور هدف', type:'text' },
      { key:'disease_name', label:'🦠 نام بیماری', type:'text' },
      { key:'spread_method', label:'🎯 روش انتشار', type:'text' },
      { key:'description', label:'📝 توضیحات رول', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'country_purchase', icon: '💰', title: 'فرم خرید کشور', sub: 'ثبت بودجه و لیست خرید کشور',
    fields: [
      { key:'country', label:'✦ اسم کشور', type:'text' },
      { key:'budget', label:'✦ بودجه کشور', type:'text' },
      { key:'shopping_list', label:'✦ لیست خرید', type:'textarea', hint:'هر آیتم رو در یک خط بنویس' },
      { key:'purchase_price', label:'✦ قیمت خرید', type:'text' },
      { key:'income', label:'✦ درآمد از خرید (در صورت داشتن)', type:'text' },
      { key:'remaining', label:'✦ باقی‌مانده', type:'text' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'naval_deploy', icon: '🚢', title: 'فرم اعزام ناوگان دریایی', sub: 'اعزام و استقرار ناوگان جنگی',
    fields: [
      { key:'sender', label:'🌍 نام کشور اعزام‌کننده', type:'text' },
      { key:'destination', label:'📍 مقصد و محل استقرار ناوگان', type:'text' },
      { key:'ship_count', label:'🚢 تعداد ناوهای اعزامی', type:'number' },
      { key:'escort_level', label:'🛡 سطح اسکورت و حفاظت ناوگان', type:'text' },
      { key:'cargo', label:'📦 محموله و تجهیزات درون ناوگان', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'economic_roll', icon: '💼', title: 'فرم رول اقتصادی', sub: 'ثبت یک سرمایه‌گذاری',
    fields: [
      { key:'country', label:'🌍 نام کشور', type:'text' },
      { key:'subject', label:'💼 موضوع سرمایه‌گذاری', type:'text' },
      { key:'amount', label:'💰 مقدار سرمایه‌گذاری', type:'text' },
      { key:'location', label:'📍 محل اجرای سرمایه‌گذاری', type:'text' },
      { key:'roll', label:'📝 رول سرمایه‌گذاری', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'transport_deploy', icon: '🛳', title: 'فرم اعزام کشتی ترابری', sub: 'اعزام محموله دریایی',
    fields: [
      { key:'sender', label:'🌍 نام کشور اعزام‌کننده', type:'text' },
      { key:'destination', label:'📍 مقصد و محل تخلیه بار', type:'text' },
      { key:'ship_count', label:'🚢 تعداد کشتی‌های ترابری', type:'number' },
      { key:'escort_level', label:'🛡 سطح اسکورت و حفاظت کاروان دریایی', type:'text' },
      { key:'cargo', label:'📦 محموله و میزان بار', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'security_boost', icon: '🛡', title: 'فرم تقویت امنیت کشور', sub: 'ثبت یک طرح امنیتی',
    fields: [
      { key:'country', label:'🌍 نام کشور', type:'text' },
      { key:'action_type', label:'🛡 نوع اقدام امنیتی', type:'text' },
      { key:'location', label:'📍 منطقه یا محل اجرای طرح', type:'text' },
      { key:'budget', label:'💰 بودجه اختصاص‌یافته', type:'text' },
      { key:'goal', label:'🎯 هدف از اجرای طرح', type:'text' },
      { key:'level', label:'📈 سطح تقویت امنیت', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'defense_roll', icon: '🛡', title: 'فرم رول دفاعی', sub: 'ثبت واکنش دفاعی به یک تهدید',
    fields: [
      { key:'country', label:'🌍 نام کشور', type:'text' },
      { key:'threat_type', label:'🛡 نوع تهدید', type:'text' },
      { key:'description', label:'📝 شرح رول دفاعی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'group_deploy', icon: '👥', title: 'فرم استقرار گروه', sub: 'ثبت استقرار یک گروهک',
    fields: [
      { key:'country', label:'🌍 نام کشور', type:'text' },
      { key:'group_name', label:'👥 نام گروه', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'country_signer', label:'✅ تایید کشور (امضای شما)', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'research', icon: '🔬', title: 'فرم تحقیقات', sub: 'ثبت یک پروژه تحقیقاتی',
    fields: [
      { key:'research_type', label:'🔬 نوع تحقیقات', type:'text' },
      { key:'capital_used', label:'💰 مقدار سرمایه مصرفی', type:'text' },
      { key:'research_staff', label:'👨‍🔬 نیروهای تحقیقاتی', type:'text' },
      { key:'expected_result', label:'🎖 نتیجه یا دستاورد مورد نظر', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'espionage_roll', icon: '🕵️', title: 'فرم رول جاسوسی', sub: 'ثبت یک عملیات اطلاعاتی',
    fields: [
      { key:'country', label:'🌍 نام کشور', type:'text' },
      { key:'target', label:'🎯 کشور هدف', type:'text' },
      { key:'spy_type', label:'🕵️ نوع جاسوسی', type:'text' },
      { key:'intel_units', label:'👥 یگان‌های اطلاعاتی استفاده‌شده', type:'text' },
      { key:'investment', label:'💰 مقدار سرمایه‌گذاری', type:'text' },
      { key:'goal', label:'🎯 هدف عملیات جاسوسی', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'blackmarket_list', icon: '🕶', title: 'فرم ثبت تجهیزات در بلک مارکت', sub: 'ثبت آیتم برای فروش در بازار سیاه',
    fields: [
      { key:'seller_country', label:'🌍 نام کشور فروشنده', type:'text' },
      { key:'item_name', label:'📦 نام تجهیز یا آیتم', type:'text' },
      { key:'quantity', label:'🔢 تعداد', type:'number' },
      { key:'proposed_price', label:'💰 قیمت پیشنهادی', type:'text' },
      { key:'condition', label:'📊 وضعیت کالا', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
    trailer: () => `✅ تأیید مدیریت بلک مارکت : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'treaty', icon: '📜', title: 'فرم توافقات', sub: 'ثبت یک قرارداد رسمی بین کشورها',
    fields: [
      { key:'countries', label:'🚩 نام کشورهای درون توافق', type:'text' },
      { key:'contract_type', label:'📑 نوع قرارداد', type:'text' },
      { key:'goal', label:'🎯 هدف قرارداد', type:'text' },
      { key:'duty1', label:'📋 تعهدات کشور اول', type:'textarea' },
      { key:'duty2', label:'📋 تعهدات کشور دوم', type:'textarea' },
      { key:'duration', label:'⏳ مدت اعتبار قرارداد', type:'text' },
      { key:'exec_date', label:'📅 تاریخ اجرای قرارداد', type:'date' },
      { key:'termination_terms', label:'⚠️ شرایط فسخ قرارداد', type:'textarea' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer1', label:'✍️ تأیید کشور اول (امضای شما)', type:'text' },
    ],
    trailer: () => `✍️ تأیید کشور دوم : \n✅ تأیید مدیریت پاسکال : ${ADMIN_PLACEHOLDER}`,
  },
  {
    key: 'negotiation_request', icon: '🤝', title: 'فرم درخواست مذاکره', sub: 'ثبت درخواست مذاکره بین کشورها',
    fields: [
      { key:'countries', label:'🚩 نام کشورهای درون مذاکره', type:'text' },
      { key:'topic', label:'🎯 موضوع مذاکره', type:'text' },
      { key:'location', label:'📍 محل برگزاری مذاکره', type:'text' },
      { key:'proposals', label:'📜 پیشنهادات و شرایط', type:'textarea' },
      { key:'validity', label:'⏳ مدت اعتبار پیشنهاد', type:'text' },
      { key:'notes', label:'📝 توضیحات تکمیلی', type:'textarea' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
  {
    key: 'oil_trade', icon: '🛢', title: 'فرم خرید و فروش نفت', sub: 'ثبت مبادله نفت بین کشورها',
    fields: [
      { key:'sender_country', label:'✦ کشور ارسال‌کننده نفت‌کش', type:'text' },
      { key:'receiver_country', label:'✦ کشور دریافت‌کننده', type:'text' },
      { key:'barrel_count', label:'✦ تعداد بشکه‌ها', type:'number' },
      { key:'tanker_count', label:'✦ تعداد نفت‌کش', type:'number' },
      { key:'signer', label:'🖋 نام / امضای ثبت‌کننده', type:'text' },
    ],
  },
];

WW_FORMS.forEach((f) => { if (!f.compile) f.compile = (v) => genericCompile(f, v); });

/* ============================================================
   Wizard engine
============================================================ */
function initFormBuilder(pickerGrid, wizardBox) {
  let state = null; // { form, step, values }

  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  function renderPicker() {
    pickerGrid.innerHTML = WW_FORMS.map((f, i) => `
      <button class="form-pick-card" data-index="${i}">
        <span class="fp-icon">${f.icon}</span>
        <span>
          <span class="fp-title">${f.title}</span>
          <span class="fp-sub">${f.sub}</span>
        </span>
      </button>
    `).join('');

    pickerGrid.querySelectorAll('.form-pick-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const form = WW_FORMS[Number(btn.getAttribute('data-index'))];
        state = { form, step: 0, values: {} };
        pickerGrid.style.display = 'none';
        wizardBox.style.display = 'block';
        renderWizard();
        wizardBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function backToPicker() {
    state = null;
    wizardBox.style.display = 'none';
    wizardBox.innerHTML = '';
    pickerGrid.style.display = 'grid';
    pickerGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function fieldInputHtml(field, currentVal) {
    if (field.type === 'textarea') {
      return `<textarea class="field-textarea" id="fbInput">${currentVal || ''}</textarea>`;
    }
    if (field.type === 'date') {
      return `<input class="field-input" id="fbInput" type="date" value="${currentVal || ''}">`;
    }
    if (field.type === 'number') {
      return `<input class="field-input" id="fbInput" type="number" min="0" value="${currentVal ?? ''}" placeholder="عدد وارد کن">`;
    }
    return `<input class="field-input" id="fbInput" type="text" value="${(currentVal || '').toString().replace(/"/g, '&quot;')}" placeholder="اینجا بنویس...">`;
  }

  function readFieldValue() {
    const el = document.getElementById('fbInput');
    return el ? el.value.trim() : '';
  }

  function fieldHasValue() {
    const el = document.getElementById('fbInput');
    return el && el.value.trim().length > 0;
  }

  function renderWizard() {
    const { form, step, values } = state;
    const totalSteps = form.fields.length;

    if (step < totalSteps) {
      const field = form.fields[step];
      const pct = Math.round((step / (totalSteps + 1)) * 100);
      const currentVal = values[field.key];

      wizardBox.innerHTML = `
        <button class="wizard-back" id="fbBackToPicker">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>
          انتخاب فرم دیگر
        </button>
        <div class="wizard-progress">مرحله ${step + 1} از ${totalSteps} — ${form.title}</div>
        <div class="wizard-track"><div class="wizard-track-fill" style="width:${pct}%"></div></div>
        <div class="field-group">
          <label class="field-label">${field.label}</label>
          ${fieldInputHtml(field, currentVal)}
          ${field.hint ? `<span class="field-hint">${field.hint}</span>` : ''}
        </div>
        <div class="wizard-actions">
          ${step > 0 ? `<button class="btn btn-ghost" id="fbPrev">بازگشت</button>` : ''}
          <button class="btn btn-gold" id="fbNext">${step === totalSteps - 1 ? 'تکمیل فرم ✅' : 'بعدی ←'}</button>
        </div>
      `;

      document.getElementById('fbBackToPicker').addEventListener('click', backToPicker);
      if (step > 0) {
        document.getElementById('fbPrev').addEventListener('click', () => {
          values[field.key] = readFieldValue();
          state.step -= 1;
          renderWizard();
        });
      }
      document.getElementById('fbNext').addEventListener('click', () => {
        if (!fieldHasValue()) {
          showToast('⚠️ این بخش خالیه، پرش کن');
          return;
        }
        values[field.key] = readFieldValue();
        state.step += 1;
        renderWizard();
      });
    } else {
      const text = form.compile(values);
      wizardBox.innerHTML = `
        <button class="wizard-back" id="fbBackToPicker">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>
          انتخاب فرم دیگر
        </button>
        <div class="wizard-progress">✅ فرم تکمیل شد — ${form.title}</div>
        <div class="compiled-box">${text.replace(/</g, '&lt;')}</div>
        <div class="wizard-actions">
          <button class="btn btn-ghost" id="fbEdit">✏️ ویرایش آخرین بخش</button>
          <button class="btn btn-ghost" id="fbCopy">📋 کپی متن</button>
        </div>
        <div class="mgmt-cta">
          <span class="mgmt-ic">🎖</span>
          <span class="mgmt-text"><b>ارسال برای مدیریت پاسکال</b>متن رو کپی کن و برای آیدی مدیریت بازی بفرست تا ثبت رسمی بشه.</span>
        </div>
        <div class="wizard-actions">
          <a class="btn btn-gold" id="fbSubmit" href="${MGMT_ID}" target="_blank" rel="noopener">📨 ارسال به مدیریت (${MGMT_ID.replace('https://rubika.ir/','@')})</a>
        </div>
        <div class="wizard-actions">
          <button class="btn btn-ghost" id="fbRestart">🔄 ساخت یک فرم جدید</button>
        </div>
      `;

      document.getElementById('fbBackToPicker').addEventListener('click', backToPicker);
      document.getElementById('fbEdit').addEventListener('click', () => {
        state.step -= 1;
        renderWizard();
      });
      document.getElementById('fbCopy').addEventListener('click', () => {
        copyText(text);
        showToast('📋 متن کپی شد');
      });
      document.getElementById('fbSubmit').addEventListener('click', () => {
        copyText(text);
        showToast('📋 متن کپی شد؛ داخل چت مدیریت پیست و ارسال کن');
      });
      document.getElementById('fbRestart').addEventListener('click', backToPicker);
    }
  }

  renderPicker();
}
