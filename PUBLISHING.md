# How to publish an article

There are two ways. Both end the same way: the site rebuilds itself and the article is live in about two minutes.

## Option A: in the browser (no code)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with a GitHub account that has access to this repository.
2. Open the repository, choose **Articles**, then **Add an entry**.
3. Fill in the form and write the article. Press **Save**.

To hold an article back, switch **Draft** on. Switch it off to publish.

## Option B: add a file

Create a new file in `src/content/articles/`. The file name becomes the web address, so
`the-first-masjid.md` is published at `/articles/the-first-masjid/`. Use lowercase words joined by hyphens.

```markdown
---
title: The first masjid
summary: One or two sentences shown on cards and in search results (220 characters at most).
date: 2026-11-20
category: Faith
motif: star
---

The article starts here. Leave a blank line between paragraphs.

## A sub-heading

- A list item
- Another list item

A [link to another article](/articles/a-heart-attached-to-the-masjid/) and a link to [the giving section](/#give).
```

### The settings at the top

| Setting | Required | Notes |
| --- | --- | --- |
| `title` | yes | The headline |
| `summary` | yes | Max 220 characters |
| `date` | yes | `YYYY-MM-DD`. Newest articles appear first |
| `category` | yes | One of `Faith`, `Community`, `Giving`, `Masajid` |
| `author` | no | Defaults to "Masjid Hearts" |
| `cover` | no | A photo, e.g. `../../assets/articles/my-photo.jpg`. Put the photo in `src/assets/articles/` |
| `coverAlt` | with a photo | One sentence describing the photo |
| `motif` | no | Cover pattern when there is no photo: `star`, `arch`, `lattice` or `dome` |
| `featured` | no | `true` puts the article in the large slot on the home page |
| `draft` | no | `true` hides the article from the live site |

### Writing guidance

- Aim for 300 to 600 words. One idea per article.
- Give the source for every ayah and hadith, e.g. (Sahih Muslim 1631).
- Link to one or two other articles, and to `/#give` or `/#how` where it is natural.
- Only use photos Masjid Hearts has the right to publish.

If a required setting is missing or misspelt, the build stops and the live site stays as it was. The error message names the file and the setting.
