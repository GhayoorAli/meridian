import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo";
import { Roll, Unmask } from "@/components/ui";
import { articles, getArticle, getNextArticle } from "@/data/journal";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const next = getNextArticle(slug);

  return (
    <main>
      <article className="gutter pt-[7.5rem] pb-[6.25rem]">
        <div className="grid grid-cols-3 border-b border-line pb-3 text-[1rem] md:text-[1.125rem]">
          <span>{article.tags.join(", ")}</span>
          <span className="text-center">{article.date}</span>
          <span className="text-right">{article.read}</span>
        </div>
        <h1 className="mt-14 max-w-[68.75rem] font-ex text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.02] uppercase">
          {article.title}
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-[32.5rem] font-serif text-[1.5rem] leading-[1.15]">{article.dek}</p>
          <p className="text-[1rem]">
            {article.author} <span className="text-stone">— {article.role}</span>
          </p>
        </div>

        <Unmask className="mt-14 aspect-[16/8]">
          <Photo src={article.image} alt={article.title} eager fill />
        </Unmask>

        <div className="mt-[5.625rem] ml-auto max-w-[42.5rem] space-y-7">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="text-justify text-[1.25rem] leading-[1.5]">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Link href={`/journal/${next.slug}`} className="roll-host gutter block border-t border-line pt-10 pb-[6.25rem]">
        <span className="mb-8 inline-flex text-[1.125rem]">
          <Roll>Next essay</Roll>
        </span>
        <p className="max-w-[68.75rem] font-ex text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] uppercase">
          {next.title}
        </p>
      </Link>
    </main>
  );
}
