namespace * user

typedef i32 int

struct User {
  1: string name,
  2: string email,
  3: string comment,
  4: int id
}

exception InvalidData {
  1: int code,
  2: string reason
}

service StoreService {
  int store(1: User user) throws (1: InvalidData err),
}

