import { User } from "@models/User.model";

export function hasAllProperties(obj: any): obj is User {
  const expectedKeys = ["firstName", "lastName", "email", "password"];
  const objKeys = Object.keys(obj);
  return expectedKeys.every((key) => objKeys.includes(key));
}
