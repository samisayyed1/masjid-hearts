// Every visible string on the home page, header, footer and contact form, in English and Arabic.
// The Arabic home page lives at /ar/. Articles are English only, so Arabic links to them are marked EN.
export type Lang = 'en' | 'ar';

/** Arabic counted-noun form for "dollars" after a number (3–10: plural, 11–99: accusative singular, otherwise singular). */
export const arDollars = (n: number) => {
  const r = n % 100;
  if (n === 2) return 'دولارين';
  if (r >= 3 && r <= 10) return 'دولارات';
  if (r >= 11 && r <= 99) return 'دولارًا';
  return 'دولار';
};

export const t = {
  en: {
    meta: {
      tagline: 'Connect hearts to masajid, wherever they are',
      description:
        'Masjid Hearts is a global initiative that connects one gift to a growing network of masajid: building, restoring and keeping the doors open for houses of Allah in need.',
    },
    skip: 'Skip to content',
    nav: { home: 'Masjid Hearts home', menu: 'Menu', mission: 'Mission', how: 'How it works', journal: 'Journal', contact: 'Contact', give: 'Give monthly', other: 'العربية', otherLabel: 'اقرأ هذه الصفحة بالعربية' },
    footer: { explore: 'Explore', connect: 'Connect', touch: 'Get in touch', rss: 'RSS feed', note: 'Giving levels are symbolic. All contributions are pooled and allocated based on need.' },
    hero: {
      eyebrow: 'A global initiative for the houses of Allah',
      h1: 'Connect hearts to masajid,',
      h1em: 'wherever they are.',
      lede: 'One gift reaches a growing network of masajid, not just one. Together we build, repair and keep the doors open for houses of Allah in need.',
      cta: 'See how it works',
      cta2: 'Read the journal',
      facts: [
        ['One gift', 'A small monthly sadaqah, given once and renewed.'],
        ['Pooled together', 'Every contribution joins those of other givers.'],
        ['Sent where it is needed', 'Allocated to masajid according to need.'],
      ],
    },
    journal: { eyebrow: 'The Journal', h2: 'Short reads on masajid, and why they matter.', all: 'All articles', read: 'Read the article', min: 'min read' },
    mission: {
      eyebrow: 'Our mission',
      statement: 'To multiply your ongoing charity by connecting your heart to an entire',
      statementEm: 'global network of masajid.',
      p1: 'Most of us support one masjid: the one we pray in. Masjid Hearts lets a single donation reach across many communities worldwide, building, repairing and keeping the doors open for houses of Allah in urgent need.',
      p2: 'One simple gift, an ever-growing network of masajid, and multiplied sadaqah jariyah (continuous charity) for your akhirah.',
      work: [
        ['Build', 'A new masjid where a community has none.'],
        ['Restore', 'A masjid that has been damaged or has fallen into disrepair.'],
        ['Maintain', 'An existing place of worship, so it stays safe and open.'],
        ['Sustain', 'The community a masjid serves: its prayer, its Qur’an, its people.'],
      ],
    },
    how: {
      eyebrow: 'How it works',
      h2: 'One gift.',
      h2em: 'Many masajid.',
      lede: 'You do not choose a single building. Your sadaqah joins a shared fund, and the fund goes to the masajid whose need is greatest at the time.',
      steps: [
        ['You give a small amount each month', 'A steady gift, however modest, is what lets a masjid plan beyond this week.'],
        ['It is pooled with other givers', 'Small gifts combined are enough to lay a foundation or repair a roof.'],
        ['It is allocated by need', 'Funds go to building, restoring, maintaining or sustaining masajid where support is needed most.'],
      ],
      network: 'One heart at the bottom connected by lines to seven masajid above it.',
    },
    why: {
      alt: 'The prayer hall of a grand masjid: rows of red carpet running towards the mihrab beneath white arches and chandeliers.',
      quote: '“Whoever builds a masjid for Allah, Allah will build for him a house like it in Paradise.”',
      who: 'The Prophet Muhammad ﷺ',
      source: 'Sahih al-Bukhari 450 · Sahih Muslim 533',
    },
    give: {
      eyebrow: 'Choose your monthly impact',
      h2: 'Help build, restore and sustain masajid.',
      lede: 'For a small monthly contribution, you help masajid remain places where generations come together to pray, learn Qur’an and strengthen their communities.',
      perMonth: '/ month',
      fine: 'Giving levels are symbolic. All contributions are pooled and allocated based on the needs of masajid and the communities they serve.',
      levels: {
        10: { title: 'Support 1 masjid', line: 'Help support masajid and the communities they serve.' },
        50: { title: 'Support 5 masajid', line: 'Extend your support to more masajid and communities around the world.' },
        100: { title: 'Support 10 masajid', line: 'Make an even greater ongoing impact for masajid and the communities they serve.' },
      } as Record<number, { title: string; line: string }>,
      button: (n: number) => `Give $${n} a month`,
    },
    contact: {
      eyebrow: 'Get in touch',
      h2: 'Let’s keep the doors of a masjid open,',
      h2em: 'together.',
      lede: 'Whether you want to give, partner with us, or tell us about a masjid that needs help, we would love to hear from you.',
      who: [
        ['Giving', 'Ask how monthly giving works and how contributions are allocated.'],
        ['Masajid', 'Know of a masjid in need? Tell us about it.'],
        ['Working together', 'Questions, ideas and partnership enquiries are welcome.'],
      ],
      direct: 'Or write to us directly:',
      honeypot: 'Leave this empty',
      name: 'Your name',
      email: 'Email address',
      role: 'What brings you here?',
      roles: ['I would like to give or support', 'I want to tell you about a masjid in need', 'I represent an organisation', 'Something else'],
      message: 'Your message',
      send: 'Send message',
      js: {
        badEmail: 'Enter a valid email address so we can reply.',
        missing: 'Fill in every field so we can reply.',
        sending: 'Sending…',
        sent: 'Message sent. JazakAllahu khayran, we will reply soon.',
        failEmail: 'The message could not be sent. Email us at {email} instead.',
        fail: 'The message could not be sent. Check your connection and send it again.',
        mailApp: 'Your email app should now open with the message ready to send.',
        noInbox: 'This form is not connected to an inbox yet. Please check back shortly.',
        prefill: 'I would like to give ${amount} a month to Masjid Hearts. Please tell me how.',
      },
    },
  },

  ar: {
    meta: {
      tagline: 'نربط القلوب بالمساجد، أينما كانت',
      description:
        'مبادرة Masjid Hearts العالمية تربط عطاءك الواحد بشبكة متنامية من المساجد، فتبني بيوت الله وترمّمها وتُبقي أبوابها مفتوحةً حيث تشتدّ الحاجة.',
    },
    skip: 'انتقل إلى المحتوى',
    nav: { home: 'Masjid Hearts: الصفحة الرئيسية', menu: 'القائمة', mission: 'رسالتنا', how: 'كيف نعمل', journal: 'المدوّنة', contact: 'تواصل معنا', give: 'تبرّع شهريًا', other: 'English', otherLabel: 'Read this page in English' },
    footer: { explore: 'تصفّح', connect: 'تواصل', touch: 'راسلنا', rss: '', note: 'مستويات العطاء رمزية، وتُجمَع المساهمات كلّها وتُوزَّع بحسب الحاجة.' },
    hero: {
      eyebrow: 'مبادرة عالمية لعمارة بيوت الله',
      h1: 'نربط القلوب بالمساجد،',
      h1em: 'أينما كانت.',
      lede: 'عطاءٌ واحد يبلغ شبكةً متنامية من المساجد، لا مسجدًا واحدًا فحسب. معًا نبني بيوت الله ونرمّمها، ونُبقي أبوابها مفتوحةً حيث تشتدّ الحاجة.',
      cta: 'اكتشف كيف نعمل',
      cta2: 'ابدأ عطاءك الشهري',
      facts: [
        ['عطاءٌ واحد', 'صدقةٌ شهرية يسيرة، تبدؤها مرةً واحدة فتتجدّد كل شهر.'],
        ['يجتمع مع غيره', 'تنضمّ كل مساهمةٍ إلى مساهمات المتبرّعين الآخرين.'],
        ['يُوجَّه حيث الحاجة', 'يُوزَّع على المساجد بحسب حاجتها.'],
      ],
    },
    journal: { eyebrow: '', h2: '', all: '', read: '', min: '' },
    mission: {
      eyebrow: 'رسالتنا',
      statement: 'أن نضاعف أثر صدقتك الجارية بربط قلبك',
      statementEm: 'بشبكةٍ عالمية من المساجد.',
      p1: 'يدعم معظمنا مسجدًا واحدًا: المسجد الذي نصلّي فيه. أما مبادرة {brand} فتجعل التبرّع الواحد يمتدّ إلى مجتمعاتٍ كثيرة حول العالم، فيُسهم في بناء بيوت الله وترميمها وإبقاء أبوابها مفتوحةً حيث الحاجة ماسّة.',
      p2: 'عطاءٌ واحد بسيط، وشبكةٌ من المساجد تتّسع يومًا بعد يوم، وصدقةٌ جارية مضاعفة يُدَّخر أجرها لك في آخرتك بإذن الله.',
      work: [
        ['نبني', 'مسجدًا جديدًا لمجتمعٍ لا مسجد له.'],
        ['نرمّم', 'مسجدًا لحقه الضرر أو تهالك بنيانه.'],
        ['نصون', 'بيتًا من بيوت الله قائمًا، ليبقى آمنًا مفتوح الأبواب.'],
        ['نرعى', 'المجتمع الذي يخدمه المسجد: صلاته، وقرآنه، وأهله.'],
      ],
    },
    how: {
      eyebrow: 'كيف نعمل',
      h2: 'عطاءٌ واحد،',
      h2em: 'ومساجد كثيرة.',
      lede: 'لا تختار مبنًى بعينه، بل تنضمّ صدقتك إلى صندوقٍ مشترك يُوجَّه إلى المساجد الأشدّ حاجةً وقتَ التوزيع.',
      steps: [
        ['تتبرّع بمبلغٍ يسير كل شهر', 'العطاء الدائم، وإن قلّ، هو ما يُمكّن المسجد من أن يخطّط لما هو أبعد من أسبوعه.'],
        ['يجتمع مع عطاء الآخرين', 'التبرّعات الصغيرة إذا اجتمعت كفت لوضع أساس مسجد أو إصلاح سقفه.'],
        ['يُوزَّع بحسب الحاجة', 'تُوجَّه الأموال إلى بناء المساجد أو ترميمها أو صيانتها أو رعاية مجتمعاتها، حيث تكون الحاجة أشدّ.'],
      ],
      network: 'قلبٌ واحد في الأسفل تصله خطوطٌ بسبعة مساجد فوقه.',
    },
    why: {
      alt: 'قاعة الصلاة في مسجد كبير: صفوف من السجاد الأحمر تمتدّ نحو المحراب تحت أقواس بيضاء وثريّات.',
      quote: '«مَنْ بَنَى مَسْجِدًا لِلَّهِ، بَنَى اللَّهُ لَهُ فِي الْجَنَّةِ مِثْلَهُ»',
      who: 'رسول الله ﷺ',
      source: 'متفق عليه: صحيح البخاري (450) وصحيح مسلم (533)، واللفظ لمسلم',
    },
    give: {
      eyebrow: 'اختر أثرك الشهري',
      h2: 'أسهِم في بناء المساجد وترميمها ورعايتها.',
      lede: 'بمساهمةٍ شهرية يسيرة، تُعين المساجد على أن تظلّ بيوتًا تجتمع فيها الأجيال لتصلّي، وتتعلّم القرآن، وتوثّق أواصر مجتمعاتها.',
      perMonth: 'شهريًا',
      fine: 'مستويات العطاء رمزية؛ إذ تُجمَع المساهمات كلّها وتُوزَّع بحسب احتياجات المساجد ومجتمعاتها.',
      levels: {
        10: { title: 'ادعم مسجدًا واحدًا', line: 'أسهِم في دعم المساجد ومجتمعاتها.' },
        50: { title: 'ادعم خمسة مساجد', line: 'وسّع دعمك ليشمل مساجد ومجتمعاتٍ أكثر حول العالم.' },
        100: { title: 'ادعم عشرة مساجد', line: 'اترك أثرًا أعظم وأبقى في المساجد ومجتمعاتها.' },
      } as Record<number, { title: string; line: string }>,
      button: (n: number) => `تبرّع بـ${n} ${arDollars(n)} شهريًا`,
    },
    contact: {
      eyebrow: 'تواصل معنا',
      h2: 'لنُبقِ أبواب المساجد مفتوحةً،',
      h2em: 'معًا.',
      lede: 'سواءٌ أردتَ التبرّع، أم الشراكة معنا، أم إخبارنا بمسجدٍ يحتاج إلى العون، يسعدنا تواصلك معنا.',
      who: [
        ['العطاء', 'اسأل عن طريقة العطاء الشهري، وكيف تُوزَّع المساهمات.'],
        ['المساجد', 'أتعرف مسجدًا يحتاج إلى العون؟ أخبرنا به.'],
        ['التعاون', 'نرحّب بأسئلتك وأفكارك وعروض الشراكة.'],
      ],
      direct: 'أو راسلنا مباشرةً:',
      honeypot: 'اترك هذا الحقل فارغًا',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      role: 'ما سبب تواصلك؟',
      roles: ['أودّ التبرّع أو تقديم الدعم', 'أودّ إخباركم بمسجدٍ يحتاج إلى العون', 'أمثّل جهةً أو مؤسسة', 'أمرٌ آخر'],
      message: 'رسالتك',
      send: 'أرسل الرسالة',
      js: {
        badEmail: 'أدخل بريدًا إلكترونيًا صحيحًا لنتمكّن من الردّ عليك.',
        missing: 'يُرجى تعبئة جميع الحقول لنتمكّن من الردّ عليك.',
        sending: 'جارٍ الإرسال…',
        sent: 'وصلتنا رسالتك، جزاك الله خيرًا. سنردّ عليك قريبًا بإذن الله.',
        failEmail: 'تعذّر إرسال الرسالة. يمكنك مراسلتنا مباشرةً على {email}.',
        fail: 'تعذّر إرسال الرسالة. تحقّق من اتصالك بالإنترنت وأعد المحاولة.',
        mailApp: 'سيُفتح الآن تطبيق البريد لديك والرسالة جاهزة للإرسال.',
        noInbox: 'هذا النموذج غير مرتبط بصندوق بريد بعدُ. يُرجى المحاولة لاحقًا.',
        prefill: 'أودّ التبرّع بـ{amount} {usd} شهريًا لمبادرة Masjid Hearts، فكيف أبدأ؟',
      },
    },
  },
};
