export declare function addQueryParameter(url: string, key: string, value: string): string;
declare type IPushLocalHistory = (localUrl: string) => void;
export declare function navigateToUrl(url: string, push?: IPushLocalHistory): void;
export {};
