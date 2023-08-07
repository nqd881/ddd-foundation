export interface ITranslator<DomainModel, PersistenceModel> {
  toPersistence(domainModel: DomainModel): PersistenceModel;
  toDomain(persistenceModel: PersistenceModel): DomainModel;
}
