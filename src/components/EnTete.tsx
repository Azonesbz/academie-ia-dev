import Link from "next/link";
import { Logo } from "@/components/Logo";

/**
 * Bandeau haut, hauteur fixe de 4rem, fond translucide et flou d'arrière-plan
 * — repris du portfolio, où c'est ce qui laisse voir la grille défiler dessous.
 */
export function EnTete({ connecte }: { connecte: boolean }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="rounded-md">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2">
          {connecte ? (
            <Link href="/app" className="btn-secondary min-h-11 px-5 text-sm">
              Reprendre
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost min-h-11 px-4 text-sm">
                Connexion
              </Link>
              <Link href="/signup" className="btn-primary min-h-11 px-5 text-sm">
                Commencer
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
