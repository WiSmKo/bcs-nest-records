interface Artist {
    id: string;
    name: string;
    "sort-name": string;
    disambiguation: string;
    aliases: Alias[];
}

interface Alias {
    "sort-name": string;
    name: string;
    locale: string | null;
    type: string | null;
    primary: boolean | null;
    "begin-date": string | null;
    "end-date": string | null;
}