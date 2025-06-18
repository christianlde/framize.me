import type { ReactNode } from "react";

function Section({ id, children }: { id: string, children: ReactNode }) {
  return <section id={id} className="min-h-48 md:min-h-64 lg:min-h-80 xl:min-h-96 flex flex-col justify-center items-start px-2 md:px-8 lg:px-32 xl:px-128 py-10 md:py-14 lg:py-18 xl:py-24">
    {children}
  </section>
}

function CustomLink({ href, children }: { href: string, children: ReactNode }) {
  return <a href={href} className="border-b-2 border-rose-600 hover:text-rose-600 transition-all duration-100">
    {children}
  </a>
}

function Emphasis({ children }: { children: ReactNode }) {
  return <span className="text-rose-600">
    {children}
  </span>
}


export default function App() {
  return (
    <main className="px-2 md:px-4 lg:px-8 xl:px-12 bg-stone-900">
      <header className="py-10 md:py-14 lg:py-18 xl:py-24 flex flex-col flex-justify-center items-center gap-1">
        <h1 className="mb-8 font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Framize</h1>
        <p className="text-gray-400">Framize is a gallery for photos and videos.</p>
        <p className="text-rose-600 text-sm">(currently in alpha)</p>
      </header>

      <nav>
        <ul className="flex flex-col lg:flex-row gap-2 md:gap-4 lg:gap-8 xl:gap-16 justify-center items-center">
          <li>
            <CustomLink href='#'>
              Homepage
            </CustomLink>
          </li>
          <li>
            <CustomLink href='#why-framize'>
              Why Framize?
            </CustomLink>
          </li>
          <li>
            <CustomLink href='https://app.framize.christiande.com/'>
              Open web app
            </CustomLink>
          </li>
          <li>
            <CustomLink href='#about'>
              More about the Framize project
            </CustomLink>
          </li>
        </ul>
      </nav>

      <Section id="why-framize">
        <h2 className="mb-4 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Why <Emphasis>Framize</Emphasis>?</h2>
        <p className="text-gray-500 dark:text-gray-400">Framize is a <b>free</b> gallery for photos and videos.</p>
         <p className="text-gray-500 dark:text-gray-400">Framize offers an intuitive <b>user experience</b> and a pleasant <b>user interface</b>, because photos and videos deserve a nice and intuitive client.</p>
      </Section>

      <Section id="about">
        <h2 className="mb-4 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">More about the <Emphasis>Framize project</Emphasis></h2>
        <p className="text-gray-500 dark:text-gray-400">Framize was made because every gallery should have a nice <b>user interface</b> coupled with a nice <b>user experience</b>.</p>
        <p className="text-gray-500 dark:text-gray-400">This is why I started developing framize, and made it <b>free to use</b>.</p>
      </Section>

      <footer className="flex flex-col gap-1 justify-center items-center pb-16">
        <p className="text-center md:text-left">2025 The Framize Project - a gallery for photos and videos.</p>
      </footer>
    </main>
  );
}
