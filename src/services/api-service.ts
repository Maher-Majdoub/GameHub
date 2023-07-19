import apiClient, { CanceledError } from "./api-client";

interface Filters {
  page?: number;
  parent_platforms?: number;
  genres?: string;
  ordering?: string;
  search?: string;
}

class ApiService {
  getData(endPoint: string, params: object) {
    const controller = new AbortController();
    const request = apiClient.get(endPoint, {
      signal: controller.signal,
      params: params,
    });
    return { request, cancel: () => controller.abort() };
  }
  getAllGenres() {
    return this.getData("/genres", {});
  }
  getAllGames({ page, parent_platforms, genres, ordering, search }: Filters) {
    return this.getData("/games", {
      page: page,
      parent_platforms: parent_platforms,
      genres: genres,
      ordering: ordering,
      search: search,
    });
  }
}

export default new ApiService();
export { CanceledError };
