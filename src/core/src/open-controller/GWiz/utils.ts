export function processHexColor(hexStr: string) {
  while (hexStr.startsWith('#')) hexStr = hexStr.substr(1);

}
