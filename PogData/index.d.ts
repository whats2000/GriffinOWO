declare class PogData {
  /**
   * Create a new PogData object
   * @param module The module name
   * @param defaultObject The default settings object. If not provided, it will be an empty object
   * @param fileName The file name to save the data. If not provided, it will the ".data.json"
   */
  constructor(
    module: string,
    defaultObject?: {
      [key: string]: any;
    },
    fileName?: string,
  );

  /**
   * Save the data to the file
   */
  save: () => void;

  /**
   * Enable autosave
   * @param interval The interval in minute. Default is 5 minutes
   */
  autosave: (interval?: number) => void;
}

export default PogData;
