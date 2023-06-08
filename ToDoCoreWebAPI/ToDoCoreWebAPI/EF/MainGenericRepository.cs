using Microsoft.EntityFrameworkCore;

namespace ToDoCoreWebAPI.EF
{
    public class MainGenericRepository<T> : IRepository<T>
    where T : class
    {
        private readonly UserDbContext _db;

        public MainGenericRepository(UserDbContext userDb)
        {
            _db = userDb;
        }

        public void Add(T entry)
        {
            _db.Set<T>().Add(entry);
            _db.SaveChanges();
        }

        public IQueryable<T> Get()
        {
            return _db.Set<T>();
        }

        public void Edit(T entry)
        {
            _db.Entry(entry).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public void Delete(T entry)
        {
            _db.Set<T>().Remove(entry);
            _db.SaveChanges();
        }
        public async Task<int> AddAsync(T entry)
        {
            await _db.Set<T>().AddAsync(entry);
            return await _db.SaveChangesAsync();
        }
        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }
    }
}