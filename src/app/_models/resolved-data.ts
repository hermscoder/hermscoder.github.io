export class ResolvedData<T> {
  private _data: T | null;
  private _error: any;

  constructor(data: T| null, error: any = null) {
    this._data = data;
    this._error = error;
  }


  get data(): T | null {
    return this._data;
  }

  get error(): any {
    return this._error;
  }
}
