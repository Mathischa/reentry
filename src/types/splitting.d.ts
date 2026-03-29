declare module 'splitting' {
  interface SplittingOptions {
    target?: string | Element | Element[];
    by?: 'chars' | 'lines' | 'words';
    key?: string;
  }

  function Splitting(options: SplittingOptions): void;
  export default Splitting;
}
