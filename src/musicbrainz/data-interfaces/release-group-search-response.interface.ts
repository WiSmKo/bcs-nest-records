export interface ReleaseGroupSearchResponse {
    created: string;
    count: number;
    offset: number;
    "release-groups": ReleaseGroup[];
}