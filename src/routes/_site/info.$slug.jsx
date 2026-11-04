import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { INFO_PAGES } from "@/lib/site-content";

export const Route = createFileRoute("/_site/info/$slug")({
  loader: ({ params }) => {
    const page = INFO_PAGES[params.slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Information"} — AURAVEN` },
      {
        name: "description",
        content: loaderData?.intro ?? "AURAVEN client information.",
      },
    ],
  }),
  component: InfoPage,
});

function InfoPage() {
  const page = Route.useLoaderData();

  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-12 lg:py-16">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-onyx lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {page.intro}
          </p>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div className="max-w-2xl space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl leading-tight text-onyx">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-onyx/70">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <aside className="h-fit border border-border p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
              Need help?
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Our client care team replies within one business day, Monday to
              Saturday.
            </p>
            <Link to="/info/contact" className="btn-ghost mt-5 w-full">
              Contact Us
            </Link>
            <Link
              to="/shop"
              className="mt-3 block text-center text-[10px] uppercase tracking-[0.24em] text-onyx/60 transition-colors hover:text-onyx"
            >
              Shop Watches
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
