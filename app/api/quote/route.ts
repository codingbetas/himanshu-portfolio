import { NextResponse } from "next/server";

interface Quote {
  author?: string;
  text?: string;
}

interface QuoteType {
  text: string;
  author: string;
  profession: string;
}

const QUOTES_URL =
  "https://raw.githubusercontent.com/dwyl/quotes/main/quotes.json";

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getProfession(author: string): string {
  const name = author.toLowerCase();

  if (
    [
      "einstein",
      "newton",
      "curie",
      "hawking",
      "darwin",
      "tesla",
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
      "austen",
      "dickens",
      "tolstoy",
      "dostoevsky",
      "twain",
      "wilde",
      "hemingway",
    ].some((person) => name.includes(person))
  ) {
    return "WRITER";
  }

  if (
    [
      "aristotle",
      "plato",
      "socrates",
      "seneca",
      "nietzsche",
      "kant",
      "descartes",
      "confucius",
    ].some((person) => name.includes(person))
  ) {
    return "PHILOSOPHER";
  }

  return "THINKER";
}

export async function GET() {
  try {
    const response = await fetch(QUOTES_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Quote dataset returned ${response.status}`
      );
    }

    const data: Quote[] = await response.json();

    const validQuotes: QuoteType[] = data
      .filter((item) => item.text && item.author)
      .map((item) => {
        const text = normalize(item.text!);
        const author = normalize(item.author!);

        return {
          text,
          author,
          profession: getProfession(author),
        };
      });

    if (validQuotes.length === 0) {
      throw new Error("No quotes available");
    }

    const selected =
      validQuotes[
        Math.floor(Math.random() * validQuotes.length)
      ];

    return NextResponse.json(selected, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Quote API failed:", error);

    return NextResponse.json(
      {
        text:
          "Architecting the unseen digital core where scale, distribution, and resilience intersect.",
        author: "Himanshu Rathod",
        profession: "SYSTEM ARCHITECT",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}