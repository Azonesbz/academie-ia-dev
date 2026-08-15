import type { Lecon } from "./types";
import { base00 } from "./base-00";
import { base01 } from "./base-01";
import { base02 } from "./base-02";
import { base03 } from "./base-03";
import { base04 } from "./base-04";
import { etape00 } from "./etape-00";
import { etape01 } from "./etape-01";
import { etape02 } from "./etape-02";
import { etape03 } from "./etape-03";
import { etape04 } from "./etape-04";

const LECONS: readonly Lecon[] = [
  base00,
  base01,
  base02,
  base03,
  base04,
  etape00,
  etape01,
  etape02,
  etape03,
  etape04,
];

export function leconParSlug(slug: string): Lecon | undefined {
  return LECONS.find((l) => l.slug === slug);
}

export type { Bloc, CasTruque, Lecon } from "./types";
