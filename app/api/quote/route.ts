import { NextResponse } from "next/server";

interface APIQuote {
  text?: string;
  author?: string;
}

interface QuoteType {
  text: string;
  author: string;
  profession: string;
}

/* =========================================================
   INDIAN / VEDIC CORE POOL
   ========================================================= */

const VEDIC_CORE_POOL: QuoteType[] = [
  {
    text: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    author: "Bhagavad Gita",
    profession: "ANCIENT SCRIPTURE",
  },
  {
    text: "The mind is restless and difficult to control, but it can be conquered with practice and detachment.",
    author: "Bhagavad Gita",
    profession: "ANCIENT SCRIPTURE",
  },
  {
    text: "Truth is one, paths are many.",
    author: "Rig Veda",
    profession: "VEDIC LITERATURE",
  },
  {
    text: "Arise, awake, and stop not until the goal is reached.",
    author: "Katha Upanishad",
    profession: "VEDANTA TEXT",
  },
  {
    text: "You are what your deep, driving desire is. As your desire is, so is your will. As your will is, so is your deed.",
    author: "Brihadaranyaka Upanishad",
    profession: "VEDANTA TEXT",
  },
];

/* =========================================================
   BLOCKED KEYWORDS
   ========================================================= */

const BLOCKED_KEYWORDS = [
  // Islamic
  "allah",
  "quran",
  "islam",
  "islamic",
  "muslim",
  "muhammad",
  "hadith",
  "mecca",
  "medina",
  "mosque",
  "imam",
  "ramadan",

  // Christian
  "jesus",
  "christ",
  "christian",
  "bible",
  "gospel",
  "church",
  "vatican",
  "pastor",
  "priest",
  "amen",

  // Jewish
  "torah",
  "talmud",
  "rabbi",
  "synagogue",

  // Other explicit religious references
  "buddhism",
  "buddhist",
  "dalai lama",

  // General theological references
  "god",
  "lord",
  "pray",
  "prayer",
  "sin",
  "angel",
  "saint",
  "divine",
];

/* =========================================================
   BLOCKED AUTHORS
   ========================================================= */

const BLOCKED_AUTHORS = [
  "rumi",
  "jalaluddin rumi",
  "muhammad",
  "jesus",
  "saint augustine",
  "thomas aquinas",
  "dalai lama",
  "buddha",
];

/* =========================================================
   REGEX
   ========================================================= */

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const keywordRegex = new RegExp(
  `\\b(?:${BLOCKED_KEYWORDS
    .map(escapeRegex)
    .join("|")})\\b`,
  "i"
);

const authorRegex = new RegExp(
  BLOCKED_AUTHORS
    .map(escapeRegex)
    .join("|"),
  "i"
);

/* =========================================================
   HELPERS
   ========================================================= */

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getProfession(author: string): string {
  const name = author.toLowerCase();

  if (
    [
      "aristotle",
      "plato",
      "socrates",
      "seneca",
      "marcus aurelius",
      "epictetus",
      "nietzsche",
      "kant",
      "descartes",
      "confucius",
    ].some((person) => name.includes(person))
  ) {
    return "PHILOSOPHER";
  }

  if (
    [
      "einstein",
      "newton",
      "tesla",
      "curie",
      "darwin",
      "hawking",
      "feynman",
      "bohr",
    ].some((person) => name.includes(person))
  ) {
    return "SCIENTIST";
  }

  if (
    [
      "turing",
      "dijkstra",
      "torvalds",
      "jobs",
      "gates",
      "hopper",
      "knuth",
      "berners-lee",
    ].some((person) => name.includes(person))
  ) {
    return "TECHNOLOGIST";
  }

  return "THINKER";
}

function isAllowed(item: APIQuote): boolean {
  if (!item.text || !item.author) {
    return false;
  }

  const text = normalize(item.text);
  const author = normalize(
    item.author.split(",")[0]
  );

  if (!text || !author) {
    return false;
  }

  if (author.toLowerCase() === "type.fit") {
    return false;
  }

  /*
   * Block unwanted religious references
   * appearing in the quote itself.
   */
  if (keywordRegex.test(text)) {
    return false;
  }

  /*
   * Block unwanted religious references
   * appearing in the author.
   */
  if (keywordRegex.test(author)) {
    return false;
  }

  /*
   * Block explicitly excluded authors.
   */
  if (authorRegex.test(author)) {
    return false;
  }

  return true;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [result[i], result[j]] = [
      result[j],
      result[i],
    ];
  }

  return result;
}

/* =========================================================
   API
   ========================================================= */

export async function GET() {
  try {
    const response = await fetch(
      "https://type.fit/api/quotes",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Quote source returned ${response.status}`
      );
    }

    const data: APIQuote[] =
      await response.json();

    /*
     * Deduplicate the external dataset.
     */
    const uniqueQuotes = new Map<
      string,
      QuoteType
    >();

    for (const item of data) {
      if (!isAllowed(item)) {
        continue;
      }

      const text = normalize(
        item.text || ""
      );

      const author = normalize(
        item.author?.split(",")[0] || ""
      );

      if (!text || !author) {
        continue;
      }

      const key = text.toLowerCase();

      if (!uniqueQuotes.has(key)) {
        uniqueQuotes.set(key, {
          text,
          author,
          profession: getProfession(author),
        });
      }
    }

    /*
     * Always add the Indian/Vedic pool.
     */
    for (const quote of VEDIC_CORE_POOL) {
      const key = quote.text
        .toLowerCase()
        .trim();

      if (!uniqueQuotes.has(key)) {
        uniqueQuotes.set(key, quote);
      }
    }

    const pool = Array.from(
      uniqueQuotes.values()
    );

    if (pool.length === 0) {
      throw new Error(
        "No valid quotes available"
      );
    }

    /*
     * Shuffle and select.
     */
    const shuffled = shuffle(pool);

    const selected =
      shuffled[
        Math.floor(
          Math.random() * shuffled.length
        )
      ];

    return NextResponse.json(
      selected,
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Quote API failed:",
      error
    );

    /*
     * Safe Vedic fallback.
     */
    const fallback =
      VEDIC_CORE_POOL[
        Math.floor(
          Math.random() *
            VEDIC_CORE_POOL.length
        )
      ];

    return NextResponse.json(
      fallback,
      {
        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  }
}