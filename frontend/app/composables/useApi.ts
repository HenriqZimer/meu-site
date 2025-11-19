export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;

  return {
    // Skills
    async getSkills() {
      try {
        return await $fetch(`${baseURL}/skills`);
      } catch (error) {
        console.error("Erro ao buscar skills:", error);
        return [];
      }
    },

    async getSkillsByCategory(category: string) {
      try {
        return await $fetch(`${baseURL}/skills?category=${category}`);
      } catch (error) {
        console.error("Erro ao buscar skills por categoria:", error);
        return [];
      }
    },

    // Projects
    async getProjects(filters?: { category?: string; featured?: boolean }) {
      try {
        const params = new URLSearchParams();
        if (filters?.category && filters.category !== "all") {
          params.append("category", filters.category);
        }
        if (filters?.featured !== undefined) {
          params.append("featured", String(filters.featured));
        }

        const query = params.toString() ? `?${params.toString()}` : "";
        return await $fetch(`${baseURL}/projects${query}`);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        return [];
      }
    },

    // Courses
    async getCourses(year?: string) {
      try {
        const query = year ? `?year=${year}` : "";
        return await $fetch(`${baseURL}/courses${query}`);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        return [];
      }
    },

    async getCourseYears() {
      try {
        return await $fetch(`${baseURL}/courses/years`);
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
        return [];
      }
    },

    // Certifications
    async getCertifications(issuer?: string) {
      try {
        const query = issuer ? `?issuer=${issuer}` : "";
        return await $fetch(`${baseURL}/certifications${query}`);
      } catch (error) {
        console.error("Erro ao buscar certificações:", error);
        return [];
      }
    },
  };
};
