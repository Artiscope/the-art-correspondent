// Checks on the site's content. data/content.json stays the one place the words live,
// because Artiscope Digital Home reads and writes it. These rules stop a build if a story
// or subject is malformed, so a mistake shows up before it reaches the live site.
import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const slug = z.string().regex(/^[a-z0-9][a-z0-9-]{0,80}$/, "a web address of small letters, digits and hyphens");
const source = z.object({ title: z.string().min(1), publisher: z.string().optional(), date: z.string().optional(), href: z.string().url() }).passthrough();
const fromContent = (key: string) => (text: string) =>
  (JSON.parse(text)[key] || []).map((x: Record<string, unknown>) => ({ ...x, id: x.slug }));

const stories = defineCollection({
  loader: file("data/content.json", { parser: fromContent("articles") }),
  schema: z.object({
    slug,
    title: z.string().min(1),
    kicker: z.enum(["Features", "Artist Stories", "Studio Notes", "Conversations", "Culture", "Exhibitions"]),
    summary: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    subjects: z.array(z.string()).default([]),
    next: z.string().optional(),
    body: z.string().min(1),
    how: z.string().optional(),
    sources: z.array(source).min(1, "every story lists its sources"),
    image: z.string().optional(),
    alt: z.string().optional(),
    credit: z.string().optional(),
    hidden: z.boolean().default(false),
  }).passthrough(),
});

const subjects = defineCollection({
  loader: file("data/content.json", { parser: fromContent("artists") }),
  schema: z.object({
    slug,
    name: z.string().min(1),
    kind: z.enum(["theme"]).optional(),
    line: z.string().optional(),
    about: z.string().optional(),
    sources: z.array(source).default([]),
    image: z.string().optional(),
    alt: z.string().optional(),
    credit: z.string().optional(),
    hidden: z.boolean().default(false),
  }).passthrough(),
});

export const collections = { stories, subjects };
