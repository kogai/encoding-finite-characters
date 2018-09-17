export interface EncodingParams {
  characters: string;
  from: string;
  to: string;
}

export function createEncodingTable(
  params: EncodingParams
): { [key: string]: number[] };
