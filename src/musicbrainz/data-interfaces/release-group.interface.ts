interface ReleaseGroup {
    id: string;
    score: string;
    count: number;
    title: string;
    "first-release-date": string;
    "primary-type": string;
    "artist-credit": ArtistCredit[];
    releases: Release[];
}