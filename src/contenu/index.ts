import type { Lecon } from "./types";
import { etape00 } from "./etape-00";
import { etape01 } from "./etape-01";
import { etape02 } from "./etape-02";
import { etape03 } from "./etape-03";
import { etape04 } from "./etape-04";

const LECONS: readonly Lecon[] = [etape00, etape01, etape02, etape03, etape04];

export function leconParSlug(slug: string): Lecon | undefined {
  return LECONS.find((l) => l.slug === slug);
}

export type { Bloc, Lecon } from "./types";
