# Regenerates .pages.yml (the browser editor's form layout) from the site text files.
# Run after adding a new key to src/content/site/home.en.json:  python3 scripts/cms-config.py
import copy, json, yaml, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
en = json.loads((root / 'src/content/site/home.en.json').read_text())

GROUP = {'meta': 'Search engines and link previews', 'nav': 'Menu', 'footer': 'Footer', 'hero': 'Top of the page', 'journal': 'Journal section',
         'mission': 'Mission section', 'how': 'How it works section', 'why': 'Photo and hadith section', 'give': 'Monthly giving section',
         'contact': 'Contact section', 'js': 'Form messages', 'skip': '"Skip to content" link (screen readers)'}
HINT = {'h1': 'Headline, first line', 'h1em': 'Headline, second line (gold italics)', 'h2': 'Heading', 'h2em': 'Heading ending (gold italics)',
        'statement': 'Statement', 'statementEm': 'Statement ending (gold italics)', 'p1': 'Paragraph 1', 'p2': 'Paragraph 2',
        'lede': 'Intro paragraph', 'eyebrow': 'Small label above the heading', 'cta': 'First button', 'cta2': 'Second button',
        'facts': 'Three short points', 'work': 'Four pillars', 'steps': 'Steps', 'who': 'Reasons to get in touch', 'roles': 'Options in "What brings you here?"',
        'alt': 'Describe the photo (for screen readers)', 'quote': 'Quote', 'who_why': 'Who said it', 'source': 'Source reference',
        'fine': 'Small print', 'perMonth': '"per month" wording', 'levels': 'Giving level text (same order as the amounts in Site settings)',
        'network': 'Description of the network drawing (for screen readers)'}
DESC = {'p1': '{brand} is replaced with the organisation name.', 'button': '{amount} is replaced with the amount. In Arabic, {usd} becomes the right word for dollars.',
        'prefill': 'Pre-written in the form when someone clicks a giving button. {amount} and {usd} as above.', 'failEmail': '{email} is replaced with your address.'}
LONG = {'lede', 'description', 'p1', 'p2', 'text', 'line', 'fine', 'quote', 'alt', 'network', 'statement', 'prefill', 'sent', 'fail', 'failEmail', 'noInbox', 'mailApp', 'badEmail', 'missing'}

def field(k, v, parent=None):
    label = GROUP.get(k) or (HINT.get('who_why') if (k == 'who' and parent == 'why') else HINT.get(k)) or k[0].upper() + k[1:]
    f = {'name': k, 'label': label}
    if k in DESC: f['description'] = DESC[k]
    if isinstance(v, dict):
        f.update(type='object', fields=[field(kk, vv, k) for kk, vv in v.items()])
    elif isinstance(v, list) and v and isinstance(v[0], dict):
        f.update(type='object', list=True, fields=[{'name': kk, 'label': kk.capitalize(), 'type': 'text' if kk in LONG else 'string'} for kk in v[0]])
    elif isinstance(v, list):
        f.update(type='string', list=True)
    else:
        f['type'] = 'text' if k in LONG else 'string'
    return f

home_fields = [field(k, v) for k, v in en.items()]

settings_fields = [
    {'name': 'name', 'label': 'Organisation name', 'type': 'string', 'required': True},
    {'name': 'email', 'label': 'Contact email', 'type': 'string', 'description': 'Shown in the footer. The contact form sends to it (opens the visitor\'s email app) unless a form service URL is set.'},
    {'name': 'formEndpoint', 'label': 'Form service URL (optional)', 'type': 'string', 'description': 'e.g. a Formspree or Basin form URL. When set, the contact form sends messages straight there.'},
    {'name': 'donateUrl', 'label': 'Donation page link', 'type': 'string', 'description': 'Where every "Give" button goes. Leave empty to send people to the contact form instead.'},
    {'name': 'social', 'label': 'Social links', 'type': 'object', 'description': 'Full links starting with https://. Empty ones are hidden.',
     'fields': [{'name': n, 'label': l, 'type': 'string'} for n, l in [('instagram', 'Instagram'), ('facebook', 'Facebook'), ('youtube', 'YouTube'), ('x', 'X (Twitter)'), ('linkedin', 'LinkedIn'), ('tiktok', 'TikTok')]]},
    {'name': 'givingLevels', 'label': 'Monthly giving amounts (USD)', 'type': 'object', 'list': True,
     'description': 'The wording for each card is under Home page text, in the same order.',
     'fields': [{'name': 'amount', 'label': 'Amount per month', 'type': 'number', 'required': True}, {'name': 'masajid', 'label': 'Hearts on the card (1 to 12)', 'type': 'number'}]},
    {'name': 'photo', 'label': 'Large photo on the home page', 'type': 'image', 'options': {'media': 'site'},
     'description': 'Use a wide photo at least 1600 px across that Masjid Hearts has the right to publish.'},
]

articles = yaml.safe_load((root / 'scripts/cms-articles.yml').read_text())

config = {
    'media': [
        {'name': 'articles', 'label': 'Article photos', 'input': 'src/assets/articles', 'output': '../../assets/articles', 'extensions': ['jpg', 'jpeg', 'png', 'webp', 'avif'], 'rename': 'safe'},
        {'name': 'site', 'label': 'Site photos', 'input': 'src/assets/site', 'output': 'src/assets/site', 'extensions': ['jpg', 'jpeg', 'png', 'webp', 'avif'], 'rename': 'safe'},
    ],
    'content': [
        articles,
        {'name': 'settings', 'label': 'Site settings', 'type': 'file', 'path': 'src/content/site/settings.json', 'format': 'json', 'fields': settings_fields},
        {'name': 'home-en', 'label': 'Home page text (English)', 'type': 'file', 'path': 'src/content/site/home.en.json', 'format': 'json', 'fields': home_fields},
        {'name': 'home-ar', 'label': 'Home page text (Arabic)', 'type': 'file', 'path': 'src/content/site/home.ar.json', 'format': 'json', 'fields': copy.deepcopy(home_fields)},
    ],
}
head = ('# Pages CMS (https://pagescms.org): the browser editor for this site. How to use it: EDITING.md\n'
        '# Generated by scripts/cms-config.py. Edit that script (or scripts/cms-articles.yml), not this file.\n')
(root / '.pages.yml').write_text(head + yaml.safe_dump(config, sort_keys=False, allow_unicode=True, width=200))
print('Wrote .pages.yml')
