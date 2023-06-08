namespace ToDoCoreWebAPI.EF
{
    public interface IRepository<T>
    {
        IQueryable<T> Get();
        void Add(T entry);
        void Edit(T entry);
        void Delete(T entry);
        Task<int> AddAsync(T entry);
        Task<int> SaveChangesAsync();
    }
}
