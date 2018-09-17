export interface EncodingParams {
  characters: string;
  from: string;
  to: string;
}

declare function createEncodingTable(
  params: EncodingParams
): { [key: string]: number[] };

export default createEncodingTable;
