## Repository Pattern

The repository pattern uses classes focused on encapsulating logic necessary for connecting to an applications data layer.

The classes will usually:
- implement CRUD operations
- practice single responsibility
- provide a contract/interface so the repository can easily be swapped with a mock version


```ts

// Database only knows about generic persistence operations - it has
// no idea what a "user" is. Could be swapped for any driver/ORM.
interface Database {
  insert: (table: string, record: Record<string, unknown>) => Promise<{ id: string }>;
  findById: (table: string, id: string) => Promise<Record<string, unknown> | null>;
  update: (table: string, id: string, changes: Record<string, unknown>) => Promise<void>;
  delete: (table: string, id: string) => Promise<void>;
}

interface IUserRepository {
  addUser: (body: UserBody) => Promise<string>;
  getUser: (id: string) => Promise<UserObject | null>;
  updateUser: (id: string, changes: Partial<UserBody>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

// UserRepository is the only place that knows both what a "user" is
// AND how the generic Database maps onto that domain concept.
class UserRepository implements IUserRepository {
  database: Database;
  constructor (dbService: Database) {
    this.database = dbService;
  }

  async addUser(body: UserBody) {
    const { id } = await this.database.insert('users', body);
    return id;
  }

  async getUser(id: string) {
    const record = await this.database.findById('users', id);
    return record ? this.toUserObject(record) : null;
  }

  async updateUser(id: string, changes: Partial<UserBody>) {
    await this.database.update('users', id, changes);
  }

  async deleteUser(id: string) {
    await this.database.delete('users', id);
  }

  private toUserObject(record: Record<string, unknown>): UserObject {
    return {
      id: record.id as string,
      name: record.name as string,
      email: record.email as string,
    };
  }
}
```