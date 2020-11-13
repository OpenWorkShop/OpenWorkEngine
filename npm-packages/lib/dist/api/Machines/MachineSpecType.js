import { getEnumTranslationKey } from '../../utils/i18n';
import { MachineSpecType } from '../graphql';
export function getMachineSpecTypeTranslationKey(mst) {
    return getEnumTranslationKey(mst.toString());
}
export function getMachineSpecTypeUnits(mst) {
    const str = mst.toString();
    const watts = [MachineSpecType.Watts.toString(), MachineSpecType.MaxWatts.toString()];
    const volts = [MachineSpecType.MaxVolts.toString()];
    const amps = [MachineSpecType.MaxAmps.toString()];
    const rpm = [MachineSpecType.MaxRpm.toString()];
    const nm = [MachineSpecType.WaveLength.toString()];
    const temp = [MachineSpecType.MaxTemp.toString()];
    const speed = [MachineSpecType.MaxTravelSpeed.toString()];
    const mm = [
        MachineSpecType.TipSize.toString(),
        MachineSpecType.MaxLayerHeight.toString(),
        MachineSpecType.MinLayerHeight.toString(),
    ];
    if (speed.includes(str))
        return 'mm/min';
    if (temp.includes(str))
        return '°C';
    if (rpm.includes(str))
        return 'rpm';
    if (nm.includes(str))
        return 'nm';
    if (mm.includes(str))
        return 'mm';
    if (watts.includes(str))
        return 'W';
    if (volts.includes(str))
        return 'V';
    if (amps.includes(str))
        return 'A';
    return undefined;
}
//# sourceMappingURL=MachineSpecType.js.map