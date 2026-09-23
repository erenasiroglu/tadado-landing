import type { DeckKey } from "@/lib/deck-cards";
import type { DeckPageContent } from "@/lib/deck-page-types";
import type { Locale } from "@/lib/i18n-config";

type Stub = Pick<
  DeckPageContent,
  "metaTitle" | "metaDescription" | "h1" | "heroSubtitle" | "whatIsTitle" | "whatIsBody" | "imageAlt"
>;

/** Localized SEO fields for non-EN/TR locales (body sections reuse EN structure via merge). */
export const LOCALE_DECK_STUBS: Partial<Record<Locale, Partial<Record<DeckKey, Stub>>>> = {
  es: {
    midnight: {
      metaTitle: "Juegos nocturnos para parejas y amigos | Tadado",
      metaDescription:
        "¿Buscas juegos para jugar con tu pareja? Juegos nocturnos en Tadado: cartas divertidas para parejas y amigos con Tabú y Heads Up.",
      h1: "Juegos nocturnos para parejas",
      heroSubtitle: "Cartas divertidas y sorprendentes para una noche en casa.",
      whatIsTitle: "¿Qué es Juegos nocturnos?",
      whatIsBody:
        "Juegos nocturnos es el mazo para adultos (18+) de Tadado. Ideal para parejas y amigos cercanos que quieren un juego de palabras más atrevido en un solo móvil.",
      imageAlt: "Mazo Juegos nocturnos de Tadado para parejas",
    },
    cinema: {
      metaTitle: "Juego de fiesta de cine y cartas de películas | Tadado",
      metaDescription: "Adivina películas y series con el mazo Cine de Tadado. Tabú y Heads Up en el móvil.",
      h1: "Mazo Cine para noches de película",
      heroSubtitle: "Blockbusters, series y estrellas en cada carta.",
      whatIsTitle: "¿Qué es el mazo Cine?",
      whatIsBody: "Cartas de cine actual para fans. Juega Tabú o Heads Up con un solo teléfono.",
      imageAlt: "Mazo Cine de Tadado juego de fiesta",
    },
  },
  de: {
    midnight: {
      metaTitle: "Nachtspiele für Paare und Freunde | Tadado",
      metaDescription:
        "Spiele für Paare und Freunde: Nachtspiele in Tadado mit Tabu und Heads Up auf einem Handy.",
      h1: "Nachtspiele für Paare",
      heroSubtitle: "Lustige und überraschende Karten für den Abend zu zweit.",
      whatIsTitle: "Was sind Nachtspiele?",
      whatIsBody:
        "Nachtspiele ist das 18+ Deck in Tadado für Paare und enge Freundeskreise. Tabu und Scharade auf einem Gerät.",
      imageAlt: "Tadado Nachtspiele Deck für Paare",
    },
    cinema: {
      metaTitle: "Film-Partyspiel und Filmschätz-Karten | Tadado",
      metaDescription: "Kino-Deck in Tadado: Blockbuster, Serien und Stars. Tabu und Heads Up.",
      h1: "Kino-Deck für Filmabende",
      heroSubtitle: "Aktuelle Filme und ikonische Charaktere.",
      whatIsTitle: "Was ist das Kino-Deck?",
      whatIsBody: "Wortratespiel für Filmfans. Ein Handy, viele Runden Tabu oder Heads Up.",
      imageAlt: "Tadado Kino Partyspiel Deck",
    },
  },
  fr: {
    midnight: {
      metaTitle: "Jeux de nuit pour couples et amis | Tadado",
      metaDescription:
        "Jeux à jouer avec votre copain, copine ou partenaire. Jeux de nuit dans Tadado avec Taboo et Heads Up.",
      h1: "Jeux de nuit pour couples",
      heroSubtitle: "Cartes fun et inattendues pour une soirée à deux.",
      whatIsTitle: "Qu'est-ce que Jeux de nuit ?",
      whatIsBody:
        "Jeux de nuit est le paquet 18+ de Tadado pour couples et amis proches. Tabou et mime sur un seul téléphone.",
      imageAlt: "Paquet Jeux de nuit Tadado pour couples",
    },
    cinema: {
      metaTitle: "Jeu de soirée cinéma | Tadado",
      metaDescription: "Paquet Cinéma : films, séries et stars. Tabou et Heads Up sur mobile.",
      h1: "Paquet Cinéma pour soirée film",
      heroSubtitle: "Blockbusters et culture pop sur chaque carte.",
      whatIsTitle: "Qu'est-ce que le paquet Cinéma ?",
      whatIsBody: "Jeu de mots pour fans de cinéma. Un téléphone, deux modes de jeu.",
      imageAlt: "Paquet Cinéma Tadado jeu de fête",
    },
  },
};
