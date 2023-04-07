export interface EntityFactory<TEntity> {
  create(...args: any): TEntity | Promise<TEntity>;
  remove(...args: any): TEntity | Promise<any>;
}
