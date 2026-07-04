import { ProjectCover } from "@/components/projects/project-cover";
import type { Project } from "@/lib/projects";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </h2>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All work
      </Link>

      {/* Header */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">
            {project.category}
          </span>
          <span aria-hidden>·</span>
          <span>{project.period}</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.tagline}</p>

        <p className="mt-4 text-sm text-muted-foreground">
          <span className="text-foreground">{project.role}</span>
          {project.organization ? ` · ${project.organization}` : ""}
        </p>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
              >
                {link.type === "github" ? (
                  <Github className="h-4 w-4" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Cover */}
      <ProjectCover
        src={project.image}
        alt={project.title}
        fallbackChar={project.title.charAt(0)}
        className="mt-10"
        priority
      />

      {/* Problem */}
      <section className="mt-12">
        <SectionHeading>The problem</SectionHeading>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          {project.problem}
        </p>
      </section>

      {/* Goal */}
      <section className="mt-10">
        <SectionHeading>Goal &amp; constraints</SectionHeading>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          {project.goal}
        </p>
      </section>

      {/* Key decisions */}
      {project.decisions.length > 0 && (
        <section className="mt-10">
          <SectionHeading>Key decisions</SectionHeading>
          <ul className="mt-4 space-y-5">
            {project.decisions.map((d) => (
              <li
                key={d.decision}
                className="border-l-2 border-border pl-4"
              >
                <p className="font-medium">{d.decision}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {d.rationale}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Process */}
      {project.process.length > 0 && (
        <section className="mt-10">
          <SectionHeading>How I built it</SectionHeading>
          <div className="mt-4 space-y-5">
            {project.process.map((step) => (
              <div key={step.heading}>
                <h3 className="text-base font-semibold">{step.heading}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Outcome */}
      <section className="mt-10">
        <SectionHeading>Outcome</SectionHeading>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          {project.outcome}
        </p>
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border/60 bg-secondary/40 p-4"
              >
                <div className="text-lg font-semibold">{m.value}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Learnings */}
      {project.learnings && project.learnings.length > 0 && (
        <section className="mt-10">
          <SectionHeading>What I took away</SectionHeading>
          <ul className="mt-3 space-y-2">
            {project.learnings.map((l) => (
              <li
                key={l}
                className="flex gap-2 text-[15px] leading-relaxed text-foreground/90"
              >
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {l}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tech stack */}
      <section className="mt-10 border-t border-border/60 pt-6">
        <SectionHeading>Stack</SectionHeading>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-10">
          <SectionHeading>Gallery</SectionHeading>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/60"
              >
                <Image
                  src={src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
