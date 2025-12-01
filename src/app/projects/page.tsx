import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { projects, getProjectCategories, type Project } from "@/lib/projects";

export const metadata = {
  title: "프로젝트",
  description: "개발한 프로젝트들을 확인하세요",
};

interface ProjectsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.toLowerCase() || "";
  const selectedCategory = params.category || "";

  // 프로젝트 필터링 및 정렬 (최신순)
  let filteredProjects = [...projects].sort(
    (a: Project, b: Project) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 검색어 및 카테고리 필터링
  if (searchQuery || selectedCategory) {
    filteredProjects = filteredProjects.filter((project: Project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  // Featured 프로젝트 우선 정렬
  filteredProjects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 카테고리 목록 추출
  const categories = getProjectCategories();

  return (
    <div className="container max-w-6xl py-12 mx-auto px-4">
      {/* Hero Section with Search & Filter */}
      <ProjectsHero categories={categories} />

      {/* All Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {searchQuery || selectedCategory
            ? `${searchQuery || selectedCategory} (${filteredProjects.length})`
            : `모든 프로젝트 (${filteredProjects.length})`}
        </h2>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">검색 결과가 없습니다.</p>
            <p className="text-sm mt-2">
              다른 검색어나 카테고리를 시도해보세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
