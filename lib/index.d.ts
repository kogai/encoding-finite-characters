declare module "encoding-finite-characters.macro" {
  type Params = {
    characters: string,
    from: string,
    to: string
  };
  declare export function createEncodingTable(
    params: Params
  ): { [string]: number[] };
}