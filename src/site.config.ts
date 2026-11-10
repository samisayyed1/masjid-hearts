// Everything a non-developer may need to change lives in this one file.
export const site = {
  name: 'Masjid Hearts',
  tagline: 'Connect hearts to masajid, wherever they are',
  description:
    'Masjid Hearts is a global initiative that connects one gift to a growing network of masajid: building, restoring and keeping the doors open for houses of Allah in need.',

  // Contact. Leave a value empty ('') and the site hides whatever depends on it.
  email: '', // e.g. 'salam@masjidhearts.org' — shown in the footer and used by the contact form
  formEndpoint: '', // optional: a Formspree or Basin form URL. If set, the contact form posts here instead of opening an email.
  donateUrl: '', // e.g. the Masjid Hearts giving page. If empty, giving buttons lead to the contact section.

  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    x: '',
  },
};

export const givingLevels = [
  { amount: 10, masajid: 1, line: 'Help support masajid and the communities they serve.' },
  { amount: 50, masajid: 5, line: 'Extend your support to more masajid and communities around the world.' },
  { amount: 100, masajid: 10, line: 'Make an even greater ongoing impact for masajid and the communities they serve.' },
];
