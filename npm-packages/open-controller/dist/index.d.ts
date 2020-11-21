export interface IControllerOpts {
    errorHandler: (e: Error) => void;
}
declare function openController(opts: IControllerOpts): void;
export { openController };
