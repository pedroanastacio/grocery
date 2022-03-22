export interface IPaginationFilter {
    page: number,
    perPage: number,
    sort?: {
        field: string,
        direction: 'ASC' | 'DESC'
    }
}