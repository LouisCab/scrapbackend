export type RawElement = string;
export abstract class Crawler {
  abstract goto(url: string): Promise<void>;
  abstract consentCookies(selector: string): void;
  abstract gotoFirstResult(selector: string): void;
  abstract getRawElement(identifier: string): Promise<RawElement[]>;
}
