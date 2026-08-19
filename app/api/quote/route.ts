import { NextResponse } from "next/server";

interface QuotableResponse {
  content?: string;
  author?: string;
}

interface QuoteResponse {
  text: string;
  author: string;
  profession: string;
}

const QUOTABLE_API = "https://api.quotable.io/random";

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
      "epictetus",
      "marcus aurelius",
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
      "galileo",
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

  if (
    [
      "shakespeare",
      "wilde",
      "hemingway",
      "orwell",
      "tolstoy",
      "dostoevsky",
      "austen",
      "twain",
    ].some((person) => name.includes(person))
  ) {
    return "WRITER";
  }

  return "THINKER";
}

export async function GET() {
  try {
    const response = await fetch(QUOTABLE_API, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Quotable API returned ${response.status}`
      );
    }

    const data: QuotableResponse =
      await response.json();

    if (!data.content || !data.author) {
      throw new Error(
        "Invalid quote received from Quotable API"
      );
    }

    const text = normalize(data.content);
    const author = normalize(data.author);

    const quote: QuoteResponse = {
      text,
      author,
      profession: getProfession(author),
    };

    return NextResponse.json(quote, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error(
      "Quote API failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Quote service temporarily unavailable.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
