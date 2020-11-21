import { getEnumTranslationKey } from '../../utils/i18n';
import { MachinePartType } from '../graphql';
export function getMachinePartTypeTranslationKey(mpt) {
    const str = mpt.toString();
    if (str === MachinePartType.Psu.toString() || str === MachinePartType.Mmu.toString()) {
        return str; // Abbreviations.
    }
    return getEnumTranslationKey(str);
}
//# sourceMappingURL=MachinePartType.js.map