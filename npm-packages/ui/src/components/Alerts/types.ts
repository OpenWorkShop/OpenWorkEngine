export interface IAlertMessage {
  name?: string;
  message?: string;
}

export type AlertMessageList = (IAlertMessage | undefined | null)[];

// Combine lots of possibly undefined alerts into a single, well-formed array.
export function sanitizeAlertMessages(alerts?: AlertMessageList, alert?: IAlertMessage): IAlertMessage[] {
  const ret: IAlertMessage[] = [];
  (alerts ?? []).forEach((e) => {
    if (e != null) ret.push(e);
  });
  if (alert) ret.push(alert);
  return ret;
}
