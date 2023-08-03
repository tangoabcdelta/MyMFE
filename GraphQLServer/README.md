```
query
{
    hello
    id
}
```

```graphql
query Sample {
  register {
    errors {
      field
      message
    }
    user {
      username
    }
  }
}
```

```graphql
mutation Errors($username: String!, $password: String!, $age: Int) {
  register(username: $username, password: $password, age: $age) {
    errors {
      field
    }
    user {
      username
    }
  }
}
```
