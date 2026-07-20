import WauWriter from "@dugalcedo/wau";
import InlineWauWriter from "@dugalcedo/wau/inline";

const wau = new WauWriter({
    blocksPath: "/images/wau/normal",
    boldBlocksPath: "/images/wau/bold",
    height: 24,
    spaceWidth: 24
})

export const iwau = new InlineWauWriter({
    glyphsPath: "/images/inline-wau",
    height: 36,
    spaceWidth: 36
})

export default wau